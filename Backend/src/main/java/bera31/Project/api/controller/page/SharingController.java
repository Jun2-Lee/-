package bera31.Project.api.controller.page;

import bera31.Project.domain.dto.requestdto.CommentRequestDto;
import bera31.Project.domain.dto.requestdto.SharingRequestDto;
import bera31.Project.domain.dto.responsedto.SharingListResponseDto;
import bera31.Project.domain.dto.responsedto.SharingResponseDto;
import bera31.Project.service.CommentService;
import bera31.Project.service.page.SharingService;
import lombok.RequiredArgsConstructor;
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

    @GetMapping
    public List<SharingListResponseDto> findAllSharing() {
        return sharingService.findAllSharing();
    }

    @GetMapping("/{sharingId}")
    public SharingResponseDto findSharing(@PathVariable Long sharingId) {
        return sharingService.findSharing(sharingId);
    }

    @PostMapping
    public void postSharing(@RequestPart SharingRequestDto sharingRequestDto,
                            @RequestPart MultipartFile postImage) throws IOException {
        sharingService.postSharing(sharingRequestDto, postImage);
    }

    @PostMapping("/{sharingId}")
    public void updateSharing(@PathVariable Long sharingId, @RequestBody SharingRequestDto sharingRequestDto) {
        sharingService.updateSharing(sharingId, sharingRequestDto);
    }

    @DeleteMapping("/{sharingId}")
    public void deleteSharing(@PathVariable Long sharingId) {
        sharingService.deleteSharing(sharingId);
    }

    @GetMapping("/search")
    public String searchByKeyword(@RequestParam String keyword) {
        return "ok";
    }

    @PostMapping("/{postId}/comment")
    public void postComment(CommentRequestDto commentRequestDto, @PathVariable Long postId) {
        commentService.saveSharingComment(commentRequestDto, postId);
    }

    @PostMapping("/{postId}/{commentId}/childComment")
    public void postChildComment(@PathVariable Long postId, @PathVariable Long commentId, CommentRequestDto commentRequestDto) {
        commentService.saveChildComment(commentRequestDto, commentId);
    }

    @DeleteMapping("/{postId}/comment")
    public void deleteComment(@PathVariable Long postId) {
        commentService.deleteComment(postId);
    }

}