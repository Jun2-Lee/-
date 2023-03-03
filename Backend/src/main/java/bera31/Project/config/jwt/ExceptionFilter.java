package bera31.Project.config.jwt;

import bera31.Project.exception.ErrorResponse;
import bera31.Project.exception.ErrorResponseEntity;
import bera31.Project.exception.exceptions.ExpiredTokenException;
import bera31.Project.utility.JsonUtility;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintStream;

@RequiredArgsConstructor
@Component
public class ExceptionFilter extends OncePerRequestFilter{
    private final JsonUtility jsonUtility;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try{
            filterChain.doFilter(request, response);
        } catch (ExpiredTokenException e){
            setErrorResponse(HttpStatus.UNAUTHORIZED, response, e);
        }
    }

    private void setErrorResponse(HttpStatus status, HttpServletResponse response, ExpiredTokenException e) throws IOException {
        response.setStatus(status.value());
        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(jsonUtility.convertToJson(e.getErrorResponse()));
    }
}
