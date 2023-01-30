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

    public MessageResponseDto(Message message){
        this.roomNumber = message.getRoomNumber();
        this.other =
        this.content = message.getContent();
        this.sendTime = message.getSendTime();
    }
}
