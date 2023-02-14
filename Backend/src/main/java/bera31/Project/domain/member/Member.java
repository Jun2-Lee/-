package bera31.Project.domain.member;

import bera31.Project.domain.message.Message;
import bera31.Project.domain.page.intersection.LikedGroupBuying;
import bera31.Project.domain.schedule.Schedule;
import bera31.Project.domain.page.dutchpay.DutchPay;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import bera31.Project.domain.page.intersection.DutchPayIntersection;
import bera31.Project.domain.page.intersection.GroupBuyingIntersection;
import bera31.Project.domain.page.sharing.Sharing;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "MEMBER_ID")
    private Long id;
    private String email;
    private String nickname;
    private String password;
    private String profileImage;
    @Enumerated(EnumType.STRING)
    private Authority authority;
    private String dong;
    private String gu;
    private double manner;

    @OneToMany(mappedBy = "user")
    private List<Sharing> sharingList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<GroupBuying> buyingList = new ArrayList<>();
    @OneToMany(mappedBy = "user")
    private List<DutchPay> dutchPayList = new ArrayList<>();

    @OneToMany(mappedBy = "participant", fetch = FetchType.LAZY)
    private List<GroupBuyingIntersection> participantingGroupBuying = new ArrayList<>();
    @OneToMany(mappedBy = "participant", fetch = FetchType.LAZY)
    private List<DutchPayIntersection> participantingDutchPay = new ArrayList<>();

    @OneToMany
    @JoinColumn(name = "MEMBER_ID")
    private List<Sharing> likedSharing = new ArrayList<>();
    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<LikedGroupBuying> likedGroupBuying = new ArrayList<>();

    @Transient
    private List<String> favoriteFood = new ArrayList<>();
    // 얘는 영속적인 값이 아니게 되는데?
    // 이걸 어떻게 처리를 할 것인가?

    @OneToMany
    @JoinColumn(name = "MEMBER_ID")
    private List<Schedule> memoList = new ArrayList<>();

    public Member(String email, String password, String nickname, String dong, String gu){
        this.email = email;
        this.password = password;
        this.nickname = nickname;
        this.dong = dong;
        this.gu = gu;
        this.authority = Authority.ROLE_USER;
    }

    public void postGroupBuying(GroupBuying groupBuying){
        buyingList.add(groupBuying);
    }
    public void participantGroupBuying(GroupBuyingIntersection groupBuyingIntersection){
        participantingGroupBuying.add(groupBuyingIntersection);
    }

    public void changePassword(String password) {
        this.password = password;
    }
    public void changeAddress(String dong, String gu) {
        this.dong = dong;
        this.gu = gu;
    }
    public void setProfileImage(String image) {
        this.profileImage = image;
    }
    public void changeFavIngredients(List<String> favIngredients){
        this.favoriteFood = favIngredients;
    }
    public void addSharing(Sharing sharing) {
        this.sharingList.add(sharing);
    }
    public void addFavoriteSharing(Sharing sharing) { this.likedSharing.add(sharing); }
    public void cancelFavoriteSharing(Sharing sharing) { this.likedSharing.remove(sharing); }
    public void pushLikeGroupBuying(LikedGroupBuying likedGroupBuying) {
        this.likedGroupBuying.add(likedGroupBuying);
    }
    public void addMemo(Schedule schedule) {
        this.memoList.add(schedule);
    }
}
