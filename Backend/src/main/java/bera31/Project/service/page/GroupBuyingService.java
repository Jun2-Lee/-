package bera31.Project.service.page;


import bera31.Project.domain.dto.requestdto.GroupBuyingRequestDto;
import bera31.Project.domain.dto.responsedto.GroupBuyingListResponseDto;
import bera31.Project.domain.dto.responsedto.GroupBuyingResponseDto;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import bera31.Project.repository.page.GroupBuyingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class GroupBuyingService {
    private final GroupBuyingRepository groupBuyingRepository;

    public List<GroupBuyingListResponseDto> searchGroupBuying(String keyword) {
        return groupBuyingRepository.findByKeyword(keyword)
                .stream()
                .map(GroupBuyingListResponseDto::new)
                .collect(Collectors.toList());
    }

    public List<GroupBuyingListResponseDto> findAllGroupBuying() {
        return groupBuyingRepository.findAll()
                .stream()
                .map(GroupBuyingListResponseDto::new)
                .collect(Collectors.toList());
    }

    public Long postGroupBuying(GroupBuyingRequestDto groupBuyingRequestDto) {
        GroupBuying savedGroupBuying = groupBuyingRepository.save(new GroupBuying(groupBuyingRequestDto));
        return savedGroupBuying.getId();
    }

    public Long updateGroupBuying(GroupBuyingRequestDto groupBuyingRequestDto, Long postId) {
        return groupBuyingRepository.findById(postId).update(groupBuyingRequestDto);
    }

    public GroupBuyingResponseDto findGroupBuying(Long postId) {
        return new GroupBuyingResponseDto(groupBuyingRepository.findById(postId));
    }
}
