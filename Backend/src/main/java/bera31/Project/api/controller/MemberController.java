package bera31.Project.api.controller;

import bera31.Project.domain.dto.requestdto.ChangePasswordDto;
import bera31.Project.domain.dto.requestdto.EditInfoRequestDto;
import bera31.Project.service.MemberService;
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

    @PutMapping("/mypage/changeInfo")
    public String changeInfo(@RequestPart EditInfoRequestDto editInfoRequestDto,
                             @RequestPart MultipartFile profileImage) throws IOException {
        return memberService.changeMyInfo(editInfoRequestDto, profileImage);
    }

    @PutMapping("/mypage/changePassword")
    public String changePassword(@RequestBody ChangePasswordDto changePasswordDto) {
        return memberService.changePassword(changePasswordDto.getNewPassword());
    }

    @PostMapping("/groupBuying/heart/{postId}")
    public ResponseEntity<String> addFavoriteGroupBuying(@PathVariable Long postId){
        return new ResponseEntity<>(memberService.addFavoriteGroupBuying(postId), HttpStatus.OK);
    }

    @DeleteMapping
    public String deleteMember() {
        return "ok";
    }
}
