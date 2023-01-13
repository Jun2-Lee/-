package bera31.Project.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class MemberController {
    @GetMapping
    public String getMyGroupBuying(){
        return "ok";
    }
    @PutMapping("/address")
    public String changeAddress() {
        return "ok";
    }

    @PutMapping("/password")
    public String changePassword() {
        return "ok";
    }

    @PutMapping("/food")
    public String changeFood() {
        return "ok";
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
