package bera31.Project.api.controller.page;

import bera31.Project.domain.dto.responsedto.dutchpay.DutchPayListResponseDto;
import bera31.Project.domain.dto.responsedto.groupbuying.GroupBuyingListResponseDto;
import bera31.Project.domain.dto.responsedto.MyPageResponseDto;
import bera31.Project.domain.dto.responsedto.SharingListResponseDto;
import bera31.Project.service.page.MyPageService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MyPageController {
    private final MyPageService myPageService;

    @Operation(summary = "마이페이지 전체를 띄우는 경로입니다. (미완)")
    @GetMapping
    public ResponseEntity<MyPageResponseDto> showMyPage() {
        return new ResponseEntity<>(myPageService.showMyPage(), HttpStatus.OK);
    }

    @Operation(summary = "내가 쓴 공동 구매 글을 출력하는 경로입니다.")
    @GetMapping("/myGroupBuying")
    public ResponseEntity<List<GroupBuyingListResponseDto>> showMyGroupBuying() {
        return new ResponseEntity<>(myPageService.showMyGroupBuying(), HttpStatus.OK);
    }

    @Operation(summary = "내가 쓴 N빵 글을 출력하는 경로입니다.")
    @GetMapping("/myDutchPay")
    public ResponseEntity<List<DutchPayListResponseDto>> showMyDutchPay() {
        return new ResponseEntity<>(myPageService.showMyDutchPay(), HttpStatus.OK);
    }

    @Operation(summary = "내가 참여 중인 공동 구매 글을 출력하는 경로입니다.")
    @GetMapping("/participantingGroupBuying")
    public ResponseEntity<List<GroupBuyingListResponseDto>> showParticipantingGroupBuying() {
        return new ResponseEntity<>(myPageService.showParticipantingGroupBuying(), HttpStatus.OK);
    }

    /*
    @GetMapping("/participantingDutchPay")
    public ResponseEntity<List<DutchPayListResponseDto>> showParticipantingDutchPay(){
        return new ResponseEntity<>(myPageService.showMyDutchPay(), HttpStatus.OK);
    }
    @GetMapping("/participantingSharing")
    public ResponseEntity<List<SharingListResponseDto>> showParticipantigSharing(){
        return new ResponseEntity<>(myPageService, HttpStatus.OK);
    }
    */

    @Operation(summary = "내가 찜한 공동 구매 글을 출력하는 경로입니다.")
    @GetMapping("/favoriteGroupBuying")
    public ResponseEntity<List<GroupBuyingListResponseDto>> showFavoriteGroupBuying() {
        return new ResponseEntity<>(myPageService.showFavoriteGroupBuying(), HttpStatus.OK);
    }

    @Operation(summary = "내가 찜한 나눔 글을 출력하는 경로입니다.")
    @GetMapping("/favoriteSharing")
    public ResponseEntity<List<SharingListResponseDto>> showFavoriteSharing() {
        return new ResponseEntity<>(myPageService.showFavoriteSharing(), HttpStatus.OK);
    }
}
