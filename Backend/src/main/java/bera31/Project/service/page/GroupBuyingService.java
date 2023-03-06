package bera31.Project.service.page;


import bera31.Project.config.S3.S3Uploader;
import bera31.Project.domain.comment.Comment;
import bera31.Project.domain.dto.requestdto.GroupBuyingRequestDto;
import bera31.Project.domain.dto.responsedto.CommentResponseDto;
import bera31.Project.domain.dto.responsedto.groupbuying.GroupBuyingListResponseDto;
import bera31.Project.domain.dto.responsedto.groupbuying.GroupBuyingResponseDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import bera31.Project.domain.page.intersection.GroupBuyingIntersection;
import bera31.Project.domain.page.intersection.LikedGroupBuying;
import bera31.Project.exception.ErrorResponse;
import bera31.Project.exception.exceptions.AlreadyFullException;
import bera31.Project.repository.LikeRepository;
import bera31.Project.repository.MemberRepository;
import bera31.Project.repository.page.GroupBuyingRepository;
import bera31.Project.repository.page.IntersectionRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class GroupBuyingService {
    private final S3Uploader s3Uploader;
    private final GroupBuyingRepository groupBuyingRepository;
    private final MemberRepository memberRepository;
    private final IntersectionRepository intersectionRepository;
    private final LikeRepository likeRepository;

/*    public List<GroupBuyingListResponseDto> searchGroupBuying(String keyword) {
        return groupBuyingRepository.findByKeyword(keyword)
                .stream()
                .map(GroupBuyingListResponseDto::new)
                .collect(Collectors.toList());
    }*/

    @Transactional(readOnly = true)
    public List<GroupBuyingListResponseDto> findAllGroupBuying() {
        List<GroupBuying> findedGroupBuyings = groupBuyingRepository.findAll();
        checkExpiredPost(findedGroupBuyings);

        return findedGroupBuyings.stream().map(GroupBuyingListResponseDto::new).collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public GroupBuyingResponseDto findGroupBuying(Long postId) {
        List<Comment> commentList = groupBuyingRepository.findById(postId).getComments();
        List<CommentResponseDto> commentResponseDtoList = new ArrayList<>();
        for (Comment comment : commentList) {
            CommentResponseDto commentResponseDto = new CommentResponseDto(comment);
            if (comment.getChildren().size() != 0) {
                for (Comment child : comment.getChildren()) {
                    commentResponseDto.addChild(new CommentResponseDto(child));
                }
                commentResponseDtoList.add(commentResponseDto);
            }

        }

        return new GroupBuyingResponseDto(groupBuyingRepository.findById(postId), commentResponseDtoList);
    }

    public Long postGroupBuying(GroupBuyingRequestDto groupBuyingRequestDto, MultipartFile postImage) throws IOException {
        //Member findedMember = loadCurrentMember();
        Member currentMember = memberRepository.findById(1);

        GroupBuying newGroupBuying = new GroupBuying(groupBuyingRequestDto, currentMember);
        newGroupBuying.setImage(s3Uploader.upload(postImage, "groupBuying"));

        currentMember.postGroupBuying(newGroupBuying);
        return groupBuyingRepository.save(newGroupBuying);
    }

    public Long updateGroupBuying(GroupBuyingRequestDto groupBuyingRequestDto, MultipartFile postImage, Long postId) throws IOException {
        GroupBuying findedPost = groupBuyingRepository.findById(postId);
        s3Uploader.deleteRemoteFile(findedPost.getImage().substring(52));

        return findedPost.update(groupBuyingRequestDto, s3Uploader.upload(postImage, "groupBuying"));
    }

    public void deleteGroupBuying(Long postId) {
        groupBuyingRepository.delete(groupBuyingRepository.findById(postId));
    }

    public Long participantGroupBuying(Long postId) {
        //Member currentMember = loadCurrentMember();
        Member currentMember = memberRepository.findById(1);
        GroupBuying currentPost = groupBuyingRepository.findById(postId);

        if (currentPost.getLimitMember() <= currentPost.getMemberList().size())
            throw new AlreadyFullException(ErrorResponse.ALREADY_FULL);

        GroupBuyingIntersection newGroupBuyingIntersection = new GroupBuyingIntersection(currentMember, currentPost);
        currentMember.participantGroupBuying(newGroupBuyingIntersection);
        currentPost.addMember(newGroupBuyingIntersection);

        return intersectionRepository.save(newGroupBuyingIntersection);
    }

    public Long pushLikeGroupBuying(Long postId) {
        Member currentMember = loadCurrentMember();
        //Member currentMember = memberRepository.findById(1);
        GroupBuying currentGroupBuying = groupBuyingRepository.findById(postId);

        LikedGroupBuying newLikedGroupBuying = new LikedGroupBuying(currentMember, currentGroupBuying);
        currentMember.pushLikeGroupBuying(newLikedGroupBuying);
        return likeRepository.save(newLikedGroupBuying);
    }

    private Member loadCurrentMember() {
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }

    private void checkExpiredPost(List<GroupBuying> findedGroupBuyings) {
        findedGroupBuyings.stream().filter(g -> g.getDeadLine().isBefore(LocalDateTime.now())).forEach(GroupBuying::expirePost);
    }
}
