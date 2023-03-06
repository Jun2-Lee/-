package bera31.Project.domain.page.intersection;

import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import bera31.Project.domain.page.sharing.Sharing;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class LikedSharing {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "CONTENTS_ID")
    private Sharing sharing;

    public LikedSharing(Member member, Sharing sharing){
        this.member = member;
        this.sharing = sharing;
    }
}
