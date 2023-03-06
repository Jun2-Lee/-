package bera31.Project.domain.dto.responsedto.groupbuying;

import bera31.Project.domain.comment.Comment;
import bera31.Project.domain.dto.responsedto.CommentResponseDto;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
public class GroupBuyingResponseDto {
    Long id;
    String title;
    String profileImage;
    Long userId;
    String nickName;
    Double manner;
    String category;
    String product;
    LocalDateTime deadLine;
    int limitMember;
    int currentMember;
    List<CommentResponseDto> commentList;

    public GroupBuyingResponseDto(GroupBuying groupBuying, List<CommentResponseDto> commentList) {
        this.id = groupBuying.getId();
        this.profileImage = groupBuying.getImage();
        this.title = groupBuying.getTitle();
        this.userId = groupBuying.getUser().getId();
        this.nickName = groupBuying.getUser().getNickname();
        this.manner = groupBuying.getUser().getManner();
        this.category = groupBuying.getCategory();
        this.product = groupBuying.getProduct();
        this.deadLine = groupBuying.getDeadLine();
        this.currentMember = groupBuying.getMemberList().size();
        this.limitMember = groupBuying.getLimitMember();
        this.commentList = commentList;
    }
}
