package bera31.Project.service.page;

import bera31.Project.domain.dto.requestdto.DutchPayRequestDto;
import bera31.Project.domain.dto.responsedto.dutchpay.DutchPayListResponseDto;
import bera31.Project.domain.dto.responsedto.dutchpay.DutchPayResponseDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.dutchpay.DutchPay;
import bera31.Project.domain.page.intersection.DutchPayIntersection;
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

    public List<DutchPayListResponseDto> findAllDutchPay() {
        return dutchPayRepository.findAll()
                .stream()
                .map(DutchPayListResponseDto::new)
                .collect(Collectors.toList());
    }

    public Long postDutchPay(DutchPayRequestDto dutchPayRequestDto) {
        Member currentMember = loadCurrentMember();
        DutchPay dutchPay = new DutchPay(dutchPayRequestDto, currentMember);

        currentMember.postDutchPay(dutchPay);

        return dutchPayRepository.save(dutchPay);
    }

    public void participantDutchPay(Long id) {
        Member currentMember = loadCurrentMember();
        DutchPay curruntDutchPay = dutchPayRepository.findById(id);

        DutchPayIntersection dutchPayIntersection = new DutchPayIntersection(currentMember, curruntDutchPay);

        currentMember.participantDutchPay(dutchPayIntersection);
        curruntDutchPay.addParticipantMember(dutchPayIntersection);

        intersectionRepository.save(dutchPayIntersection);
    }

    public void deleteDutchPay(Long id) {
        dutchPayRepository.delete(dutchPayRepository.findById(id));
    }

    public DutchPayResponseDto findDutchPay(Long id) {
        return new DutchPayResponseDto(dutchPayRepository.findById(id));
    }

    public Member loadCurrentMember() {
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }
}
