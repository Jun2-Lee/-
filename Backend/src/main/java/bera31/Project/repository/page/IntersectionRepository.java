package bera31.Project.repository.page;

import bera31.Project.domain.page.intersection.DutchPayIntersection;
import bera31.Project.domain.page.intersection.GroupBuyingIntersection;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;

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
}
