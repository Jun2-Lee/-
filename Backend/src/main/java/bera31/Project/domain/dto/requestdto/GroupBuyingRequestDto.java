package bera31.Project.domain.dto.requestdto;

import bera31.Project.config.S3.S3Uploader;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GroupBuyingRequestDto {
    String title;
    String category;
    String product;
    String link;
    int price;
    int memberLimit;
    LocalDateTime deadLine;
    String content;
    String gu;
    String dong;
}
