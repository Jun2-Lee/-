package bera31.Project.domain.dto.responsedto.message;

import bera31.Project.domain.message.Message;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class EachRoomMessageResponseDto {
    String contents;
    LocalDateTime sendTime;

    public EachRoomMessageResponseDto(Message message){
        this.contents = message.getContent();
        this.sendTime = message.getSendTime();
    }
}
