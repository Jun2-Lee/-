package bera31.Project.domain.dto.responsedto;

import bera31.Project.domain.page.groupbuying.GroupBuying;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class SimpleFavoriteGroupBuyingResponseDto {
    String title;
    LocalDateTime postTime;

    public SimpleFavoriteGroupBuyingResponseDto(GroupBuying groupBuying){
        this.title = groupBuying.getTitle();
        this.postTime = groupBuying.getPostTime();
    }
}
