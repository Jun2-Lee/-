package bera31.Project.api.controller;

import bera31.Project.domain.dto.requestdto.ScheduleRequestDto;
import bera31.Project.domain.dto.responsedto.ScheduleListResponseDto;
import bera31.Project.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @GetMapping
    public ResponseEntity<List<ScheduleListResponseDto>> showSchedule(){
        return new ResponseEntity<>(scheduleService.renderSchedule(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Long> postSchedule(@RequestBody ScheduleRequestDto scheduleRequestDto){
        return new ResponseEntity<>(scheduleService.postSchedule(scheduleRequestDto), HttpStatus.OK);
    }

    @DeleteMapping("/{memoId}")
    public ResponseEntity<String> deleteSchedule(@PathVariable Long memoId){
        return new ResponseEntity<>(scheduleService.deleteSchedule(memoId), HttpStatus.OK);
    }
}
