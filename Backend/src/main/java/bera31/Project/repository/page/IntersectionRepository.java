package bera31.Project.repository.page;

import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.groupbuying.GroupBuying;
import bera31.Project.domain.page.intersection.DutchPayIntersection;
import bera31.Project.domain.page.intersection.GroupBuyingIntersection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class IntersectionRepository {
    private final EntityManager em;

    public Long save(GroupBuyingIntersection groupBuyingIntersection){
        em.persist(groupBuyingIntersection);
        return groupBuyingIntersection.getId();
    }

    // Overloading
    public Long save(DutchPayIntersection dutchPayIntersection){
        em.persist(dutchPayIntersection);
        return dutchPayIntersection.getId();
    }

    public List<GroupBuyingIntersection> findByUserId(Member participant){
        return em.createQuery("select gbi from GroupBuyingIntersection gbi join fetch gbi.groupBuying " +
                        "where gbi.participant =: participant", GroupBuyingIntersection.class)
                .setParameter("participant", participant)
                .getResultList();
    }
}
