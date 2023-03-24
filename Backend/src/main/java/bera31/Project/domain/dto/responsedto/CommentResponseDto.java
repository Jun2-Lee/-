package bera31.Project.domain.dto.responsedto;

import bera31.Project.domain.comment.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CommentResponseDto {
    Long id;
    String content;
    String author;
    String profileImage;
    LocalDateTime postTime;
    List<CommentResponseDto> childCommentResponseDto = new ArrayList<>();

    public CommentResponseDto(Comment comment) {
        this.id = comment.getId();
        this.content = comment.getContent();
        this.author = comment.getUser().getNickname();
        this.profileImage = comment.getUser().getProfileImage();
        this.postTime = comment.getTimeStamp();
    }

    public void addChild(CommentResponseDto child) {
        childCommentResponseDto.add(child);
    }
}
