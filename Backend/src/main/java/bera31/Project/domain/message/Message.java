package bera31.Project.domain.message;

import bera31.Project.domain.dto.requestdto.MessageRequestDto;
import bera31.Project.domain.member.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue
    @Column(name = "MESSAGE_ID")
    private Long id;
    private Long roomNumber;
    private LocalDateTime sendTime;

    @ManyToOne
    @JoinColumn(name = "SENDER_MEMBER_ID")
    private Member sender;
    @ManyToOne
    @JoinColumn(name = "RECEIVER_MEMBER_ID")
    private Member receiver;

    private String content;

    public Message(MessageRequestDto messageRequestDto, Long roomNumber, Member sender, Member receiver){
        this.receiver = receiver;
        this.sender = sender;
        this.roomNumber = roomNumber;
        this.content = messageRequestDto.getContent();
        this.sendTime = LocalDateTime.now();
    }
}
