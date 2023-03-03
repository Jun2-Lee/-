package bera31.Project.config.jwt;

import bera31.Project.utility.JsonUtility;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.filters.RequestFilter;
import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

// Custom한 JWT Filter를 등록해주기 위한 Configuration
@RequiredArgsConstructor
public class JwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
    private final JwtTokenProvider tokenProvider;
    private final JsonUtility jsonUtility;

    @Override
    public void configure(HttpSecurity http) throws Exception {
        JwtFilter customFilter = new JwtFilter(tokenProvider);
        ExceptionFilter exceptionFilter = new ExceptionFilter(jsonUtility);

        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
        http.addFilterBefore(exceptionFilter, JwtFilter.class);
    }
}
