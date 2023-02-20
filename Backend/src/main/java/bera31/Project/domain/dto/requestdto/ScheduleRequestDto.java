package bera31.Project.domain.dto.requestdto;

import bera31.Project.domain.schedule.ScheduleCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ScheduleRequestDto {
    ScheduleCategory category;
    String title;
    LocalDateTime time;
    String place;
    String content;
}
