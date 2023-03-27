package bera31.Project.service;

import bera31.Project.config.S3.S3Uploader;
import bera31.Project.config.jwt.JwtTokenProvider;
import bera31.Project.domain.dto.requestdto.LogInDto;
import bera31.Project.domain.dto.requestdto.SignUpDto;
import bera31.Project.domain.dto.requestdto.TokenRequestDto;
import bera31.Project.domain.dto.responsedto.AuthTokenDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.member.Provider;
import bera31.Project.exception.*;
import bera31.Project.exception.exceptions.*;
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
        if (checkEmailDuplication(signUpDto))
            throw new EmailDuplicateException(ErrorResponse.EMAIL_DUPLICATE);

        Member member = new Member(signUpDto.getEmail(), passwordEncoder.encode(signUpDto.getPassword()),
                signUpDto.getNickname(), signUpDto.getDong(), signUpDto.getGu());

        if (!profileImage.isEmpty())
            member.setProfileImage(s3Uploader.upload(profileImage, "profileImage"));

        return memberRepository.save(member).getId();
    }

    public String checkNickname(String nickname) {
        if (checkNicknameDuplication(nickname))
            throw new NicknameDuplicateException(ErrorResponse.NICKNAME_DUPLICATE);

        return "사용 가능한 닉네임 입니다.";
    }

    public AuthTokenDto signIn(LogInDto logInDto) {
        Optional<Member> findedMember = memberRepository.findByEmail(logInDto.getEmail());

        if (findedMember.isEmpty())
            throw new UserNotFoundException(ErrorResponse.USER_NOT_FOUND);
        if (!checkPasswordCorrectness(logInDto, findedMember))
            throw new IncorrectPasswordException(ErrorResponse.INCORRECT_PASSWORD);
        if (findedMember.get().getProvider().equals(Provider.KAKAO))
            throw new KakaoUserAccessException(ErrorResponse.KAKAO_ACCESS_DENIED);

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
                = new UsernamePasswordAuthenticationToken(logInDto.getEmail(), logInDto.getPassword());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);
        AuthTokenDto authTokenDto = tokenProvider.generateToken(authentication);

        // Refresh Token을 Redis에 저장하는 Code
        redisUtility.setValues(logInDto.getEmail(), authTokenDto.getRefreshToken(), REFRESH_TOKEN_LIFETIME);
        return authTokenDto;
    }

    public String logout() {
        redisUtility.deleteValues(SecurityUtility.getCurrentMemberEmail());
        return "Logged out!";
    }

    public AuthTokenDto reissue(TokenRequestDto tokenRequestDto) {
        Authentication authentication = tokenProvider.getAuthentication(tokenRequestDto.getAccessToken());
        String refreshToken = redisUtility.getValues(authentication.getName());
        log.warn("ID : " + authentication.getName());
        log.warn("redis token : " + redisUtility.getValues(authentication.getName()));
        log.warn("request token : " + tokenRequestDto.getRefreshToken());

        if (refreshToken == null)
            throw new LoggedOutUserException(ErrorResponse.LOGGED_OUT_USER);
        if (!refreshToken.equals(tokenRequestDto.getRefreshToken()))
            throw new TokenMismatchException(ErrorResponse.TOKEN_MISMATCH);

        AuthTokenDto authTokenDto = tokenProvider.generateToken(authentication);
        redisUtility.setValues(authentication.getName(), authTokenDto.getRefreshToken(), REFRESH_TOKEN_LIFETIME);
        log.warn("Redis result : " + redisUtility.getValues(authentication.getName()));
        return authTokenDto;
    }

    private boolean checkEmailDuplication(SignUpDto signUpDto) {
        return memberRepository.findByEmail(signUpDto.getEmail()).isPresent();
    }

    private boolean checkNicknameDuplication(String nickname) {
        return memberRepository.findByEmail(nickname).isPresent();
    }

    private boolean checkPasswordCorrectness(LogInDto logInDto, Optional<Member> findedMember) {
        return passwordEncoder.matches(logInDto.getPassword(), findedMember.get().getPassword());
    }
}
