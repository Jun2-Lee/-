package bera31.Project.api.controller.page;

import bera31.Project.domain.dto.requestdto.GroupBuyingRequestDto;
import bera31.Project.domain.dto.responsedto.groupbuying.GroupBuyingListResponseDto;
import bera31.Project.domain.dto.responsedto.groupbuying.GroupBuyingResponseDto;
import bera31.Project.service.page.GroupBuyingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/groupBuying")
public class GroupBuyingController {
    private final GroupBuyingService groupBuyingService;

    @GetMapping
    public ResponseEntity<List<GroupBuyingListResponseDto>> findAllGroupBuying() {
        return new ResponseEntity<>(groupBuyingService.findAllGroupBuying(), HttpStatus.OK);
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> postGroupBuying(@RequestPart GroupBuyingRequestDto groupBuyingRequestDto,
                                @RequestPart MultipartFile postImage) throws IOException {
        return new ResponseEntity<>(groupBuyingService.postGroupBuying(groupBuyingRequestDto, postImage), HttpStatus.OK);
    }

    @PutMapping("/{postId}")
    public ResponseEntity<Long> updateGroupBuying(@RequestPart GroupBuyingRequestDto groupBuyingRequestDto,
                                                  @RequestPart MultipartFile postImage,
                                                  @PathVariable Long postId) throws IOException {
        return new ResponseEntity<>(groupBuyingService.updateGroupBuying(groupBuyingRequestDto, postImage, postId), HttpStatus.OK);
    }

    @GetMapping("/{postId}")
    public ResponseEntity<GroupBuyingResponseDto> findGroupBuying(@PathVariable Long postId) {
        return new ResponseEntity<>(groupBuyingService.findGroupBuying(postId), HttpStatus.OK);
    }

    @PostMapping("/{postId}")
    public ResponseEntity<Long> participantGroupBuying(@PathVariable Long postId){
        return new ResponseEntity<>(groupBuyingService.participantGroupBuying(postId), HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<List<GroupBuyingListResponseDto>> searchGroupBuying(@RequestParam String keyword) {
        return new ResponseEntity<>(groupBuyingService.searchGroupBuying(keyword), HttpStatus.OK);
    }

    @PostMapping("/{postId}/heart") // 개발 예정
    public void addFavoriteGroupBuying(@PathVariable Long postId){
        groupBuyingService.updateFavoriteGroupBuying(postId);
    }

    @DeleteMapping("/{postId}") // 단순 글 삭제
    public void deleteGroupBuying(@PathVariable Long postId){
        groupBuyingService.deleteGroupBuying(postId);
    }
}
