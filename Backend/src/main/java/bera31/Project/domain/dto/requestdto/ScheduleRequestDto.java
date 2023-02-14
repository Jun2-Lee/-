package bera31.Project.domain.dto.requestdto;

import bera31.Project.domain.schedule.ScheduleCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ScheduleRequestDto {
    LocalDate postDate;
    ScheduleCategory category;
    String title;
    String time;
    String place;
    String content;
}
