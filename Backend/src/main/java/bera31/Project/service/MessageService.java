package bera31.Project.service;

import bera31.Project.domain.dto.requestdto.MessageRequestDto;
import bera31.Project.domain.dto.responsedto.message.EachRoomMessageResponseDto;
import bera31.Project.domain.dto.responsedto.message.MessageResponseDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.message.Message;
import bera31.Project.repository.MemberRepository;
import bera31.Project.repository.MessageRepository;
import bera31.Project.utility.SecurityUtility;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class MessageService {
    private final MessageRepository messageRepository;
    private final MemberRepository memberRepository;

    public List<MessageResponseDto> showMyMessages(){
        Member findedMember = loadCurrentMember();
        String otherName = "";

        List<Message> messageList = messageRepository.findMessageList(findedMember.getNickname());
        List<MessageResponseDto> responseDtoList = new ArrayList<>();

        for(Message msg : messageList){
            if(findedMember.getNickname().equals(msg.getSender().getNickname()))
                otherName = findedMember.getNickname();
            else
                otherName = msg.getReceiver().getNickname();

            responseDtoList.add(
                    new MessageResponseDto(msg.getRoomNumber(), msg.getContent(), otherName, msg.getSendTime()));
        }

        return responseDtoList;
    }

    public List<EachRoomMessageResponseDto> showEachRoomMessage(Long roomId){
        return messageRepository.findByRoomNumber(roomId).stream()
                .map(EachRoomMessageResponseDto::new)
                .collect(Collectors.toList());
    }

    public void sendMessage(MessageRequestDto messageRequestDto){
        Long maxRoomNumber = 0L;
        if(messageRepository.findMaxRoomNumber() != null)
            maxRoomNumber = messageRepository.findMaxRoomNumber();

        Message newMessage = new Message(messageRequestDto, maxRoomNumber + 1,
                                         loadCurrentMember(), findReceiver(messageRequestDto));

        messageRepository.save(newMessage);
    }

    public void sendMessage(MessageRequestDto messageRequestDto, Long roomId){
        Message newMessage = new Message(messageRequestDto, roomId, loadCurrentMember(), findReceiver(messageRequestDto));
        messageRepository.save(newMessage);
    }

    private Member loadCurrentMember(){
        String currentMemberEmail = SecurityUtility.getCurrentMemberEmail();
        return memberRepository.findByEmail(currentMemberEmail).get();
    }

    private Member findReceiver(MessageRequestDto messageRequestDto){
        return memberRepository.findByNickName(messageRequestDto.getNickname()).get();
    }
}
