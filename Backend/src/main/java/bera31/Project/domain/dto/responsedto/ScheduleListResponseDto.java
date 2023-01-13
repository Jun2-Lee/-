package bera31.Project.domain.dto.responsedto;

import bera31.Project.domain.dto.requestdto.ScheduleRequestDto;
import bera31.Project.domain.schedule.Schedule;
import bera31.Project.domain.schedule.ScheduleCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleListResponseDto {
    ScheduleCategory category;
    String title;

    public ScheduleListResponseDto(Schedule schedule){
        this.category = schedule.getCategory();
        this.title = schedule.getTitle();
    }
}
