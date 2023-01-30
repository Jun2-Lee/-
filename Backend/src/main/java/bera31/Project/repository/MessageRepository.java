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

    public Message save(Message message) {
        em.persist(message);
        return message;
    }

    public void delete(Message message) {
        em.remove(message);
    }

    public List<Message> findByRoomNumber(Long roomNumber) {
        return em.createQuery("select m from Message m where m.roomNumber =: roomNumber", Message.class)
                .setParameter("roomNumber", roomNumber)
                .getResultList();
    }
    public List<Message> findMessageList(String email) {
        return em.createQuery("select m.sender, m.receiver, m.content, MAX(m.sendTime) from Message m " +
                        "group by m.roomNumber having m.sender =: email or m.receiver =: email ", Message.class)
                .setParameter("email", email)
                .getResultList();
    }
}
