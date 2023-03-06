package bera31.Project.service.page;

import bera31.Project.domain.dto.responsedto.*;
import bera31.Project.domain.dto.responsedto.dutchpay.DutchPayListResponseDto;
import bera31.Project.domain.dto.responsedto.groupbuying.GroupBuyingListResponseDto;
import bera31.Project.domain.dto.responsedto.groupbuying.SimpleContentsResponseDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.intersection.DutchPayIntersection;
import bera31.Project.domain.page.intersection.GroupBuyingIntersection;
import bera31.Project.domain.page.intersection.LikedGroupBuying;
import bera31.Project.domain.page.intersection.LikedSharing;
import bera31.Project.repository.MemberRepository;
import bera31.Project.repository.page.IntersectionRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MyPageService {
    private final MemberRepository memberRepository;
    private final IntersectionRepository intersectionRepository;

    public MyPageResponseDto showMyPage(){
        Member findedMember = loadCurrentMember();

        // Refactoring 대상!!
        List<SimpleContentsResponseDto> simpleGroupBuyinglist
                = findedMember.getBuyingList()
                    .stream()
                    .limit(4)
                    .map(SimpleContentsResponseDto::new)
                    .collect(Collectors.toList());

        List<SimpleContentsResponseDto> simpleLikedGroupBuyinglist
                = findedMember.getLikedGroupBuyings()
                .stream()
                .limit(4)
                .map(LikedGroupBuying::getGroupBuying)
                .map(SimpleContentsResponseDto::new)
                .collect(Collectors.toList());

        List<SimpleContentsResponseDto> simpleParticipantingGroupBuyingList
                = findedMember.getParticipantingGroupBuying().stream()
                .limit(4)
                .map(GroupBuyingIntersection::getGroupBuying)
                .map(SimpleContentsResponseDto::new)
                .collect(Collectors.toList());

        List<SimpleContentsResponseDto> simpleSharingList
                = findedMember.getSharingList().stream()
                .limit(4)
                .map(SimpleContentsResponseDto::new)
                .collect(Collectors.toList());

        List<SimpleContentsResponseDto> simpleLikedSharingList
                = findedMember.getLikedSharings().stream()
                .limit(4)
                .map(LikedSharing::getSharing)
                .map(SimpleContentsResponseDto::new)
                .collect(Collectors.toList());

        List<SimpleContentsResponseDto> simpleDutchPayList
                = findedMember.getDutchPayList()
                .stream()
                .limit(4)
                .map(SimpleContentsResponseDto::new)
                .collect(Collectors.toList());

        List<SimpleContentsResponseDto> simpleParticipantingDutchPayList
                = findedMember.getParticipantingDutchPay()
                .stream()
                .limit(4)
                .map(DutchPayIntersection::getDutchPay)
                .map(SimpleContentsResponseDto::new)
                .collect(Collectors.toList());

        List<TodayScheduleResponseDto> todaySchedules
                = findedMember.getMemoList().stream()
                .limit(4)
                .filter(s -> s.getTargetDate().equals(LocalDate.now()))
                .map(TodayScheduleResponseDto::new)
                .collect(Collectors.toList());

        return new MyPageResponseDto(
                findedMember.getProfileImage(), findedMember.getNickname(),
                simpleGroupBuyinglist, simpleLikedGroupBuyinglist, simpleParticipantingGroupBuyingList,
                simpleSharingList, simpleLikedSharingList,
                simpleDutchPayList, simpleParticipantingDutchPayList,
                todaySchedules);
    }

    public List<GroupBuyingListResponseDto> showMyGroupBuying(){
        Member findedMember = loadCurrentMember();

        return findedMember.getBuyingList().stream()
                .map(GroupBuyingListResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<DutchPayListResponseDto> showMyDutchPay(){
        Member currentMember = loadCurrentMember();

        return currentMember.getDutchPayList().stream()
                .map(DutchPayListResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<GroupBuyingListResponseDto> showParticipantingGroupBuying(){
        Member currentMember = loadCurrentMember();

        return currentMember.getParticipantingGroupBuying()
                .stream()
                .map(GroupBuyingIntersection::getGroupBuying)
                .map(GroupBuyingListResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<DutchPayListResponseDto> showParticipantingDutchPay(){
        Member findedMember = loadCurrentMember();

        return findedMember.getParticipantingDutchPay().stream()
                .map(DutchPayIntersection::getDutchPay)
                .map(DutchPayListResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<GroupBuyingListResponseDto> showFavoriteGroupBuying(){
        Member currentMember = loadCurrentMember();

        return currentMember.getLikedGroupBuyings()
                .stream()
                .map(LikedGroupBuying::getGroupBuying)
                .map(GroupBuyingListResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<SharingListResponseDto> showFavoriteSharing(){
        Member currentMember = loadCurrentMember();

        return currentMember.getLikedSharings()
                .stream()
                .map(LikedSharing::getSharing)
                .map(SharingListResponseDto::new)
                .collect(Collectors.toList());
    }

    private Member loadCurrentMember(){
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }
}
