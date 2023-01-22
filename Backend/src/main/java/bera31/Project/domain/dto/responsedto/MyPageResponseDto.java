package bera31.Project.domain.dto.responsedto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MyPageResponseDto {
    String image;
    String nickname;
    List<SimpleGroupBuyingResponseDto> simpleGroupBuyingList;
    List<SimpleFavoriteGroupBuyingResponseDto> simpleFavoriteGroupBuyingList;
    List<TodayScheduleResponseDto> todayScheduleList;
}