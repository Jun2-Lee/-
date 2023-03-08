package bera31.Project.domain.dto.requestdto;

import bera31.Project.domain.page.dutchpay.Category;
import bera31.Project.domain.page.dutchpay.DutchPay;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DutchPayRequestDto {
    String store;
    String category;
    String address;
    String detailAddress;
    int deliveryCost;
    int limitMember;
    LocalDateTime deadLine;
    String content;
}
