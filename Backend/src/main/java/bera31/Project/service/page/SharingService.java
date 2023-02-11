package bera31.Project.service.page;

import bera31.Project.config.S3.S3Uploader;
import bera31.Project.domain.dto.requestdto.SharingRequestDto;
import bera31.Project.domain.dto.responsedto.SharingListResponseDto;
import bera31.Project.domain.dto.responsedto.SharingResponseDto;
import bera31.Project.domain.page.sharing.Sharing;
import bera31.Project.repository.page.SharingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class SharingService {
    private final SharingRepository sharingRepository;
    @Autowired
    private S3Uploader s3Uploader;

    public void postSharing(SharingRequestDto sharingRequestDto, MultipartFile postImage) throws IOException {
        Sharing newSharing = new Sharing(sharingRequestDto);
        newSharing.setImage(s3Uploader.upload(postImage,"sharing"));
        sharingRepository.save(newSharing);
    }

    public void updateSharing(Long id, SharingRequestDto sharingRequestDto){
        Sharing findSharing = sharingRepository.findById(id);
        findSharing.updateSharing(sharingRequestDto);
    }

    public void deleteSharing(Long id){
        sharingRepository.delete(sharingRepository.findById(id));
    }

    @Transactional(readOnly = true)
    public List<SharingListResponseDto> findAllSharing(){
        return sharingRepository.findAll().stream()
                .map(SharingListResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public SharingResponseDto findSharing(Long id){
        return new SharingResponseDto(sharingRepository.findById(id));
    }

}