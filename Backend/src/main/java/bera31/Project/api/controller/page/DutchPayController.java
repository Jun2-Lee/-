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

    @Operation(summary = "N빵 글 작성", description = "N빵 글 작성 시 요청하는 Api 입니다.")
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
    @Operation(summary = "N빵 글 상세 조회", description = "N빵 글 상세 페이지 조회시 요청하는 Api 입니다.")
    @GetMapping("/{dutchPayId}")
    public DutchPayResponseDto findDutchPay(@PathVariable Long dutchPayId) {
        return dutchPayService.findDutchPay(dutchPayId);
    }
    @Operation
    @PostMapping("/{postId}")
    public void participantDutchPay(@PathVariable Long postId){
        dutchPayService.participantDutchPay(postId);
    }
}
