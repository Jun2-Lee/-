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

    @Operation(summary = "공동 구매 전체 글 조회 API입니다.",
            description = "공동구매 창 처음 접속 시 보여지는 글 목록 요청 Api 입니다. \n" +
                    "전체 조회에도 각 게시글 마다 고유 id를 같이 보내놨습니다.\n" +
                    "해당 값은 글 내용 조회 시, 수정 시, 삭제 시, 참여 기능, 찜 기능에 사용됩니다.")
    @GetMapping
    public ResponseEntity<List<GroupBuyingListResponseDto>> findAllGroupBuying() {
        return new ResponseEntity<>(groupBuyingService.findAllGroupBuying(), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 글 작성 API입니다.",
            description = "사진은 필수 값입니다.\n" +
                    "form-data/multipart 형식으로 보내주시면 됩니다.")
    @PostMapping
    public ResponseEntity<Long> postGroupBuying(@RequestPart GroupBuyingRequestDto groupBuyingRequestDto,
                                                @RequestPart MultipartFile postImage) throws IOException {
        return new ResponseEntity<>(groupBuyingService.postGroupBuying(groupBuyingRequestDto, postImage), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 글 수정 API 입니다.",
            description = "글의 고유 id를 Request Parameter 형식으로 URL에 보내주시면 됩니다.")
    @PutMapping("/{postId}")
    public ResponseEntity<Long> updateGroupBuying(@RequestPart GroupBuyingRequestDto groupBuyingRequestDto,
                                                  @RequestPart MultipartFile postImage,
                                                  @PathVariable Long postId) throws IOException {
        return new ResponseEntity<>(groupBuyingService.updateGroupBuying(groupBuyingRequestDto, postImage, postId), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 글 상세 조회 API 입니다.",
            description = "글의 고유 id를 Request Parameter 형식으로 URL에 보내주시면 됩니다.\n" +
                    "글에는 작성자의 고유 id가 같이 넘어갑니다.\n" +
                    "쪽지 보내기 기능이 사용될 경우, 해당 작성자의 id로 보내면 됩니다.")
    @GetMapping("/{postId}")
    public ResponseEntity<GroupBuyingResponseDto> findGroupBuying(@PathVariable Long postId) {
        return new ResponseEntity<>(groupBuyingService.findGroupBuying(postId), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 신청 api",
            description = "글의 고유 id를 Request Parameter 형식으로 URL에 보내주시면 됩니다.")
    @PostMapping("/{postId}")
    public ResponseEntity<Long> participantGroupBuying(@PathVariable Long postId) {
        return new ResponseEntity<>(groupBuyingService.participantGroupBuying(postId), HttpStatus.OK);
    }

    @Operation(summary = "거래 완료(조기 마감) API",
            description = "글 작성자가 버튼을 눌러 거래를 조기 마감시키는 API입니다.")
    @PostMapping("/{postId}/finish")
    public ResponseEntity<String> closeGroupBuying(@PathVariable Long postId) {
        return new ResponseEntity<>(groupBuyingService.closeGroupBuying(postId), HttpStatus.OK);
    }

    @Operation(summary = "공동구매 찜 api",
            description = "글의 고유 id를 Request Parameter 형식으로 URL에 보내주시면 됩니다.")
    @PostMapping("/{postId}/like")
    public ResponseEntity<Long> pushLikeGroupBuying(@PathVariable Long postId) {
        return new ResponseEntity<>(groupBuyingService.pushLikeGroupBuying(postId), HttpStatus.OK);
    }

/*    @Operation(summary = "공동구매 글 찾기", description = "공동구매 글 검색 시 요청 경로입니다")
    @GetMapping("/search")
    public ResponseEntity<List<GroupBuyingListResponseDto>> searchGroupBuying(@RequestParam String keyword) {
        return new ResponseEntity<>(groupBuyingService.searchGroupBuying(keyword), HttpStatus.OK);
    }*/

    @Operation(summary = "공동구매 글 삭제",
            description = "글의 고유 id를 Request Parameter 형식으로 URL에 보내주시면 됩니다.")
    @DeleteMapping("/{postId}") // 단순 글 삭제
    public void deleteGroupBuying(@PathVariable Long postId) {
        groupBuyingService.deleteGroupBuying(postId);
    }

    @Operation(summary = "공동 구매 댓글 작성 API",
            description = "글의 고유 id를 Request Parameter 형식으로 URL에 보내주시고,\n" +
                    " 댓글 내용은 Dto 형식으로 보내주시면 됩니다.")
    @PostMapping("/{postId}/comment")
    public void postComment(@RequestBody CommentRequestDto commentRequestDto, @PathVariable Long postId) {
        commentService.saveGroupBuyingComment(commentRequestDto, postId);
    }

    @Operation(summary = "공동 구매 답글 작성 API",
            description = "글의 고유 id 뒤에 댓글 id를 붙여서 Request Parameter 형식으로 URL에 보내주시고,\n" +
                    " 댓글 내용은 Dto 형식으로 보내주시면 됩니다.")
    @PostMapping("/{postId}/{commentId}/childComment")
    public void postChildComment(@PathVariable Long postId, @PathVariable Long commentId, @RequestBody CommentRequestDto commentRequestDto) {
        commentService.saveChildComment(commentRequestDto, commentId);
    }

    @Operation(summary = "재료 나눔 답글 작성 API",
            description = "글의 고유 id 뒤에 댓글 id를 붙여서 Request Parameter 형식으로 URL에 보내주시고,\n" +
                    " 댓글 내용은 Dto 형식으로 보내주시면 됩니다.")
    @DeleteMapping("/{postId}/{commentId}")
    public void deleteComment(@PathVariable Long postId, @PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }

}
