package bera31.Project.domain.page.sharing;

import bera31.Project.domain.Address;
import bera31.Project.domain.dto.requestdto.SharingRequestDto;
import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.Contents;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Sharing extends Contents {
    String category;
    String product;
    LocalDateTime expiry;
    LocalDateTime deadLine;

    boolean isFinish;
    String image;
    String content;
    String gu;
    String dong;

    public Sharing(SharingRequestDto sharingRequestDto) {
        this.title = sharingRequestDto.getTitle();
        this.category = sharingRequestDto.getCategory();
        this.product = sharingRequestDto.getProduct();
        this.expiry = sharingRequestDto.getExpiry();
        this.deadLine = sharingRequestDto.getDeadLine();
        this.postTime = LocalDateTime.now();
        this.gu = sharingRequestDto.getGu();
        this.dong = sharingRequestDto.getDong();
        this.content = sharingRequestDto.getContent();
    }

    public void updateSharing(SharingRequestDto sharingRequestDto) {
        this.title = sharingRequestDto.getTitle();
        this.content = sharingRequestDto.getContent();
        this.category = sharingRequestDto.getCategory();
        this.product = sharingRequestDto.getProduct();
        this.expiry = sharingRequestDto.getExpiry();
        this.gu = sharingRequestDto.getGu();
        this.dong = sharingRequestDto.getDong();
        this.deadLine = sharingRequestDto.getDeadLine();
    }

    public void setImage(String image) {
        this.image = image;
    }
}