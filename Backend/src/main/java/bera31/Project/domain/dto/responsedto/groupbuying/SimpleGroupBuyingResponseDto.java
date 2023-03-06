package bera31.Project.domain.dto.responsedto.groupbuying;

import bera31.Project.domain.page.groupbuying.GroupBuying;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class SimpleGroupBuyingResponseDto {
    String title;
    LocalDateTime postTime;

    public SimpleGroupBuyingResponseDto(GroupBuying groupBuying) {
        this.title = groupBuying.getTitle();
        this.postTime = groupBuying.getPostTime();
    }
}
