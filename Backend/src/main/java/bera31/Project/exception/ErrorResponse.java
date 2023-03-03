package bera31.Project.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ErrorResponse {
    UNAUTHORIZED(HttpStatus.UNAUTHORIZED, "로그인 후 이용해주시기 바랍니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "만료된 JWT Token 입니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "해당 정보에 해당하는 User가 없습니다."),
    TOKEN_MISMATCH(HttpStatus.NOT_FOUND, "토큰과 유저의 정보가 일치하지 않습니다."),
    INCORRECT_PASSWORD(HttpStatus.BAD_REQUEST, "옳지 않은 비밀번호 입니다."),
    LOGGED_OUT_USER(HttpStatus.BAD_REQUEST, "이미 로그아웃 된 유저 입니다."),
    EMAIL_DUPLICATE(HttpStatus.BAD_REQUEST, "이미 존재하는 이메일입니다."),
    NICKNAME_DUPLICATE(HttpStatus.BAD_REQUEST, "이미 존재하는 닉네임입니다."),
    KAKAO_ACCESS_DENIED(HttpStatus.BAD_REQUEST, "KAKAO 로그인 유저는 사용하실 수 없는 기능입니다."),
    ALREADY_FULL(HttpStatus.OK, "신청 인원이 가득 찼습니다.")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
