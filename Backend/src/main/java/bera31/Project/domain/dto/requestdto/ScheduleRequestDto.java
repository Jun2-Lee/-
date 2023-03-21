package bera31.Project.domain.dto.requestdto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class ScheduleRequestDto {
    LocalDate targetDate;
    String title;
    String time;
    String place;
    String content;
}
