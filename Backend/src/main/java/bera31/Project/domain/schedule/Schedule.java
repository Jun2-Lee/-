package bera31.Project.domain.schedule;

import bera31.Project.domain.dto.requestdto.ScheduleRequestDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
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
    LocalDate postDate;
    @Enumerated(EnumType.STRING)
    ScheduleCategory category;
    String title;
    String time;
    String place;
    String content;

    public Schedule(ScheduleRequestDto scheduleRequestDto){
        this.category = scheduleRequestDto.getCategory();
        this.title = scheduleRequestDto.getTitle();
        this.postDate = scheduleRequestDto.getPostDate();
        this.time = scheduleRequestDto.getTime();
        this.place = scheduleRequestDto.getPlace();
        this.content = scheduleRequestDto.getContent();
    }

    public void updateSchedule(ScheduleRequestDto scheduleRequestDto) {
        this.title = scheduleRequestDto.getTitle();
        this.category = scheduleRequestDto.getCategory();
        this.time = scheduleRequestDto.getTime();
        this.place = scheduleRequestDto.getPlace();
        this.content = scheduleRequestDto.getContent();
    }
}
