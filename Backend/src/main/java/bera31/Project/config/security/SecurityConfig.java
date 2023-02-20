package bera31.Project.config.security;

import bera31.Project.config.jwt.JwtAccessDeniedHandler;
import bera31.Project.config.jwt.JwtAuthenticationEntryPoint;
import bera31.Project.config.jwt.JwtSecurityConfig;
import bera31.Project.config.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsUtils;

@EnableWebSecurity // Spring Security를 사용하도록 한다.
@EnableGlobalMethodSecurity(prePostEnabled = true)
// 특정 Page에 권한이 있는 User만 출입시킬 때, @PreAuthroize를 사용할 수 있는데, 이를 활성화 시킨다.
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtTokenProvider tokenProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    // Spring Security의 버전이 올라가면서, Bean을 통해 추가하는 방식으로 변경되었다.
    // 원래는 WebSecurityConfigurerAdapter를 통해서 통합 관리를 했었다.
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf().disable() // JWT를 써야하므로, CSRF Token 비활성화

                .exceptionHandling()
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler) // 예외처리

                .and() // 세션 사용하지 않음.
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                .and()
                .authorizeRequests()
                .requestMatchers(CorsUtils::isPreFlightRequest).permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/**/*").permitAll()
                .antMatchers("/api/auth/**", "/", "/swagger-ui/**",
                        "/v3/api-docs", "/swagger-resources/**", "/naong-api",
                        "/swagger-ui.html").permitAll()
                .anyRequest().authenticated()

                .and()
                .apply(new JwtSecurityConfig(tokenProvider));
        return http.build();
    }
}
