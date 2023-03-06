package bera31.Project.utility;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SecurityUtility {
    public static String getCurrentMemberEmail() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("인증 정보가 없는 유저입니다.");
        }

        return authentication.getName();
    }
}
