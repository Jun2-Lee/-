package bera31.Project.api.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/myPage")
public class MyPageController {
    /*
    @GetMapping
    public MyPageDto showMyPage(){
        return myPageDto;
    }

    @GetMapping("/edit")
    public String editMyInfo(){
        return "OK";
    }
     */
}
