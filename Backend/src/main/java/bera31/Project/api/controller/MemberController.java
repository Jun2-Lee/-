package bera31.Project.api.controller;

import bera31.Project.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MemberController {
    private final MemberService memberService;

    @PutMapping("/changeInfo")
    public String changeInfo(@RequestBody String dong, String gu) {
        return "Ok";
    }

    @PutMapping("/changePassword")
    public String changePassword(@RequestBody String newPassword) {
        return memberService.changePassword(newPassword);
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
