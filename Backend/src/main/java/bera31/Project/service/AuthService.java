package bera31.Project.service;

import antlr.Token;
import bera31.Project.config.S3.S3Uploader;
import bera31.Project.config.jwt.JwtTokenProvider;
import bera31.Project.domain.dto.requestdto.LogInDto;
import bera31.Project.domain.dto.requestdto.SignUpDto;
import bera31.Project.domain.dto.requestdto.TokenRequestDto;
import bera31.Project.domain.dto.responsedto.AuthTokenDto;
import bera31.Project.domain.member.Member;
import bera31.Project.repository.MemberRepository;
import bera31.Project.utility.RedisUtility;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AuthService {
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider tokenProvider;
    private final RedisUtility redisUtility;
    private final S3Uploader s3Uploader;
    private static final long REFRESH_TOKEN_LIFETIME = 14 * 24 * 60 * 60 * 1000; // 14일

    public Long signUp(SignUpDto signUpDto, MultipartFile profileImage) throws Exception {
        if (memberRepository.findByEmail(signUpDto.getEmail()).isPresent()) {
            throw new Exception("이미 있는 회원입니다");
        }

        if (memberRepository.findByNickName(signUpDto.getNickname()).isPresent()) {
            throw new Exception("이미 있는 닉네임입니다");
        }

        Member member = new Member(signUpDto.getEmail(), passwordEncoder.encode(signUpDto.getPassword()),
                signUpDto.getNickname(), signUpDto.getDong(), signUpDto.getGu());
        member.changeImage(s3Uploader.upload(profileImage, "profileImage"));
        return memberRepository.save(member).getId();
    }

    public AuthTokenDto signIn(LogInDto logInDto){
        Optional<Member> findedMember = memberRepository.findByEmail(logInDto.getEmail());

        if(findedMember.isEmpty())
            throw new IllegalArgumentException("존재하지 않는 유저입니다.");
        if(!passwordEncoder.matches(logInDto.getPassword(), findedMember.get().getPassword()))
            throw new IllegalArgumentException("Password가 일치하지 않습니다.");

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(logInDto.getEmail(), logInDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);
        AuthTokenDto authTokenDto = tokenProvider.generateToken(authentication);

        // Refresh Token을 Redis에 저장하는 Code
        redisUtility.setValues(logInDto.getEmail(), authTokenDto.getRefreshToken(), REFRESH_TOKEN_LIFETIME);
        return authTokenDto;
    }

    public String logout(){
        log.info(SecurityUtility.getCurrentMemberEmail());
        redisUtility.deleteValues(SecurityUtility.getCurrentMemberEmail());
        return "Logged out!";
    }

    public AuthTokenDto reissue(TokenRequestDto tokenRequestDto){
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());
        String refreshToken = redisUtility.getValues(authentication.getName());

        if(refreshToken == null)
            throw new RuntimeException("로그아웃 된 사용자 입니다.");
        if(!refreshToken.equals(tokenRequestDto.getRefreshToken()))
            throw new RuntimeException("토큰의 유저 정보가 일치하지 않습니다.");

        AuthTokenDto authTokenDto = tokenProvider.generateToken(authentication);
        redisUtility.setValues(authentication.getName(), refreshToken, REFRESH_TOKEN_LIFETIME);
        return authTokenDto;
    }
}
