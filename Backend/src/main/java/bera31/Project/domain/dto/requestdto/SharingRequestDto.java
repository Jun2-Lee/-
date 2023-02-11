package bera31.Project.domain.dto.requestdto;

import bera31.Project.domain.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SharingRequestDto {
    String title;
    String content;
    String category;
    String product;
    LocalDateTime expiry;
    LocalDateTime deadLine;
    String gu;
    String dong;
}