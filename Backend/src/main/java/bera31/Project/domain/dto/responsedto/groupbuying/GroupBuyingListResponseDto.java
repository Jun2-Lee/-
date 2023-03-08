package bera31.Project.domain.dto.responsedto.groupbuying;

import bera31.Project.domain.Address;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GroupBuyingListResponseDto {
    Long id;
    String image;
    String nickname;
    String title;
    String category;
    LocalDateTime postTime;
    Address address;
    LocalDateTime deadLine;
    int limit;
    int currParticipant;
    boolean isFinish;

    public GroupBuyingListResponseDto(GroupBuying groupBuying) {
        Member author = groupBuying.getUser();
        this.id = groupBuying.getId();
        this.image = groupBuying.getImage();
        this.nickname = author.getNickname();
        this.title = groupBuying.getTitle();
        this.category = groupBuying.getCategory();
        this.postTime = groupBuying.getPostTime();
        this.deadLine = groupBuying.getDeadLine();
        this.limit = groupBuying.getLimitMember();
        this.currParticipant = groupBuying.getMemberList().size();
        this.isFinish = groupBuying.isFinish();
    }
}
