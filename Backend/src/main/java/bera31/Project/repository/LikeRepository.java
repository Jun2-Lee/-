package bera31.Project.repository;

import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.intersection.LikedGroupBuying;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@RequiredArgsConstructor
@Repository
public class LikeRepository {
    private final EntityManager em;

    public Long save(LikedGroupBuying likedGroupBuying){
        em.persist(likedGroupBuying);
        return likedGroupBuying.getId();
    }
}
