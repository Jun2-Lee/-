package bera31.Project.domain.dto.responsedto.groupbuying;

import bera31.Project.domain.dto.responsedto.CommentResponseDto;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
public class GroupBuyingResponseDto {
    Long id;
    String title;
    String profileImage;
    Long userId;
    String nickName;
    String postImage;
    String category;
    String product;
    String content;
    String link;
    String gu;
    String dong;
    LocalDateTime deadLine;
    LocalDateTime postTime;
    boolean checkMine;
    int price;
    int limitMember;
    int currentMember;
    List<CommentResponseDto> commentList;

    public GroupBuyingResponseDto(GroupBuying groupBuying, List<CommentResponseDto> commentList, boolean checkMine) {
        this.id = groupBuying.getId();
        this.profileImage = groupBuying.getUser().getProfileImage();
        this.title = groupBuying.getTitle();
        this.userId = groupBuying.getUser().getId();
        this.nickName = groupBuying.getUser().getNickname();
        this.category = groupBuying.getCategory();
        this.postImage = groupBuying.getImage();
        this.product = groupBuying.getProduct();
        this.price = groupBuying.getCost();
        this.deadLine = groupBuying.getDeadLine();
        this.content = groupBuying.getContent();
        this.link = groupBuying.getLink();
        this.gu = groupBuying.getGu();
        this.dong = groupBuying.getDong();
        this.currentMember = groupBuying.getMemberList().size();
        this.limitMember = groupBuying.getLimitMember();
        this.commentList = commentList;
        this.postTime = groupBuying.getPostTime();
        this.checkMine = checkMine;
    }
}
