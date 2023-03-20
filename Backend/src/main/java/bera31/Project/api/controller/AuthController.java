package bera31.Project.api.controller;

import bera31.Project.domain.dto.requestdto.LogInDto;
import bera31.Project.domain.dto.requestdto.SignUpDto;
import bera31.Project.domain.dto.requestdto.TokenRequestDto;
import bera31.Project.domain.dto.responsedto.AuthTokenDto;
import bera31.Project.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @Operation(summary = "회원가입 요청 API입니다.",
            description = "Multipart 형식으로 사진과 signUpDto를 넘겨주시면 됩니다.")
    @PostMapping("/signup")
    public ResponseEntity<Long> signUp(@RequestPart SignUpDto signUpDto,
                                       @RequestPart MultipartFile profileImage) throws Exception {
        return new ResponseEntity<>(authService.signUp(signUpDto, profileImage), HttpStatus.OK);
    }

    @Operation(summary = "닉네임 중복 확인 요청 API 입니다.",
            description = "Request Body가 아닌, url에 Request Parameter 형식으로 Nickname을 받습니다.")
    @PostMapping("/signup/{nickname}")
    public ResponseEntity<String> checkDuplication(@RequestParam String nickname) {
        return new ResponseEntity<>(authService.checkNickname(nickname), HttpStatus.OK);
    }

    @Operation(summary = "일반 로그인 요청 API 입니다.",
            description = "결과로는 AccessToken과 RefreshToken을 반환합니다. \n\n" +
                    "AccessToken은 LocalStorage에, RefreshToken은 Cookie에 우선 보관하는 것으로 하면 될 것 같습니다. \n\n" +
                    "항상 모든 요청의 Authorization Header에 'Bearer AccessToken' 형식으로 함께 넘어와야 합니다. \n\n" +
                    "AccessToken의 만료 기간은 15분, RefreshToken의 만료기간은 14일 입니다.")
    @PostMapping("/signin")
    public ResponseEntity<AuthTokenDto> signIn(@RequestBody LogInDto logInDto) {
        return new ResponseEntity<>(authService.signIn(logInDto), HttpStatus.OK);
    }

    @Operation(summary = "로그아웃 요청 API입니다.",
            description = "해당 API로 요청을 넣을 시, Refresh Token을 강제로 만료시킵니다. \n\n" +
                    "따라서, 재발급이 아닌 새로 로그인을 해야합니다.")
    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        return new ResponseEntity<>(authService.logout(), HttpStatus.OK);
    }

    @Operation(summary = "재발급 요청 API입니다.",
            description = "AccessToken의 만료 기간이 15분이기 때문에, 재발급이 필요합니다. \n\n" +
                    "저장된 AccessToken과 RefreshToken을 함께 해당 경로로 요청해주셔야 합니다. \n\n" +
                    "로그인 시 만료된 AccessToken이라는 오류가 반환되면, 자동으로 해당 경로로 재발급 요청이 들어와야 합니다.")
    @PostMapping("/reissue")
    public ResponseEntity<AuthTokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto) {
        return new ResponseEntity<>(authService.reissue(tokenRequestDto), HttpStatus.OK);
    }
}
