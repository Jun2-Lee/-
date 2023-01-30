package bera31.Project.service;

import bera31.Project.domain.dto.responsedto.message.EachRoomMessageResponseDto;
import bera31.Project.domain.dto.responsedto.message.MessageResponseDto;
import bera31.Project.repository.MessageRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageService {
    private final MessageRepository messageRepository;

    public List<MessageResponseDto> showMyMessages(){
        String findedEmail = SecurityUtility.getCurrentMemberEmail();
        return messageRepository.findMessageList(findedEmail).stream()
                .map(MessageResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<EachRoomMessageResponseDto> showEachRoomMessage(Long roomId){
        return messageRepository.findByRoomNumber(roomId).stream()
                .map(EachRoomMessageResponseDto::new)
                .collect(Collectors.toList());
    }

    public void sendMessage(){

    }
}
