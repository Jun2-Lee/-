package bera31.Project.repository;

import bera31.Project.domain.member.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Optional;

@Repository
@RequiredArgsConstructor
public class MemberRepository {
    private final EntityManager em;

    public Member save(Member member) {
        em.persist(member);
        return member;
    }
    public void delete(Member member) {
        em.remove(member);
    }
    public List<Member> findAll() {
        return em.createQuery("select m from Member m", Member.class)
                .getResultList();
    }
    public Member findById(long id) {
        return em.createQuery("select m from Member m where m.id =:id", Member.class)
                .setParameter("id", id)
                .getSingleResult();
    }

    public Optional<Member> findByEmail(String email) {
        List<Member> memberList = em.createQuery("select m from Member m where m.email =:email", Member.class)
                .setParameter("email", email)
                .getResultList();

        return memberList.stream().findAny();
    }

    public Optional<Member> findByNickName(String nickName) {
        List<Member> memberList = em.createQuery("select m from Member m where m.nickname =:nickName", Member.class)
                .setParameter("nickName", nickName)
                .getResultList();

        return memberList.stream().findAny();
    }
}
