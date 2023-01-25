package bera31.Project.api.controller.page;

import bera31.Project.domain.dto.requestdto.EditInfoRequestDto;
import bera31.Project.domain.dto.responsedto.DutchPayListResponseDto;
import bera31.Project.domain.dto.responsedto.GroupBuyingListResponseDto;
import bera31.Project.domain.dto.responsedto.MyPageResponseDto;
import bera31.Project.domain.dto.responsedto.SharingListResponseDto;
import bera31.Project.service.page.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MyPageController {
    private final MyPageService myPageService;

    @GetMapping
    public ResponseEntity<MyPageResponseDto> showMyPage(){
        return new ResponseEntity<>(myPageService.showMyPage(), HttpStatus.OK);
    }

    @GetMapping("/myGroupBuying")
    public ResponseEntity<List<GroupBuyingListResponseDto>> showMyGroupBuying(){
        return new ResponseEntity<>(myPageService.showMyGroupBuying(), HttpStatus.OK);
    }

    @GetMapping("/myDutchPay")
    public ResponseEntity<List<DutchPayListResponseDto>> showMyDutchPay(){
        return new ResponseEntity<>(myPageService.showMyDutchPay(), HttpStatus.OK);
    }

    @GetMapping("/participantingGroupBuying")
    public ResponseEntity<List<GroupBuyingListResponseDto>> showParticipantingGroupBuying(){
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

    @GetMapping("/favoriteGroupBuying")
    public ResponseEntity<List<GroupBuyingListResponseDto>> showFavoriteGroupBuying(){
        return new ResponseEntity<>(myPageService.showFavoriteGroupBuying(), HttpStatus.OK);
    }
    @GetMapping("/favoriteSharing")
    public ResponseEntity<List<SharingListResponseDto>> showFavoriteSharing(){
        return new ResponseEntity<>(myPageService.showFavoriteSharing(), HttpStatus.OK);
    }
}
