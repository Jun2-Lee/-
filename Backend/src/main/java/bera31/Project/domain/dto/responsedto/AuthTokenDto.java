package bera31.Project.domain.dto.responsedto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.Date;

@AllArgsConstructor
@Getter
public class AuthTokenDto {
    private String grantType; // Bearer
    private String accessToken;
    private String refreshToken;

    @JsonFormat(timezone = "Asia/Seoul")
    private Date accessTokenValidTime;
}
