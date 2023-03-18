package bera31.Project.domain.page.intersection;

import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.Contents;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class LikedGroupBuying {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;
    @ManyToOne
    @JoinColumn(name = "CONTENTS_ID")
    private GroupBuying groupBuying;

    public LikedGroupBuying(Member member, GroupBuying groupBuying) {
        this.member = member;
        this.groupBuying = groupBuying;
    }
}
