package bera31.Project.domain.dto.responsedto.dutchpay;

import bera31.Project.domain.page.dutchpay.DutchPay;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DutchPayListResponseDto {
    Long id;
    String nickname;
    String store;
    String category;
    String address;
    int deliveryCost;
    int currentMember;
    int limitMember;
    LocalDateTime deadLine;
    LocalDateTime postTime;

    public DutchPayListResponseDto(DutchPay dutchPay) {
        this.id = dutchPay.getId();
        this.nickname = dutchPay.getUser().getNickname();
        this.store = dutchPay.getStore();
        this.category = dutchPay.getCategory();
        this.address = dutchPay.getAddress();
        this.deliveryCost = dutchPay.getDeliveryCost();
        this.limitMember = dutchPay.getLimitMember();
        this.currentMember = dutchPay.getMemberList().size();
        this.deadLine = dutchPay.getDeadLine();
        this.postTime = dutchPay.getPostTime();
    }
}
