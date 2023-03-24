package bera31.Project.utility;

import bera31.Project.exception.ErrorResponse;
import bera31.Project.exception.ErrorResponseEntity;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

@Component
public class JsonUtility {
    public String convertToJson(ErrorResponse errorResponse) throws JsonProcessingException {
        return new ObjectMapper().writeValueAsString(ErrorResponseEntity.createResponseEntity(errorResponse).getBody());
    }
}
