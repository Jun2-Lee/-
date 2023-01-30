package bera31.Project.service.page;

import bera31.Project.domain.dto.requestdto.DutchPayRequestDto;
import bera31.Project.domain.dto.responsedto.dutchpay.DutchPayListResponseDto;
import bera31.Project.domain.dto.responsedto.dutchpay.DutchPayResponseDto;
import bera31.Project.repository.page.DutchPayRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DutchPayService {
    private final DutchPayRepository dutchPayRepository;

    public List<DutchPayListResponseDto> findAllDutchPay() {
        return dutchPayRepository.findAll()
                .stream()
                .map(DutchPayListResponseDto::new)
                .collect(Collectors.toList());
    }

    public Long postDutchPay(DutchPayRequestDto dutchPayRequestDto) {
        return dutchPayRepository.save(dutchPayRequestDto.toDutchPay());
    }

    public String deleteDutchPay(Long id) {
        dutchPayRepository.delete(dutchPayRepository.findById(id));
        return "ok";
    }

    public DutchPayResponseDto findDutchPay(Long id) {
        return new DutchPayResponseDto(dutchPayRepository.findById(id));
    }
}
