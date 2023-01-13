package bera31.Project.service;

import bera31.Project.domain.dto.requestdto.ScheduleRequestDto;
import bera31.Project.domain.dto.responsedto.ScheduleListResponseDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.schedule.Schedule;
import bera31.Project.repository.MemberRepository;
import bera31.Project.repository.ScheduleRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

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
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        Member findedMember = memberRepository.findByEmail(currentMemberEmail).get();

        Schedule newMemo = new Schedule(scheduleRequestDto);
        findedMember.addMemo(newMemo);
        return scheduleRepository.save(newMemo);
    }

    @Transactional
    public List<ScheduleListResponseDto> renderSchedule(){
        return scheduleRepository.findAllSchedule()
                .stream()
                .map(ScheduleListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateSchedule(ScheduleRequestDto scheduleRequestDto, Long postId) {
        Schedule findMemo = scheduleRepository.findById(postId);
        findMemo.updateSchedule(scheduleRequestDto);
    }

    @Transactional
    public void deleteSchedule(Long postId) {
        scheduleRepository.delete(scheduleRepository.findById(postId));
    }
}
