package bera31.Project.domain.member;

import bera31.Project.domain.Address;
import bera31.Project.domain.message.Room;
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

    @OneToMany(mappedBy = "participant")
    private List<GroupBuyingIntersection> participantingGroupBuying = new ArrayList<>();

    @OneToMany(mappedBy = "participant")
    private List<DutchPayIntersection> participantingDutchPay = new ArrayList<>();

    @OneToMany
    @JoinColumn(name = "MEMBER_ID")
    private List<Sharing> favoriteSharing = new ArrayList<>();

    @OneToMany
    @JoinColumn(name = "MEMBER_ID")
    private List<GroupBuying> favoriteBuying = new ArrayList<>();

    @Transient
    private List<String> favoriteFood = new ArrayList<>();

    @OneToMany(mappedBy = "member1")
    private List<Room> roomList = new ArrayList<>();

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

    public void changeImage(String image) {
        this.profileImage = image;
    }

    public void addMemo(Schedule schedule) {
        this.memoList.add(schedule);
    }

    public void addSharing(Sharing sharing) {
        this.sharingList.add(sharing);
    }

    public void addFavoriteSharing(Sharing sharing) { this.favoriteSharing.add(sharing); }
    public void cancelFavoriteSharing(Sharing sharing) { this.favoriteSharing.remove(sharing); }
    public void addFavoriteGroupBuying(GroupBuying groupBuying) {
        this.favoriteBuying.add(groupBuying);
    }
    public void cancelFavoriteGroupBuying(GroupBuying groupBuying) { this.favoriteBuying.remove(groupBuying); }
}
