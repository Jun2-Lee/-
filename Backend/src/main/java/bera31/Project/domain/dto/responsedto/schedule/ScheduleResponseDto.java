package bera31.Project.domain.dto.responsedto.schedule;

import bera31.Project.domain.schedule.Schedule;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ScheduleResponseDto {
    String title;
    String time;
    String place;
    String content;

    public ScheduleResponseDto(Schedule schedule) {
        this.title = schedule.getTitle();
        this.time = schedule.getTime();
        this.place = schedule.getPlace();
        this.content = schedule.getContent();
    }
}
