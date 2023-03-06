package bera31.Project.domain.dto.responsedto;

import bera31.Project.domain.Address;
import bera31.Project.domain.comment.Comment;
import bera31.Project.domain.page.sharing.Sharing;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SharingResponseDto {

    Long id;
    Double manner;
    String nickname;
    String profileImage;
    String title;
    String content;
    String category;
    String product;
    String gu;
    String dong;
    LocalDateTime deadLine;
    LocalDateTime expiry;
    LocalDateTime postTime;
    String image;
    List<Comment> comment;

    public SharingResponseDto(Sharing sharing){
        this.id = sharing.getId();
        this.manner = 3.0;
        this.nickname = "심진섭";
        this.profileImage = "sharing.getUser().getProfileImage()";
        this.title = sharing.getTitle();
        this.content = sharing.getContent();
        this.category = sharing.getCategory();
        this.product = sharing.getProduct();
        this.gu = sharing.getGu();
        this.dong = sharing.getDong();
        this.deadLine = sharing.getDeadLine();
        this.postTime = sharing.getPostTime();
        this.expiry = sharing.getExpiry();
        this.image = sharing.getImage();
        this.comment = sharing.getComments();
    }
}