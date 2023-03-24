package bera31.Project.domain.dto.responsedto;

import bera31.Project.domain.dto.responsedto.groupbuying.SimpleContentsResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MyPageResponseDto {
    String image;
    String nickname;
    List<SimpleContentsResponseDto> simpleGroupBuyingList;
    List<SimpleContentsResponseDto> simpleLikedGroupBuyingList;
    List<SimpleContentsResponseDto> simpleParticipantingGroupBuyingList;
    List<SimpleContentsResponseDto> simpleSharingList;
    List<SimpleContentsResponseDto> simpleLikedSharingList;
    List<SimpleContentsResponseDto> simpleDutchPayList;
    List<SimpleContentsResponseDto> simpleParticipantingDutchPayList;
    List<TodayScheduleResponseDto> todayScheduleList;
}