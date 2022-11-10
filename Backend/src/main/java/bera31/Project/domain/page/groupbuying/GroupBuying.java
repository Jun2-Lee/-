package bera31.Project.domain.page.groupbuying;

import bera31.Project.domain.dto.requestdto.GroupBuyingRequestDto;
import bera31.Project.domain.page.Contents;
import bera31.Project.domain.page.intersection.GroupBuyingIntersection;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class GroupBuying extends Contents {
    String productName;
    String link;

    LocalDateTime deadLine;
    String content;
    int cost;
    String image;
    int limitMember;

    @OneToMany(mappedBy = "groupBuying")
    List<GroupBuyingIntersection> memberList = new ArrayList<>();
    boolean isFinish;

    public Long update(GroupBuyingRequestDto groupBuyingRequestDto) {
        this.cost = groupBuyingRequestDto.getPrice();
        this.limitMember = groupBuyingRequestDto.getMemberLimit();
        this.content = groupBuyingRequestDto.getContent();
        this.productName = groupBuyingRequestDto.getProductName();
        this.deadLine = groupBuyingRequestDto.getDeadLine();
        this.link = groupBuyingRequestDto.getLink();
        this.image = groupBuyingRequestDto.getImage();
        this.title = groupBuyingRequestDto.getTitle();
        return this.getId();
    }

    public GroupBuying(GroupBuyingRequestDto groupBuyingRequestDto) {
        this.cost = groupBuyingRequestDto.getPrice();
        this.limitMember = groupBuyingRequestDto.getMemberLimit();
        this.content = groupBuyingRequestDto.getContent();
        this.isFinish = false;
        this.productName = groupBuyingRequestDto.getProductName();
        this.deadLine = groupBuyingRequestDto.getDeadLine();
        this.postTime = LocalDateTime.now();
        this.link = groupBuyingRequestDto.getLink();
        this.image = groupBuyingRequestDto.getImage();
        this.title = groupBuyingRequestDto.getTitle();
    }
}
