package bera31.Project.api.controller;

import bera31.Project.domain.dto.requestdto.ScheduleRequestDto;
import bera31.Project.domain.dto.responsedto.schedule.ScheduleListResponseDto;
import bera31.Project.domain.dto.responsedto.schedule.ScheduleResponseDto;
import bera31.Project.service.ScheduleService;
import io.swagger.v3.oas.annotations.Operation;
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

    @Operation(summary = "달력 전체에 뿌릴 Data를 요청하는 API입니다.",
            description = "현재 달의 일정만 모두 가져옵니다." +
                    "targetDate를 기준으로 각 날짜에 배치하시면 됩니다.")
    @GetMapping
    public ResponseEntity<List<ScheduleListResponseDto>> showSchedule() {
        return new ResponseEntity<>(scheduleService.renderSchedule(), HttpStatus.OK);
    }

    @Operation(summary = "일정을 등록하는 API입니다.",
            description = "targetDate가 해당 일정을 수행해야하는 날짜입니다.")
    @PostMapping
    public ResponseEntity<Long> postSchedule(@RequestBody ScheduleRequestDto scheduleRequestDto) {
        return new ResponseEntity<>(scheduleService.postSchedule(scheduleRequestDto), HttpStatus.OK);
    }

    @Operation(summary = "각 날짜 별 일정을 요청하는 API입니다.",
            description = "달력 전체에 뿌리는 Data에서 넘겨드렸던 일정별 ID를 url에 넘겨주셔야 합니다.")
    @GetMapping("/{scheduleId}")
    public ResponseEntity<ScheduleResponseDto> showScheduleDetail(@PathVariable Long scheduleId) {
        return new ResponseEntity<>(scheduleService.renderScheduleDetail(scheduleId), HttpStatus.OK);
    }

    @Operation(summary = "각 날짜 별 일정을 수정하는 API입니다.",
            description = "달력 전체에 뿌리는 Data에서 넘겨드렸던 일정별 ID를 url에 넘겨주셔야 합니다.")
    @PutMapping("/{scheduleId}")
    public ResponseEntity<String> updateSchedule(@RequestBody ScheduleRequestDto scheduleRequestDto,
                                                 @PathVariable Long scheduleId) {
        return new ResponseEntity<>(scheduleService.updateSchedule(scheduleRequestDto, scheduleId), HttpStatus.OK);
    }

    @Operation(summary = "각 날짜 별 일정을 삭제하는 API입니다.",
            description = "달력 전체에 뿌리는 Data에서 넘겨드렸던 일정별 ID를 url에 넘겨주셔야 합니다.")
    @DeleteMapping("/{scheduleId}")
    public ResponseEntity<String> deleteSchedule(@PathVariable Long scheduleId) {
        return new ResponseEntity<>(scheduleService.deleteSchedule(scheduleId), HttpStatus.OK);
    }
}
