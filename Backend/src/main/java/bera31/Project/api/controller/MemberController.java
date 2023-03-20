package bera31.Project.api.controller;

import bera31.Project.domain.dto.requestdto.ChangePasswordDto;
import bera31.Project.domain.dto.requestdto.EditInfoRequestDto;
import bera31.Project.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {
    private final MemberService memberService;

    @Operation(summary = "내 정보 변경 API입니다.",
            description = "form-data/multipart 형식으로 보내주시면 됩니다.")
    @PutMapping("/mypage/changeInfo")
    public ResponseEntity<String> changeInfo(@RequestPart EditInfoRequestDto editInfoRequestDto,
                             @RequestPart MultipartFile profileImage) throws IOException {
        return new ResponseEntity<>(memberService.changeMyInfo(editInfoRequestDto, profileImage), HttpStatus.OK);
    }

    @Operation(summary = "비밀번호 변경 API입니다.",
            description = "변경할 비밀번호를 넘겨주시면 됩니다.\n\n" +
                    "다만, Kakao 로그인 유저가 비밀번호 변경 시도 시 KAKAO_USER_ACCESS_DENIED 에러가 발생합니다.")
    @PutMapping("/mypage/changePassword")
    public ResponseEntity<String> changePassword(@RequestBody ChangePasswordDto changePasswordDto) {
        return new ResponseEntity<>(memberService.changePassword(changePasswordDto.getNewPassword()), HttpStatus.OK);
    }

    @Operation(summary = "회원 탈퇴 API입니다.",
            description = "요청을 보내주시면 DB에서 해당 회원을 제거합니다. \n\n" +
                    "이후, Refresh Token 또한 제거됩니다.")
    @DeleteMapping("/mypage/withdraw")
    public ResponseEntity<String> withdraw(){
        return new ResponseEntity<>(memberService.deleteMember(), HttpStatus.OK);
    }
}
