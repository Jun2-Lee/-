package bera31.Project.repository;

import bera31.Project.domain.schedule.Schedule;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class ScheduleRepository {
    private final EntityManager em;
    public Long save(Schedule memo) {
        em.persist(memo);
        return memo.getId();
    }
    public void delete(Schedule memo) {
        em.remove(memo);
        return;
    }
    public Schedule findById(Long id) {
        return em.createQuery("select s from Schedule s where s.id =:id", Schedule.class)
                .setParameter("id", id)
                .getSingleResult();
    }

    public List<Schedule> findTodaySchedule(LocalDate today){
        return em.createQuery("select s from Schedule s where s.time=:today", Schedule.class)
                .setParameter("today", today)
                .getResultList();
    }
}
