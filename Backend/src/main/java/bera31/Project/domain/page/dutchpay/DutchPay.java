package bera31.Project.domain.page.dutchpay;

import bera31.Project.domain.dto.requestdto.DutchPayRequestDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.Contents;
import bera31.Project.domain.page.intersection.DutchPayIntersection;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class DutchPay extends Contents {
    String category;
    String store;
    int deliveryCost;
    int limitMember;

    @OneToMany(mappedBy = "dutchPay")
    List<DutchPayIntersection> memberList = new ArrayList<>();

    double x;
    double y;
    LocalDateTime deadLine;
    String content;
    String dong;

    public DutchPay(DutchPayRequestDto dutchPayRequestDto, Member member) {
        this.user = member;
        this.title = dutchPayRequestDto.getTitle();
        this.category = dutchPayRequestDto.getCategory();
        this.store = dutchPayRequestDto.getStore();
        this.deliveryCost = dutchPayRequestDto.getDeliveryCost();
        this.limitMember = dutchPayRequestDto.getLimitMember();
        this.x = dutchPayRequestDto.getX();
        this.y = dutchPayRequestDto.getY();
        this.deadLine = dutchPayRequestDto.getDeadLine();
        this.content = dutchPayRequestDto.getContent();
        this.postTime = LocalDateTime.now();
        this.dong = member.getDong();
    }

    public void addParticipantMember(DutchPayIntersection dutchPayIntersection){
        memberList.add(dutchPayIntersection);
    }
}
