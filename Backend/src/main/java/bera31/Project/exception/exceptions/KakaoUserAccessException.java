package bera31.Project.exception.exceptions;

import bera31.Project.exception.ErrorResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class KakaoUserAccessException extends RuntimeException {
    ErrorResponse errorResponse;
}
