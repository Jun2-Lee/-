package bera31.Project.service.page;

import bera31.Project.config.S3.S3Uploader;
import bera31.Project.domain.dto.requestdto.SharingRequestDto;
import bera31.Project.domain.dto.responsedto.sharing.SharingListResponseDto;
import bera31.Project.domain.dto.responsedto.sharing.SharingResponseDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.intersection.LikedSharing;
import bera31.Project.domain.page.sharing.Sharing;
import bera31.Project.repository.LikeRepository;
import bera31.Project.repository.MemberRepository;
import bera31.Project.repository.page.SharingRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SharingService {
    private final MemberRepository memberRepository;
    private final SharingRepository sharingRepository;

    private final LikeRepository likeRepository;
    private final S3Uploader s3Uploader;

    @Transactional(readOnly = true)
    public List<SharingListResponseDto> findAllSharing() {
        List<Sharing> findedSharings = sharingRepository.findAll();
        checkExpiredPost(findedSharings);

        return findedSharings.stream()
                .map(SharingListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SharingResponseDto findSharing(Long postId) {
        return new SharingResponseDto(sharingRepository.findById(postId));
    }

    public void postSharing(SharingRequestDto sharingRequestDto, MultipartFile postImage) throws IOException {
        //Member currentMember = loadCurrentMember();
        Member currentMember = memberRepository.findById(1);

        Sharing newSharing = new Sharing(sharingRequestDto, currentMember);
        newSharing.setImage(s3Uploader.upload(postImage, "sharing"));

        currentMember.postSharing(newSharing);
        sharingRepository.save(newSharing);
    }

    public void updateSharing(Long postId, SharingRequestDto sharingRequestDto) {
        Sharing findedSharing = sharingRepository.findById(postId);
        findedSharing.updateSharing(sharingRequestDto);
    }

    public void deleteSharing(Long postId) {
        sharingRepository.delete(sharingRepository.findById(postId));
    }

    public void pushLikeSharing(Long postId) {
        //Member currentMember = loadCurrentMember();
        Member currentMember = memberRepository.findById(1);
        Sharing currentSharing = sharingRepository.findById(postId);

        LikedSharing newLikeSharing = new LikedSharing(currentMember, currentSharing);
        currentMember.pushLikeSharing(newLikeSharing);
        likeRepository.save(newLikeSharing);
    }

    public String closeSharing(Long postId){
        sharingRepository.findById(postId).expirePost();
        return "거래가 마감되었습니다.";
    }

    private Member loadCurrentMember() {
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }

    private void checkExpiredPost(List<Sharing> findedSharings) {
        findedSharings.stream()
                .filter(g -> g.getDeadLine().isBefore(LocalDateTime.now()))
                .forEach(Sharing::expirePost);
    }
}