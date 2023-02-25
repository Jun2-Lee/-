package bera31.Project.domain.dto.responsedto;

import bera31.Project.domain.dto.requestdto.ScheduleRequestDto;
import bera31.Project.domain.schedule.Schedule;
import bera31.Project.domain.schedule.ScheduleCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleListResponseDto {
    String title;
    String time;

    public ScheduleListResponseDto(Schedule schedule){
        this.title = schedule.getTitle();
        this.time = schedule.getTime();
    }
}
