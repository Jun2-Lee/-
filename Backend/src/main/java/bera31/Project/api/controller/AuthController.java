package bera31.Project.api.controller;

import bera31.Project.domain.dto.requestdto.LogInDto;
import bera31.Project.domain.dto.requestdto.SignUpDto;
import bera31.Project.domain.dto.requestdto.TokenRequestDto;
import bera31.Project.domain.dto.responsedto.AuthTokenDto;
import bera31.Project.service.AuthService;
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
    @PostMapping ("/signup")
    public ResponseEntity<Long> signUp(@RequestPart SignUpDto signUpDto,
                       @RequestPart MultipartFile profileImage) throws Exception {
        return new ResponseEntity<>(authService.signUp(signUpDto, profileImage), HttpStatus.OK);
    }
    @PostMapping("/signup/nameDuplicate")
    public ResponseEntity<String> checkDuplication(@RequestBody String nickname){
        return new ResponseEntity<>(authService.checkNickname(nickname), HttpStatus.OK);
    }

    @PostMapping("/signin")
    public ResponseEntity<AuthTokenDto> signIn(@RequestBody LogInDto logInDto){
        return new ResponseEntity<>(authService.signIn(logInDto), HttpStatus.OK);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(){
        return new ResponseEntity<>(authService.logout(), HttpStatus.OK);
    }

    @PostMapping("/reissue")
    public ResponseEntity<AuthTokenDto> reissue(@RequestBody TokenRequestDto tokenRequestDto){
        return new ResponseEntity<>(authService.reissue(tokenRequestDto), HttpStatus.OK);
    }
}
