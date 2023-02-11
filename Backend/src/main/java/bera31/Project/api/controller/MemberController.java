package bera31.Project.api.controller;

import bera31.Project.domain.dto.requestdto.ChangePasswordDto;
import bera31.Project.domain.dto.requestdto.EditInfoRequestDto;
import bera31.Project.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MemberController {
    private final MemberService memberService;

    @PutMapping("/changeInfo")
    public String changeInfo(@RequestPart EditInfoRequestDto editInfoRequestDto,
                             @RequestPart MultipartFile profileImage) throws IOException {
        return memberService.changeMyInfo(editInfoRequestDto, profileImage);
    }

    @PutMapping("/changePassword")
    public String changePassword(@RequestBody ChangePasswordDto changePasswordDto) {
        return memberService.changePassword(changePasswordDto.getNewPassword());
    }

    @DeleteMapping
    public String deleteMember() {
        return "ok";
    }

    @PutMapping("/photo")
    public String changeProfile() {
        return "ok";
    }
}
