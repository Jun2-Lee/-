package bera31.Project.domain.dto.responsedto;

import bera31.Project.domain.comment.ChildComment;
import bera31.Project.domain.comment.Comment;

import java.time.LocalDateTime;

public class ChildCommentResponseDto {
    String content;
    String author;
    String profileImage;
    LocalDateTime postTime;

    public ChildCommentResponseDto(ChildComment comment){
        this.content = comment.getContent();
        this.author = comment.getUser().getNickname();
        this.profileImage = comment.getUser().getProfileImage();
        this.postTime = comment.getTimeStamp();
    }
}
