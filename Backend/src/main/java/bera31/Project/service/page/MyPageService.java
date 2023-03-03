package bera31.Project.service.page;

import bera31.Project.domain.dto.responsedto.*;
import bera31.Project.domain.dto.responsedto.dutchpay.DutchPayListResponseDto;
import bera31.Project.domain.dto.responsedto.groupbuying.GroupBuyingListResponseDto;
import bera31.Project.domain.dto.responsedto.groupbuying.SimpleGroupBuyingResponseDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.intersection.GroupBuyingIntersection;
import bera31.Project.domain.page.intersection.LikedGroupBuying;
import bera31.Project.repository.MemberRepository;
import bera31.Project.repository.page.IntersectionRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
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
        List<SimpleGroupBuyingResponseDto> simpleGroupBuyinglist
                = findedMember.getBuyingList().stream()
                    .limit(4)
                    .map(SimpleGroupBuyingResponseDto::new)
                    .collect(Collectors.toList());

        List<SimpleGroupBuyingResponseDto> simpleLikedGroupBuyinglist
                = findedMember.getLikedGroupBuying()
                .stream()
                .limit(4)
                .map(LikedGroupBuying::getGroupBuying)
                .map(SimpleGroupBuyingResponseDto::new)
                .collect(Collectors.toList());

        List<TodayScheduleResponseDto> todaySchedules
                = findedMember.getMemoList().stream()
                .filter(s -> s.getTargetDate().equals(LocalDate.now()))
                .map(TodayScheduleResponseDto::new)
                .collect(Collectors.toList());

        return new MyPageResponseDto(
                findedMember.getProfileImage(), findedMember.getNickname(),
                simpleGroupBuyinglist, simpleLikedGroupBuyinglist, todaySchedules);
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

    /*
    public List<DutchPayListResponseDto> showParticipantingDutchPay(){
        Member findedMember = loadCurrentMember();

        return findedMember.getParticipantingGroupBuying().stream()
                .map(DutchPayListResponseDto::new)
                .collect(Collectors.toList());
    }
    */

    public List<GroupBuyingListResponseDto> showFavoriteGroupBuying(){
        Member currentMember = loadCurrentMember();

        return currentMember.getLikedGroupBuying()
                .stream()
                .map(LikedGroupBuying::getGroupBuying)
                .map(GroupBuyingListResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<SharingListResponseDto> showFavoriteSharing(){
        Member currentMember = loadCurrentMember();

        return currentMember.getLikedSharing().stream()
                .map(SharingListResponseDto::new)
                .collect(Collectors.toList());
    }

    private Member loadCurrentMember(){
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }
}
