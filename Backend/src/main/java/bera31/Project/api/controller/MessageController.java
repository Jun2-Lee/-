package bera31.Project.api.controller;

import bera31.Project.domain.dto.responsedto.message.EachRoomMessageResponseDto;
import bera31.Project.domain.dto.responsedto.message.MessageResponseDto;
import bera31.Project.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;

    @GetMapping
    public ResponseEntity<List<MessageResponseDto>> showMessages(){
        return new ResponseEntity<>(messageService.showMyMessages(), HttpStatus.OK);
    }

    @GetMapping("/{roomId}")
    public ResponseEntity<List<EachRoomMessageResponseDto>> showRoomMessage(@PathVariable Long roomId){
        return new ResponseEntity<>(messageService.showEachRoomMessage(roomId), HttpStatus.OK);
    }
}
