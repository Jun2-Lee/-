package bera31.Project.domain.dto.responsedto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AuthTokenDto {
    private String grantType; // Bearer
    private String accessToken;
    private String refreshToken;
    private Long accessTokenValidTime;
}
