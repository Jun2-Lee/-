package bera31.Project.api.controller.page;

import bera31.Project.domain.dto.responsedto.DutchPayListResponseDto;
import bera31.Project.domain.dto.responsedto.GroupBuyingListResponseDto;
import bera31.Project.domain.dto.responsedto.SharingListResponseDto;
import bera31.Project.service.page.MyPageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/mypage")
public class MyPageController {
    private final MyPageService myPageService;
    /*
    @GetMapping
    public MyPageDto showMyPage(){
        return myPageDto;
    }
    */
    @PostMapping ("/edit")
    public String editMyInfo() {
        return "OK";
    }
    @GetMapping("/myGroupBuying")
    public ResponseEntity<List<GroupBuyingListResponseDto>> showMyGroupBuying(){
        return new ResponseEntity<>(myPageService.showMyGroupBuying(), HttpStatus.OK);
    }
    @GetMapping("/myDutchPay")
    public ResponseEntity<List<DutchPayListResponseDto>> showMyDutchPay(){
        return new ResponseEntity<>(myPageService.showMyDutchPay(), HttpStatus.OK);
    }

    /* 참여는 Intersection인데 어떻게 해결할 지?
    @GetMapping("/participantingGroupBuying")
    public ResponseEntity<List<GroupBuyingListResponseDto>> showParticipantingGroupBuying(){
        return new ResponseEntity<>(myPageService., HttpStatus.OK);
    }
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
