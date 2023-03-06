package bera31.Project.exception;

import bera31.Project.exception.exceptions.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionAdvice {
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ErrorResponseEntity> handleUserNotFoundException(UserNotFoundException e) {
        return ErrorResponseEntity.createResponseEntity(e.getErrorResponse());
    }

    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponseEntity> handleUnauthroizedException(UnauthorizedException e) {
        return ErrorResponseEntity.createResponseEntity(e.getErrorResponse());
    }

    @ExceptionHandler(ExpiredTokenException.class)
    public ResponseEntity<ErrorResponseEntity> handleTokenException(ExpiredTokenException e) {
        return ErrorResponseEntity.createResponseEntity(e.getErrorResponse());
    }

    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<ErrorResponseEntity> handleIncorrectPasswordException(IncorrectPasswordException e) {
        return ErrorResponseEntity.createResponseEntity(e.getErrorResponse());
    }

    @ExceptionHandler(EmailDuplicateException.class)
    public ResponseEntity<ErrorResponseEntity> handleEmailDuplicateException(EmailDuplicateException e) {
        return ErrorResponseEntity.createResponseEntity(e.getErrorResponse());
    }

    @ExceptionHandler(NicknameDuplicateException.class)
    public ResponseEntity<ErrorResponseEntity> handleNicknameDuplicateException(NicknameDuplicateException e) {
        return ErrorResponseEntity.createResponseEntity(e.getErrorResponse());
    }

    @ExceptionHandler(AlreadyFullException.class)
    public ResponseEntity<ErrorResponseEntity> handleAlreadyFullException(AlreadyFullException e) {
        return ErrorResponseEntity.createResponseEntity(e.getErrorResponse());
    }

    @ExceptionHandler(KakaoUserAccessException.class)
    public ResponseEntity<ErrorResponseEntity> handleKakaoUserAccessException(KakaoUserAccessException e) {
        return ErrorResponseEntity.createResponseEntity(e.getErrorResponse());
    }
}
