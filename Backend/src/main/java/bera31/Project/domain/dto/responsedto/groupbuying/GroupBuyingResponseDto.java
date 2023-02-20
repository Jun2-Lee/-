package bera31.Project.domain.dto.responsedto.groupbuying;

import bera31.Project.domain.page.groupbuying.GroupBuying;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class GroupBuyingResponseDto {
    Long id;
    String title;
    String profileImage;
    String nickName;
    Double manner;
    String category;
    String product;
    LocalDateTime deadLine;
    int limitMember;
    int currentMember;

    public GroupBuyingResponseDto(GroupBuying groupBuying) {
        this.id = groupBuying.getId();
        this.profileImage = groupBuying.getImage();
        this.title = groupBuying.getTitle();
        this.nickName = groupBuying.getUser().getNickname();
        this.manner = groupBuying.getUser().getManner();
        this.category = groupBuying.getCategory();
        this.product = groupBuying.getProduct();
        this.deadLine = groupBuying.getDeadLine();
        this.currentMember = groupBuying.getMemberList().size();
        this.limitMember = groupBuying.getLimitMember();
    }
}
