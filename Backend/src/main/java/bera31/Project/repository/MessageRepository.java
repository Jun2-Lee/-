package bera31.Project.repository;

import bera31.Project.domain.message.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class MessageRepository {
    private final EntityManager em;

    public Long save(Message message) {
        em.persist(message);
        return message.getId();
    }

    public void delete(Message message) {
        em.remove(message);
    }

    public List<Message> findByRoomNumber(Long roomNumber) {
        return em.createQuery("select m from Message m where m.roomNumber =: roomNumber " +
                        "order by m.sendTime", Message.class)
                .setParameter("roomNumber", roomNumber)
                .getResultList();
    }

    public List<Message> findMessageList(String nickname) {
        return em.createQuery("select m from Message m " +
                        "where m.id in (select max(m.id) from Message m group by m.roomNumber)" +
                        "and (m.sender.nickname =: nickname or m.receiver.nickname =: nickname)", Message.class)
                .setParameter("nickname", nickname)
                .getResultList();
    }

    public Long findMaxRoomNumber(){
        return em.createQuery("select MAX(m.roomNumber) from Message m", Long.class)
                .getSingleResult();
    }
}
