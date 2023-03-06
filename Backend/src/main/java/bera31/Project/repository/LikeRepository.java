package bera31.Project.repository;

import bera31.Project.domain.page.intersection.LikedGroupBuying;
import bera31.Project.domain.page.intersection.LikedSharing;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

@RequiredArgsConstructor
@Repository
public class LikeRepository {
    private final EntityManager em;

    public Long save(LikedGroupBuying likedGroupBuying) {
        em.persist(likedGroupBuying);
        return likedGroupBuying.getId();
    }

    public Long save(LikedSharing likedSharing) {
        em.persist(likedSharing);
        return likedSharing.getId();
    }
}
