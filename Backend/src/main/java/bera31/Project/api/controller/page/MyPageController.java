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

    @Operation(summary = "마이페이지 전체 조회 API입니다.",
            description = "아래의 항목들이 한번에 응답에 담겨 보내집니다.\n" +
                    "1. 내가 쓴 공동구매\n" +
                    "2. 내가 쓴 나눔\n" +
                    "3. 내가 쓴 N빵\n" +
                    "\n" +
                    "4. 참여 중인 공동구매\n" +
                    "5. 참여 중인 N빵\n" +
                    "\n" +
                    "6. 찜한 공동 구매\n" +
                    "7. 찜한 나눔\n" +
                    "\n" +
                    "8. 쪽지 목록(미완성)\n" +
                    "9. 오늘의 일정 목록\n" +
                    "각 용도에 맞게 렌더링 해주시면 될 것 같습니다.")
    @GetMapping
    public ResponseEntity<MyPageResponseDto> showMyPage(){
        return new ResponseEntity<>(myPageService.showMyPage(), HttpStatus.OK);
    }

    @Operation(summary = "내가 쓴 공동 구매 API입니다.")
    @GetMapping("/myGroupBuying")
    public ResponseEntity<List<GroupBuyingListResponseDto>> showMyGroupBuying(){
        return new ResponseEntity<>(myPageService.showMyGroupBuying(), HttpStatus.OK);
    }

    @Operation(summary = "내가 쓴 N빵 API입니다.")
    @GetMapping("/myDutchPay")
    public ResponseEntity<List<DutchPayListResponseDto>> showMyDutchPay(){
        return new ResponseEntity<>(myPageService.showMyDutchPay(), HttpStatus.OK);
    }

    @Operation(summary = "내가 참여 중인 공동 구매 API입니다.")
    @GetMapping("/participantingGroupBuying")
    public ResponseEntity<List<GroupBuyingListResponseDto>> showParticipantingGroupBuying(){
        return new ResponseEntity<>(myPageService.showParticipantingGroupBuying(), HttpStatus.OK);
    }
    @Operation(summary = "내가 참여 중인 N빵 API입니다.")
    @GetMapping("/participantingDutchPay")
    public ResponseEntity<List<DutchPayListResponseDto>> showParticipantingDutchPay(){
        return new ResponseEntity<>(myPageService.showParticipantingDutchPay(), HttpStatus.OK);
    }

    @Operation(summary = "내가 찜한 공동 구매 API입니다.")
    @GetMapping("/favoriteGroupBuying")
    public ResponseEntity<List<GroupBuyingListResponseDto>> showFavoriteGroupBuying(){
        return new ResponseEntity<>(myPageService.showFavoriteGroupBuying(), HttpStatus.OK);
    }

    @Operation(summary = "내가 찜한 나눔 API입니다.")
    @GetMapping("/favoriteSharing")
    public ResponseEntity<List<SharingListResponseDto>> showFavoriteSharing(){
        return new ResponseEntity<>(myPageService.showFavoriteSharing(), HttpStatus.OK);
    }
}
