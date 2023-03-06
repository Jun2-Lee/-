package bera31.Project.service.page;

import bera31.Project.domain.dto.requestdto.DutchPayRequestDto;
import bera31.Project.domain.dto.responsedto.dutchpay.DutchPayListResponseDto;
import bera31.Project.domain.dto.responsedto.dutchpay.DutchPayResponseDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.dutchpay.DutchPay;
import bera31.Project.domain.page.intersection.DutchPayIntersection;
import bera31.Project.exception.ErrorResponse;
import bera31.Project.exception.exceptions.AlreadyFullException;
import bera31.Project.repository.MemberRepository;
import bera31.Project.repository.page.DutchPayRepository;
import bera31.Project.repository.page.IntersectionRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.security.Security;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DutchPayService {
    private final MemberRepository memberRepository;
    private final DutchPayRepository dutchPayRepository;
    private final IntersectionRepository intersectionRepository;

    @Transactional(readOnly = true)
    public List<DutchPayListResponseDto> findAllDutchPay() {
        return dutchPayRepository.findAll()
                .stream()
                .map(DutchPayListResponseDto::new)
                .collect(Collectors.toList());
    }
    @Transactional(readOnly = true)
    public DutchPayResponseDto findDutchPay(Long id) {
        return new DutchPayResponseDto(dutchPayRepository.findById(id));
    }

    public Long postDutchPay(DutchPayRequestDto dutchPayRequestDto) {
        Member currentMember = loadCurrentMember();
        //Member currentMember = memberRepository.findById(1);
        DutchPay dutchPay = new DutchPay(dutchPayRequestDto, currentMember);

        currentMember.postDutchPay(dutchPay);

        return dutchPayRepository.save(dutchPay);
    }

    public void participantDutchPay(Long id) {
        //Member currentMember = loadCurrentMember();
        Member currentMember = memberRepository.findById(1);
        DutchPay currentPost = dutchPayRepository.findById(id);

        if(currentPost.getLimitMember() <= currentPost.getMemberList().size())
            throw new AlreadyFullException(ErrorResponse.ALREADY_FULL);

        DutchPayIntersection dutchPayIntersection = new DutchPayIntersection(currentMember, currentPost);
        currentMember.participantDutchPay(dutchPayIntersection);
        currentPost.addParticipantMember(dutchPayIntersection);

        intersectionRepository.save(dutchPayIntersection);
    }

    public void deleteDutchPay(Long id) {
        dutchPayRepository.delete(dutchPayRepository.findById(id));
    }

    public Member loadCurrentMember() {
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }
}
