package bera31.Project.domain.dto.responsedto.groupbuying;

import bera31.Project.domain.page.dutchpay.DutchPay;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import bera31.Project.domain.page.sharing.Sharing;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class SimpleContentsResponseDto {
    Long id;
    String title;
    LocalDateTime postTime;

    public SimpleContentsResponseDto(GroupBuying groupBuying) {
        this.id = groupBuying.getId();
        this.title = groupBuying.getTitle();
        this.postTime = groupBuying.getPostTime();
    }

    public SimpleContentsResponseDto(Sharing sharing) {
        this.id = sharing.getId();
        this.title = sharing.getTitle();
        this.postTime = sharing.getPostTime();
    }

    public SimpleContentsResponseDto(DutchPay dutchPay) {
        this.id = dutchPay.getId();
        this.title = dutchPay.getStore();
        this.postTime = dutchPay.getPostTime();
    }
}
