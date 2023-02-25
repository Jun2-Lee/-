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
        Member currentMember = loadCurrentMember();

        Schedule newMemo = new Schedule(scheduleRequestDto);
        currentMember.addMemo(newMemo);
        return scheduleRepository.save(newMemo);
    }

    @Transactional
    public List<ScheduleListResponseDto> renderSchedule(){
        Member currentMember = loadCurrentMember();
        List<Schedule> memoList = currentMember.getMemoList();

        return memoList.stream()
                .map(ScheduleListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateSchedule(ScheduleRequestDto scheduleRequestDto, Long postId) {
        Schedule findMemo = scheduleRepository.findById(postId);
        findMemo.updateSchedule(scheduleRequestDto);
    }

    @Transactional
    public String deleteSchedule(Long postId) {
        scheduleRepository.delete(scheduleRepository.findById(postId));
        return "정상 삭제되었습니다!";
    }

    private Member loadCurrentMember(){
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }
}
