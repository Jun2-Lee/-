package bera31.Project.api.controller.page;

import bera31.Project.domain.dto.requestdto.CommentRequestDto;
import bera31.Project.domain.dto.requestdto.DutchPayRequestDto;
import bera31.Project.domain.dto.responsedto.dutchpay.DutchPayListResponseDto;
import bera31.Project.domain.dto.responsedto.dutchpay.DutchPayResponseDto;
import bera31.Project.service.CommentService;
import bera31.Project.service.page.DutchPayService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/dutchPay")
public class DutchPayController {
    private final DutchPayService dutchPayService;

    @Operation(summary = "N빵 글 목록 조회", description = "N빵 글 목록 조회 시 요청하는 Api 입니다.")
    @GetMapping
    public List<DutchPayListResponseDto> findAll() {
        return dutchPayService.findAllDutchPay();
    }

    @Operation(summary = "N빵 글 작성", description = "N빵 글 작성 시 요청하는 Api 입니다.\n" +
            "주소와 상세주소를 각각 Address, DetailAddress로 따로 받습니다.")
    @PostMapping
    public Long postDutchPay(@RequestBody DutchPayRequestDto dutchPayRequestDto) {
        return dutchPayService.postDutchPay(dutchPayRequestDto);
    }

    @Operation(summary = "N빵 글 삭제", description = "N빵 글 삭제 요청 시 요청하는 Api 입니다.")
    @DeleteMapping("/{dutchPayId}")
    public void deleteDutchPay(@PathVariable Long dutchPayId) {
        dutchPayService.deleteDutchPay(dutchPayId);
        return;
    }

    @Operation(summary = "N빵 글 상세 조회",
            description = "N빵 글 상세 페이지 조회시 요청하는 Api 입니다.\n" +
                    "글에는 작성자의 고유 id가 같이 넘어갑니다.\n" +
                    "쪽지 보내기 기능이 사용될 경우, 해당 작성자의 id로 보내면 됩니다.")
    @GetMapping("/{dutchPayId}")
    public DutchPayResponseDto findDutchPay(@PathVariable Long dutchPayId) {
        return dutchPayService.findDutchPay(dutchPayId);
    }

    @Operation(summary = "N빵 글 참여 API입니다.",
            description = "Request Parameter 형식으로 URL에 넘겨주시면 됩니다.")
    @PostMapping("/{dutchPayId}")
    public void participantDutchPay(@PathVariable Long dutchPayId) {
        dutchPayService.participantDutchPay(dutchPayId);
    }
}
