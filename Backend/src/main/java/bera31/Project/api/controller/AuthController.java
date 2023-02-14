package bera31.Project.api.controller;

import bera31.Project.domain.dto.requestdto.LogInDto;
import bera31.Project.domain.dto.requestdto.SignUpDto;
import bera31.Project.domain.dto.requestdto.TokenRequestDto;
import bera31.Project.domain.dto.responsedto.AuthTokenDto;
import bera31.Project.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;
    @PostMapping ("/signup")
    public Long signUp(@RequestPart SignUpDto signUpDto,
                       @RequestPart MultipartFile profileImage) throws Exception {
        return authService.signUp(signUpDto, profileImage);
    }

    @PostMapping("/signin")
    public AuthTokenDto signIn(@RequestBody LogInDto logInDto){
        return authService.signIn(logInDto);
    }

    @PostMapping("/logout")
    public String logout(){
        return authService.logout();
    }

    @PostMapping("/reissue")
    public AuthTokenDto reissue(@RequestBody TokenRequestDto tokenRequestDto){
        return authService.reissue(tokenRequestDto);
    }
}
