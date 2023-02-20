package bera31.Project.domain.dto.responsedto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import java.util.Date;

@AllArgsConstructor
@Getter
public class AuthTokenDto {
    private String grantType; // Bearer
    private String accessToken;
    private String refreshToken;
    private Date accessTokenValidTime;
}
