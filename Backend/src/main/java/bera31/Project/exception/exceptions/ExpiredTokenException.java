package bera31.Project.exception.exceptions;

import bera31.Project.exception.ErrorResponse;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Header;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExpiredTokenException extends RuntimeException {
    ErrorResponse errorResponse;
}
