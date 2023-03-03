package bera31.Project.api.controller.page;

import bera31.Project.domain.dto.requestdto.CommentRequestDto;
import bera31.Project.domain.dto.requestdto.GroupBuyingRequestDto;
import bera31.Project.domain.dto.responsedto.groupbuying.GroupBuyingListResponseDto;
import bera31.Project.domain.dto.responsedto.groupbuying.GroupBuyingResponseDto;
import bera31.Project.service.CommentService;
import bera31.Project.service.page.GroupBuyingService;
import io.swagger.v3.oas.annotations.Operation;
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
    private final CommentService commentService;
    @Operation(summary = "공동 구매 전체 글 조회", description = "공동구매 창 처음 접속 시 보여지는 글 목록 요청 Api 입니다")
    @GetMapping
    public ResponseEntity<List<GroupBuyingListResponseDto>> findAllGroupBuying() {
        return new ResponseEntity<>(groupBuyingService.findAllGroupBuying(), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 글 작성", description = "공동구매 글 작성 시 사진을 제외한 데이터는 " +
            "GroupBuyingRequestDto에 맞춰서 보내주시고, 사진은 파일로 보내주시면 됩니다")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> postGroupBuying(@RequestPart GroupBuyingRequestDto groupBuyingRequestDto,
                                                @RequestPart MultipartFile postImage) throws IOException {
        return new ResponseEntity<>(groupBuyingService.postGroupBuying(groupBuyingRequestDto, postImage), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 글 수정", description = "공동구매 글 작성과 마찬가지로 해주시면 됩니다")
    @PutMapping("/{postId}")
    public ResponseEntity<Long> updateGroupBuying(@RequestPart GroupBuyingRequestDto groupBuyingRequestDto,
                                                  @RequestPart MultipartFile postImage,
                                                  @PathVariable Long postId) throws IOException {
        return new ResponseEntity<>(groupBuyingService.updateGroupBuying(groupBuyingRequestDto, postImage, postId), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 글 상세 조회", description = "공동구매 글 상세 조회 api 입니다")
    @GetMapping("/{postId}")
    public ResponseEntity<GroupBuyingResponseDto> findGroupBuying(@PathVariable Long postId) {
        return new ResponseEntity<>(groupBuyingService.findGroupBuying(postId), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 신청 api", description = "공동구매 글 신청 버튼을 눌렀을 때 요청 경로입니다")
    @PostMapping("/{postId}")
    public ResponseEntity<Long> participantGroupBuying(@PathVariable Long postId) {
        return new ResponseEntity<>(groupBuyingService.participantGroupBuying(postId), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 찜 api", description = "공동구매 찜 요청을 눌렀을 때 요청 경로입니다.")
    @PostMapping("/{postId}/like")
    public ResponseEntity<Long> pushLikeGroupBuying(@PathVariable Long postId){
        return new ResponseEntity<>(groupBuyingService.pushLikeGroupBuying(postId), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 글 찾기", description = "공동구매 글 검색 시 요청 경로입니다")
    @GetMapping("/search")
    public ResponseEntity<List<GroupBuyingListResponseDto>> searchGroupBuying(@RequestParam String keyword) {
        return new ResponseEntity<>(groupBuyingService.searchGroupBuying(keyword), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 글 삭제", description = "공동구매 글 삭제시 요청 경로입니다")
    @DeleteMapping("/{postId}") // 단순 글 삭제
    public void deleteGroupBuying(@PathVariable Long postId) {
        groupBuyingService.deleteGroupBuying(postId);
    }

    @PostMapping("/{postId}/comment")
    public void postComment(@RequestBody CommentRequestDto commentRequestDto, @PathVariable Long postId){
        commentService.saveGroupBuyingComment(commentRequestDto, postId);
    }

    @PostMapping("/{postId}/{commentId}/childComment")
    public void postChildComment(@RequestBody CommentRequestDto commentRequestDto, @PathVariable Long postId,
                                 @PathVariable Long commentId){
        commentService.saveChildComment(commentRequestDto, commentId);
    }

    @DeleteMapping("/{postId}/comment")
    public void deleteComment(@PathVariable Long postId){
        commentService.deleteComment(postId);
    }

    @DeleteMapping("/{postId}/childComment")
    public void deleteChildComment(@PathVariable Long postId){
        commentService.deleteChildComment(postId);
    }

}
