package bera31.Project.service;

import bera31.Project.domain.dto.requestdto.ScheduleRequestDto;
import bera31.Project.domain.dto.responsedto.schedule.ScheduleListResponseDto;
import bera31.Project.domain.dto.responsedto.schedule.ScheduleResponseDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.schedule.Schedule;
import bera31.Project.repository.MemberRepository;
import bera31.Project.repository.ScheduleRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final MemberRepository memberRepository;

    @Transactional
    public Long postSchedule(ScheduleRequestDto scheduleRequestDto) {
        //Member currentMember = loadCurrentMember();
        Member currentMember = memberRepository.findById(1);

        Schedule newMemo = new Schedule(scheduleRequestDto);
        currentMember.addMemo(newMemo);
        return scheduleRepository.save(newMemo);
    }

    @Transactional(readOnly = true)
    public List<ScheduleListResponseDto> renderSchedule(){
        //Member currentMember = loadCurrentMember();
        Member currentMember = memberRepository.findById(1);
        List<Schedule> memoList = currentMember.getMemoList();

        return memoList.stream()
                //.filter(m -> m.getTargetDate().getMonth().equals(LocalDate.now().getMonth()))
                .map(ScheduleListResponseDto::new)
                .collect(Collectors.toList());
    }

    public ScheduleResponseDto renderScheduleDetail(Long scheduleId){
        return new ScheduleResponseDto(scheduleRepository.findById(scheduleId));
    }

    @Transactional
    public String updateSchedule(ScheduleRequestDto scheduleRequestDto, Long postId) {
        Schedule findMemo = scheduleRepository.findById(postId);
        findMemo.updateSchedule(scheduleRequestDto);
        return "수정 되었습니다.";
    }

    @Transactional
    public String deleteSchedule(Long scheduleId) {
        scheduleRepository.delete(scheduleRepository.findById(scheduleId));
        return "정상 삭제되었습니다!";
    }

    private Member loadCurrentMember(){
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }
}
