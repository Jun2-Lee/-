package bera31.Project.service.page;

import bera31.Project.domain.dto.responsedto.DutchPayListResponseDto;
import bera31.Project.domain.dto.responsedto.GroupBuyingListResponseDto;
import bera31.Project.domain.dto.responsedto.MyPageResponseDto;
import bera31.Project.domain.dto.responsedto.SharingListResponseDto;
import bera31.Project.domain.member.Member;
import bera31.Project.repository.MemberRepository;
import bera31.Project.repository.ScheduleRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MyPageService {
    private final MemberRepository memberRepository;

    public MyPageResponseDto showMyPage(){
        Member findedMember = loadCurrentMember();

        MyPageResponseDto myPageResponseDto = new MyPageResponseDto(
                findedMember.getProfileImage(), findedMember.getNickname()
        );

        return myPageResponseDto;
    }
    public List<GroupBuyingListResponseDto> showMyGroupBuying(){
        Member findedMember = loadCurrentMember();

        return findedMember.getBuyingList().stream()
                .map(GroupBuyingListResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<DutchPayListResponseDto> showMyDutchPay(){
        Member findedMember = loadCurrentMember();

        return findedMember.getDutchPayList().stream()
                .map(DutchPayListResponseDto::new)
                .collect(Collectors.toList());
    }

    /*
    public List<GroupBuyingListResponseDto> showParticipantingGroupBuying(){
        Member findedMember = loadCurrentMember();

        return findedMember.getParticipantingGroupBuying().stream()
                .map(GroupBuyingListResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<DutchPayListResponseDto> showParticipantingDutchPay(){
        Member findedMember = loadCurrentMember();

        return findedMember.getParticipantingGroupBuying().stream()
                .map(DutchPayListResponseDto::new)
                .collect(Collectors.toList());
    }
    */

    public List<GroupBuyingListResponseDto> showFavoriteGroupBuying(){
        Member findedMember = loadCurrentMember();

        return findedMember.getFavoriteBuying().stream()
                .map(GroupBuyingListResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<SharingListResponseDto> showFavoriteSharing(){
        Member findedMember = loadCurrentMember();

        return findedMember.getFavoriteSharing().stream()
                .map(SharingListResponseDto::new)
                .collect(Collectors.toList());
    }

    private Member loadCurrentMember(){
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }
}
