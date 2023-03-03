package bera31.Project.service;

import bera31.Project.config.S3.S3Uploader;
import bera31.Project.domain.dto.requestdto.EditInfoRequestDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.member.Provider;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import bera31.Project.exception.ErrorResponse;
import bera31.Project.exception.exceptions.KakaoUserAccessException;
import bera31.Project.exception.exceptions.UserNotFoundException;
import bera31.Project.repository.MemberRepository;
import bera31.Project.repository.page.GroupBuyingRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class MemberService {
    private final MemberRepository memberRepository;
    private final S3Uploader s3Uploader;
    private final PasswordEncoder passwordEncoder;

    public String changePassword(String password) {
        Member findedMember = loadCurrentMember();

        if(findedMember.getProvider().equals(Provider.KAKAO))
            throw new KakaoUserAccessException(ErrorResponse.KAKAO_ACCESS_DENIED);

        String encodedPassword = passwordEncoder.encode(password);
        findedMember.changePassword(encodedPassword);
        return "비밀번호가 변경되었습니다!";
    }

    public String changeMyInfo(EditInfoRequestDto editInfoRequestDto, MultipartFile profileImage) throws IOException {
        Member findedMember = loadCurrentMember();

        s3Uploader.deleteRemoteFile(findedMember.getProfileImage().substring(52));
        findedMember.setProfileImage(s3Uploader.upload(profileImage, "profileImage"));

        findedMember.changeAddress(editInfoRequestDto.getDong(), editInfoRequestDto.getGu());
        findedMember.changeFavIngredients(editInfoRequestDto.getFavIngredients());
        return "정보가 수정되었습니다!";
    }

    public void deleteMember() {
        Member currentMember = loadCurrentMember();
        memberRepository.delete(currentMember);
    }

    public String findPassword(@RequestBody String email) throws Exception {
        if (memberRepository.findByEmail(email).isPresent())
            return memberRepository.findByEmail(email).get().getPassword();
        else
            throw new UserNotFoundException(ErrorResponse.USER_NOT_FOUND);
    }

    private Member loadCurrentMember(){
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }
}
