package bera31.Project.domain.dto.responsedto.schedule;

import bera31.Project.domain.schedule.Schedule;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleListResponseDto {
    Long id;
    String title;
    LocalDate targetDate;

    public ScheduleListResponseDto(Schedule schedule) {
        this.id = schedule.getId();
        this.title = schedule.getTitle();
        this.targetDate = schedule.getTargetDate();
    }
}
