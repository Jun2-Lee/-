package bera31.Project.service;

import bera31.Project.domain.comment.ChildComment;
import bera31.Project.domain.comment.Comment;
import bera31.Project.domain.dto.requestdto.CommentRequestDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import bera31.Project.domain.page.sharing.Sharing;
import bera31.Project.repository.CommentRepository;
import bera31.Project.repository.MemberRepository;
import bera31.Project.repository.page.GroupBuyingRepository;
import bera31.Project.repository.page.SharingRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final MemberRepository memberRepository;
    private final GroupBuyingRepository groupBuyingRepository;
    private final SharingRepository sharingRepository;

    public void saveSharingComment(CommentRequestDto commentRequestDto, Long contentsId) {
        Member currentMember = loadCurrentMember();
        Sharing currentSharing = sharingRepository.findById(contentsId);
        Comment comment = new Comment(commentRequestDto, currentMember, currentSharing);
        currentSharing.addComment(comment);
        commentRepository.save(comment);
    }

    public void saveGroupBuyingComment(CommentRequestDto commentRequestDto, Long contentsId) {
        Member currentMember = loadCurrentMember();
        GroupBuying currentGroupBuying = groupBuyingRepository.findById(contentsId);
        Comment comment = new Comment(commentRequestDto, currentMember, currentGroupBuying);
        currentGroupBuying.addComment(comment);
        commentRepository.save(comment);
    }

    public void saveChildComment(CommentRequestDto commentRequestDto, Long commentId) {
        Member currentMember = loadCurrentMember();
        Comment parent = commentRepository.findCommentById(commentId);
        ChildComment comment = new ChildComment(commentRequestDto, currentMember, parent);
        parent.getContents().addChildComment(comment);
        parent.addChild(comment);
        commentRepository.save(comment);
    }

    public void deleteComment(Long commentId) {
        commentRepository.delete(commentRepository.findCommentById(commentId));
    }

    public void deleteChildComment(Long commentId) {
        commentRepository.delete(commentRepository.findChildCommentById(commentId));
    }

    private Member loadCurrentMember() {
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }

}
