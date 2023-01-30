package bera31.Project.domain.page.intersection;

import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Data
public class GroupBuyingIntersection {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "PARTICIPANT_ID")
    private Member participant;

    @ManyToOne
    @JoinColumn(name = "CONTENTS_ID")
    private GroupBuying groupBuying;

    public GroupBuyingIntersection(Member participant, GroupBuying groupBuying) {
        this.participant = participant;
        this.groupBuying = groupBuying;
    }
}
