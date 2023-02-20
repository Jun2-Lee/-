package bera31.Project.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.ResponseEntity;

@Getter
@AllArgsConstructor
public class ErrorResponseEntity {
    private int status;
    private String code;
    private String message;

    public static ResponseEntity<ErrorResponseEntity> createResponseEntity(ErrorResponse e){
        return ResponseEntity.status(e.getHttpStatus())
                .body(new ErrorResponseEntity(
                        e.getHttpStatus().value(), e.name(), e.getMessage()));
    }
}
