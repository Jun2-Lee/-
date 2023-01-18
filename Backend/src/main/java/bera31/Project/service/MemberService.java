package bera31.Project.service;

import bera31.Project.config.S3.S3Uploader;
import bera31.Project.domain.Address;
import bera31.Project.domain.member.Member;
import bera31.Project.repository.MemberRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final S3Uploader s3Uploader;

    public String changePassword(String password) {
        Member findedMember = loadCurrentMember();
        findedMember.changePassword(password);
        return "OK";
    }

    public String changeMyInfo(String dong, String gu, MultipartFile profileImage) throws IOException {
        Member findedMember = loadCurrentMember();
        s3Uploader.deleteRemoteFile(findedMember.getProfileImage().substring(52));
        findedMember.changeImage(s3Uploader.upload(profileImage, "profileImage"));
        findedMember.changeAddress(dong, gu);
        return "OK";
    }

    @Transactional(readOnly = true)
    public void/*List<Memo>*/ findMyMemo() {
        //멤버 찾기(로그인 구현 후에 할 예정)
        //return member.getMemoList();
    }

    public void deleteMember() {
        //멤버 찾기(로그인 구현 후에 할 예정)
        //memberRepository.delete(member);
    }

    public String findPassword(@RequestBody String email) throws Exception {
        if (memberRepository.findByEmail(email).isPresent())
            return memberRepository.findByEmail(email).get().getPassword();
        else
            throw new Exception("없는 이메일 입니다.");
    }

    private Member loadCurrentMember(){
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }
}
