package bera31.Project.domain.dto.requestdto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class LogInDto {
    String email;
    String password;
}
