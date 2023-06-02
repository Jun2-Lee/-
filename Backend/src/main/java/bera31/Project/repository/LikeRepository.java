package bera31.Project.repository;

import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import bera31.Project.domain.page.intersection.LikedGroupBuying;
import bera31.Project.domain.page.intersection.LikedSharing;
import bera31.Project.domain.page.sharing.Sharing;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class LikeRepository {
    private final EntityManager em;

    public String save(LikedGroupBuying likedGroupBuying) {
        em.persist(likedGroupBuying);
        return likedGroupBuying.getId().toString();
    }

    public String save(LikedSharing likedSharing) {
        em.persist(likedSharing);
        return likedSharing.getId().toString();
    }

    public Optional<LikedGroupBuying> findByPostIdAndUserId(GroupBuying groupBuying, Member member) {
        List<LikedGroupBuying> resultList = em.createQuery("select lg from LikedGroupBuying lg " +
                        "where lg.groupBuying =: groupBuying and lg.member =: member", LikedGroupBuying.class)
                .setParameter("groupBuying", groupBuying)
                .setParameter("member", member)
                .getResultList();

        return resultList.stream().findAny();
    }

    public Optional<LikedSharing> findByPostIdAndUserId(Sharing sharing, Member member) {
        List<LikedSharing> resultList = em.createQuery("select ls from LikedSharing ls " +
                        "where ls.sharing =: sharing and ls.member =: member", LikedSharing.class)
                .setParameter("sharing", sharing)
                .setParameter("member", member)
                .getResultList();

        return resultList.stream().findAny();
    }

    public List<LikedGroupBuying> findLGByUserId(Member member){
        return em.createQuery("select lg from LikedGroupBuying lg where lg.member =: member", LikedGroupBuying.class)
                .setParameter("member", member)
                .getResultList();
    }
    public List<LikedSharing> findLSByUserId(Member member){
        return em.createQuery("select ls from LikedSharing ls where ls.member =: member", LikedSharing.class)
                .setParameter("member", member)
                .getResultList();
    }

    public String delete(LikedGroupBuying likedGroupBuying){
        em.remove(likedGroupBuying);
        return "찜 취소";
    }
    public String delete(LikedSharing likedSharing){
        em.remove(likedSharing);
        return "찜 취소";
    }
}
