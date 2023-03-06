package bera31.Project.domain.page.intersection;

import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.dutchpay.DutchPay;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Getter
public class DutchPayIntersection {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PARTICIPANT_ID")
    private Member participant;

    @ManyToOne
    @JoinColumn(name = "CONTENTS_ID")
    private DutchPay dutchPay;

    public DutchPayIntersection(Member participant, DutchPay dutchPay){
        this.participant = participant;
        this.dutchPay = dutchPay;
    }
}
