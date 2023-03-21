package bera31.Project.domain.dto.responsedto.dutchpay;

import bera31.Project.domain.page.dutchpay.DutchPay;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DutchPayResponseDto {
    Long id;
    Long userId;
    String nickname;
    String profileImage;
    String store;
    String category;
    int deliveryCost;
    int limitMember;
    String address;
    String detailAddress;
    LocalDateTime deadLine;
    LocalDateTime postTime;
    String content;
    int currentMember;

    public DutchPayResponseDto(DutchPay dutchPay) {
        this.id = dutchPay.getId();
        this.userId = dutchPay.getUser().getId();
        this.nickname = dutchPay.getUser().getNickname();
        this.profileImage = dutchPay.getUser().getProfileImage();
        this.store = dutchPay.getStore();
        this.category = dutchPay.getCategory();
        this.deliveryCost = dutchPay.getDeliveryCost();
        this.limitMember = dutchPay.getLimitMember();
        this.currentMember = dutchPay.getMemberList().size();
        this.deadLine = dutchPay.getDeadLine();
        this.address = dutchPay.getAddress();
        this.detailAddress = dutchPay.getDetailAddress();
        this.content = dutchPay.getContent();
        this.postTime = dutchPay.getPostTime();
    }
}
