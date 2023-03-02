package bera31.Project.domain.dto.responsedto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class KakaoTokenDto {
    private String id_token;
    private String token_type;
    private String access_token;
    private int expires_in;
    private String refresh_token;
    private String refresh_token_expires_in;
    private String scope;
}
