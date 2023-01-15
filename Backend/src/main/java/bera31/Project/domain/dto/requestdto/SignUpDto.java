package bera31.Project.domain.dto.requestdto;

import bera31.Project.domain.Address;
import bera31.Project.domain.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class SignUpDto {
    String email;
    String password;
    String nickname;
    Address address;
}
