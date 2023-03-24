package bera31.Project.domain.schedule;

import bera31.Project.domain.dto.requestdto.ScheduleRequestDto;
import bera31.Project.domain.member.Member;
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

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    private Member author;
    private LocalDate targetDate;
    private String title;
    private String time;
    private String place;
    private String content;

    public Schedule(ScheduleRequestDto scheduleRequestDto) {
        this.title = scheduleRequestDto.getTitle();
        this.targetDate = scheduleRequestDto.getTargetDate();
        this.time = scheduleRequestDto.getTime();
        this.place = scheduleRequestDto.getPlace();
        this.content = scheduleRequestDto.getContent();
    }

    public void updateSchedule(ScheduleRequestDto scheduleRequestDto) {
        this.title = scheduleRequestDto.getTitle();
        this.time = scheduleRequestDto.getTime();
        this.place = scheduleRequestDto.getPlace();
        this.content = scheduleRequestDto.getContent();
    }
}
