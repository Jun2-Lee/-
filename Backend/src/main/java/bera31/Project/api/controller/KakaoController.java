package bera31.Project.api.controller;

import bera31.Project.domain.dto.requestdto.EditInfoRequestDto;
import bera31.Project.domain.dto.requestdto.KakaoSignupDto;
import bera31.Project.domain.dto.responsedto.AuthTokenDto;
import bera31.Project.service.KakaoAuthService;
import bera31.Project.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Transactional
public class KakaoController {

    private final KakaoAuthService kakaoAuthService;

    @Operation(summary = "카카오 인가코드 전달 API",
            description = "해당 경로로 카카오 인가코드를 넘겨주시면 됩니다.\n" +
                    "방식은 url/auth/kakao?code=XXX 와 같은 Request Parameter 형식입니다.")
    @GetMapping("/auth/kakao")
    public ResponseEntity<AuthTokenDto> kakaoLogin(@RequestParam String code) {
        String accessToken = kakaoAuthService.getAccessToken(code);
        return new ResponseEntity<>(kakaoAuthService.kakaoSignIn(accessToken), HttpStatus.OK);
    }

    @Operation(summary = "카카오 로그인 시, Naong에 가입되지 않은 경우 추가 정보 입력 요청 경로입니다.",
            description = "카카오 로그인 시, Naong에 가입되지 않아 새로 가입하는 경우 추가 정보를 입력 받는 페이지에서\n" +
                    "저장버튼을 누르게 될 시 이 쪽 경로로 요청을 보내시면 됩니다.")
    @PostMapping("/auth/kakao")
    public ResponseEntity<String> kakaoAdditionalSignup(@RequestBody KakaoSignupDto kakaoSignupDto) {
        return new ResponseEntity<>(kakaoAuthService.additionalSignUp(kakaoSignupDto), HttpStatus.OK);
    }
}
