package bera31.Project.service;

import bera31.Project.config.jwt.JwtTokenProvider;
import bera31.Project.domain.dto.requestdto.KakaoSignupDto;
import bera31.Project.domain.dto.responsedto.AuthTokenDto;
import bera31.Project.domain.dto.responsedto.KakaoProfileDto;
import bera31.Project.domain.dto.responsedto.KakaoTokenDto;
import bera31.Project.domain.member.Member;
import bera31.Project.repository.MemberRepository;
import bera31.Project.utility.RedisUtility;
import bera31.Project.utility.SecurityUtility;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class KakaoAuthService {

    private final MemberRepository memberRepository;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider tokenProvider;
    private final RedisUtility redisUtility;
    private final PasswordEncoder passwordEncoder;
    private static final long REFRESH_TOKEN_LIFETIME = 14 * 24 * 60 * 60 * 1000; // 14일

    @Value("${kakao.client.id}")
    private String clientId;
    @Value("${kakao.client.secret}")
    private String clientSecret;
    @Value("${kakao.redirect.uri}")
    private String redirectUri;
    @Value("${kakao.password}")
    private String kakaoPassword;

    public AuthTokenDto kakaoSignIn(String accessToken){
        KakaoProfileDto kakaoProfile = getKakaoProfile(accessToken);
        Optional<Member> findedKakaoMember = memberRepository.findByEmail(kakaoProfile.getKakao_account().getEmail());

        if(findedKakaoMember.isEmpty()) {
            log.info("Naong 회원이 아닙니다. 자동 회원 가입을 진행합니다.");
            kakaoSignUp(kakaoProfile);
        }

        return authenticateKakaoMember(kakaoProfile);
    }

    private Member kakaoSignUp(KakaoProfileDto kakaoProfileDto){
        // 정적 팩토리 메서드 리팩토링 대상!!
        Member newKakaoMember = new Member(
                kakaoProfileDto.getKakao_account().getEmail(), passwordEncoder.encode(kakaoPassword),
                kakaoProfileDto.getProperties().getNickname(), null, null);

        newKakaoMember.setKakaoMemberInfo(kakaoProfileDto.getProperties().getProfile_image());
        return memberRepository.save(newKakaoMember);
    }

    public String additionalSignUp(KakaoSignupDto kakaoSignupDto){
        Member currentMember = memberRepository.findByEmail(SecurityUtility.getCurrentMemberEmail()).get();
        currentMember.changeAddress(kakaoSignupDto.getDong(), kakaoSignupDto.getGu());
        currentMember.setKakaoMemberNickname(kakaoSignupDto.getNickname());

        return "회원가입이 완료 되었습니다!";
    }

    public String getAccessToken(String code){
        RestTemplate restTemplate = new RestTemplate();

        // 요청 보낼 Header 설정
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // 요청 보낼 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("redirect_uri", redirectUri);
        params.add("code", code);
        params.add("client_secret", clientSecret);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest
                = new HttpEntity<>(params, headers);

        ResponseEntity<String> kakaoTokenResponse = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // 날아오는 응답 Json으로 Parsing
        ObjectMapper objectMapper = new ObjectMapper();
        KakaoTokenDto kakaoTokenDto = null;

        try{
            kakaoTokenDto = objectMapper.readValue(kakaoTokenResponse.getBody(), KakaoTokenDto.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return kakaoTokenDto.getAccess_token();
    }

    public KakaoProfileDto getKakaoProfile(String accessToken){
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoProfileRequest
                = new HttpEntity<>(headers);

        ResponseEntity<String> kakaoProfileResponse = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileRequest,
                String.class
        );

        ObjectMapper objectMapper = new ObjectMapper();
        KakaoProfileDto kakaoProfileDto = null;

        try{
            kakaoProfileDto = objectMapper.readValue(kakaoProfileResponse.getBody(), KakaoProfileDto.class);
        } catch (JsonProcessingException e){
            e.printStackTrace();
        }

        return kakaoProfileDto;
    }

    private AuthTokenDto authenticateKakaoMember(KakaoProfileDto kakaoProfile){
        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(kakaoProfile.getKakao_account().getEmail(), kakaoPassword);
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);
        AuthTokenDto authTokenDto = tokenProvider.generateToken(authentication);

        redisUtility.setValues(kakaoProfile.getKakao_account().getEmail(), authTokenDto.getRefreshToken(), REFRESH_TOKEN_LIFETIME);
        return authTokenDto;
    }
}
