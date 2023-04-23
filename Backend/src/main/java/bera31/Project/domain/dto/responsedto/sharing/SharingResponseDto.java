package bera31.Project.domain.dto.responsedto.sharing;

import bera31.Project.domain.Address;
import bera31.Project.domain.comment.Comment;
import bera31.Project.domain.dto.responsedto.CommentResponseDto;
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
    Long userId;
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
    boolean checkMine;
    List<CommentResponseDto> commentResponseDtoList;

    public SharingResponseDto(Sharing sharing, List<CommentResponseDto> commentResponseDtoList, boolean checkMine) {
        this.id = sharing.getId();
        this.userId = sharing.getUser().getId();
        this.nickname = sharing.getUser().getNickname();
        this.profileImage = sharing.getUser().getProfileImage();
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
        this.commentResponseDtoList = commentResponseDtoList;
        this.checkMine = checkMine;
    }
}