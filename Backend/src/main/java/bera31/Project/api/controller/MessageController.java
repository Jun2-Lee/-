package bera31.Project.api.controller;

import bera31.Project.domain.dto.requestdto.MessageRequestDto;
import bera31.Project.domain.dto.responsedto.message.EachRoomMessageResponseDto;
import bera31.Project.domain.dto.responsedto.message.MessageResponseDto;
import bera31.Project.service.MessageService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/message")
public class MessageController {
    private final MessageService messageService;

    @Operation(summary = "메시지 전체 목록을 띄워주는 API입니다.",
            description = "로그인 한 사용자와 대화한 적이 있는 모든 메시지를 응답에 반환합니다." +
                    "가장 최근 메시지가 아래로 내려가는 문제를 해결해야 합니다.")
    @GetMapping
    public ResponseEntity<List<MessageResponseDto>> showMessages(){
        return new ResponseEntity<>(messageService.showMyMessages(), HttpStatus.OK);
    }

    @Operation(summary = "각 방의 쪽지 내역을 띄워주는 API입니다.",
            description = "방 번호를 Request Parameter 형식으로 URL에 넘겨주시면 됩니다.")
    @GetMapping("/{roomNumber}")
    public ResponseEntity<List<EachRoomMessageResponseDto>> showRoomMessage(@PathVariable Long roomNumber){
        return new ResponseEntity<>(messageService.showEachRoomMessage(roomNumber), HttpStatus.OK);
    }

    @Operation(summary = "최초로 쪽지를 작성하는 API입니다.",
            description = "처음엔 방이 생성이 되어있지 않으니, 방을 생성하며 쪽지를 보내는 API입니다." +
                    "쪽지의 내용과 받을 상대의 고유 id 값을 보내주시면 됩니다." +
                    "해당 부분은 안되면 말씀해주시기 바랍니다.")
    @PostMapping
    public Long sendMessage(@RequestBody MessageRequestDto messageRequestDto){
        return messageService.sendMessage(messageRequestDto);
    }
    @Operation(summary = "방이 이미 생성되었을 때, 각 방에 쪽지를 보내는 API입니다.",
            description = "해당 방의 번호를 URL에 Request Parameter 형식으로 보내주시면 됩니다." +
                    "위의 Controller와 마찬가지로 상대의 고유 id 값과 메시지 내용을 보내주시면 됩니다." +
                    "이 부분도 제한 시 말씀해주시기 바랍니다.")
    @PostMapping("/{roomNumber}")
    public Long sendMessageToRoom(@PathVariable Long roomNumber,
                                  @RequestBody MessageRequestDto messageRequestDto){
        return messageService.sendMessage(messageRequestDto, roomNumber);
    }
}
