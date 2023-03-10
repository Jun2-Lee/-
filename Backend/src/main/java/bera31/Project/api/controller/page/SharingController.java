package bera31.Project.api.controller.page;

import bera31.Project.domain.dto.requestdto.CommentRequestDto;
import bera31.Project.domain.dto.requestdto.SharingRequestDto;
import bera31.Project.domain.dto.responsedto.sharing.SharingListResponseDto;
import bera31.Project.domain.dto.responsedto.sharing.SharingResponseDto;
import bera31.Project.service.CommentService;
import bera31.Project.service.page.SharingService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/sharing")
public class SharingController {

    private final SharingService sharingService;
    private final CommentService commentService;

    @Operation(summary = "나눔 글 전체 목록 조회 API입니다.",
            description = "전체 조회에도 각 게시글 마다 고유 id를 같이 넣어놨습니다.\n\n" +
                    "해당 값은 글 내용 조회 시, 수정 시, 삭제 시, 찜 기능에 사용됩니다.")
    @GetMapping
    public ResponseEntity<List<SharingListResponseDto>> findAllSharing() {
        return new ResponseEntity<>(sharingService.findAllSharing(), HttpStatus.OK);
    }

    @Operation(summary = "나눔 글 내용 조회 API입니다.",
            description = "글의 고유 id를 Request Parameter 형식으로 URL에 보내주시면 됩니다.\n\n" +
                    "글에는 작성자의 고유 id가 같이 넘어갑니다.\n\n" +
                    "쪽지 보내기 기능이 사용될 경우, 해당 작성자의 id로 보내면 됩니다.")
    @GetMapping("/{postId}")
    public ResponseEntity<SharingResponseDto> findSharing(@PathVariable Long postId) {
        return new ResponseEntity<>(sharingService.findSharing(postId), HttpStatus.OK);
    }

    @Operation(summary = "나눔 글 작성 API입니다.",
            description = "사진은 필수로 받습니다.\n\n" +
                    "form-data/multipart 형식으로 값을 보내주시면 됩니다.")
    @PostMapping
    public void postSharing(@RequestPart SharingRequestDto sharingRequestDto,
                            @RequestPart MultipartFile postImage) throws IOException {
        sharingService.postSharing(sharingRequestDto, postImage);
    }

    @Operation(summary = "나눔 글 내용 수정 API입니다.",
            description = "글의 고유 id를 Request Parameter 형식으로 URL에 보내주시면 됩니다.")
    @PutMapping("/{postId}")
    public void updateSharing(@PathVariable Long postId,
                              @RequestBody SharingRequestDto sharingRequestDto) {
        sharingService.updateSharing(postId, sharingRequestDto);
    }

    @Operation(summary = "나눔 글 삭제 API입니다.",
            description = "글의 고유 id를 Request Parameter 형식으로 URL에 보내주시면 됩니다.")
    @DeleteMapping("/{postId}")
    public void deleteSharing(@PathVariable Long postId) {
        sharingService.deleteSharing(postId);
    }

    @Operation(summary = "나눔 글 내용 조회 API입니다.",
            description = "글의 고유 id를 Request Parameter 형식으로 URL에 보내주시면 됩니다.")
    @PostMapping("/{postId}/like")
    public void pushLikeSharing(@PathVariable Long postId) {
        sharingService.pushLikeSharing(postId);
    }

    @Operation(summary = "거래 완료(조기 마감) API",
            description = "글 작성자가 버튼을 눌러 거래를 조기 마감시키는 API 입니다.")
    @PostMapping("/{postId}/finish")
    public ResponseEntity<String> closeSharing(@PathVariable Long postId){
        return new ResponseEntity<>(sharingService.closeSharing(postId), HttpStatus.OK);
    }

    @Operation(summary = "재료 나눔 댓글 작성 API",
            description = "글의 고유 id를 Request Parameter 형식으로 URL에 보내주시고, 댓글 내용은 Dto 형식으로 보내주시면 됩니다.")
    @PostMapping("/{postId}/comment")
    public void postComment(@RequestBody CommentRequestDto commentRequestDto, @PathVariable Long postId) {
        commentService.saveSharingComment(commentRequestDto, postId);
    }

    @Operation(summary = "재료 나눔 답글 작성 API",
            description = "글의 고유 id 뒤에 댓글 id를 붙여서 Request Parameter 형식으로 URL에 보내주시고,\n\n" +
                    " 댓글 내용은 Dto 형식으로 보내주시면 됩니다.")
    @PostMapping("/{postId}/{commentId}/childComment")
    public void postChildComment(@PathVariable Long postId, @PathVariable Long commentId,@RequestBody CommentRequestDto commentRequestDto) {
        commentService.saveChildComment(commentRequestDto, commentId);
    }
    @Operation(summary = "재료 나눔 댓글 삭제 API",
            description = "글의 고유 id 뒤에 댓글 id를 붙여서 Request Parameter 형식으로 URL에 보내주시면 됩니다.\n\n" +
                    "(답글도 동일합니다)")
    @DeleteMapping("/{postId}/{commentId}")
    public void deleteComment(@PathVariable Long postId, @PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }

}