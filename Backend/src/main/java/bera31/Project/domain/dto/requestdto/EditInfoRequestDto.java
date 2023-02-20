package bera31.Project.domain.dto.requestdto;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class EditInfoRequestDto {
    String gu;
    String dong;
    List<String> favIngredients;
}
