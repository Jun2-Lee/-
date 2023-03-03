package bera31.Project.domain.dto.responsedto;

import bera31.Project.domain.dto.responsedto.groupbuying.SimpleGroupBuyingResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MyPageResponseDto {
    String image;
    String nickname;
    List<SimpleGroupBuyingResponseDto> simpleGroupBuyingList;
    List<SimpleGroupBuyingResponseDto> simpleLikedGroupBuyingList;
    List<TodayScheduleResponseDto> todayScheduleList;
}