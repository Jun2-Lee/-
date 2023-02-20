package bera31.Project.domain.dto.responsedto.message;

import bera31.Project.domain.message.Message;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MessageResponseDto {
    Long roomNumber;
    String other;
    String content;
    LocalDateTime sendTime;

    public MessageResponseDto(Long roomNumber, String other, String content, LocalDateTime sendTime){
        this.roomNumber = roomNumber;
        this.other = other;
        this.content = content;
        this.sendTime = sendTime;
    }
}
