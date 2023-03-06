package bera31.Project.domain.dto.responsedto;

import bera31.Project.domain.Address;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.sharing.Sharing;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SharingListResponseDto {

    Long id;
    String image;
    String nickname;
    String title;
    String dong;
    LocalDateTime deadLine;
    LocalDateTime postTime;

    public SharingListResponseDto(Sharing sharing) {
        this.id = sharing.getId();
        this.image = sharing.getImage();
        this.nickname = "sharing.getUser().getNickname()";
        this.title = sharing.getTitle();
        this.dong = sharing.getDong();
        this.deadLine = sharing.getDeadLine();
        this.postTime = sharing.getPostTime();
    }
}