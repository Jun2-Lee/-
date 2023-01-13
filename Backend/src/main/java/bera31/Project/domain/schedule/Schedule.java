package bera31.Project.domain.schedule;

import bera31.Project.domain.dto.requestdto.ScheduleRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue
    long id;
    @Enumerated(EnumType.STRING)
    ScheduleCategory category;
    String title;
    LocalDateTime time;
    String place;
    String content;

    public Schedule(ScheduleRequestDto scheduleRequestDto){
        this.category = scheduleRequestDto.getCategory();
        this.title = scheduleRequestDto.getTitle();
        this.time = scheduleRequestDto.getTime();
        this.place = scheduleRequestDto.getPlace();
        this.content = scheduleRequestDto.getContent();
    }
    public void updateSchedule(ScheduleRequestDto memo) {
        this.title = memo.getTitle();
        this.category = memo.getCategory();
        this.time = memo.getTime();
        this.place = memo.getPlace();
        this.content = memo.getContent();

    }
}
