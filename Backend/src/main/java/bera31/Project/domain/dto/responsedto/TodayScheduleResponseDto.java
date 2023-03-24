package bera31.Project.domain.dto.responsedto;

import bera31.Project.domain.schedule.Schedule;
import lombok.Getter;

@Getter
public class TodayScheduleResponseDto {
    String title;

    public TodayScheduleResponseDto(Schedule schedule) {
        this.title = schedule.getTitle();
    }
}
