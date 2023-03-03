package bera31.Project.repository;

import bera31.Project.domain.comment.ChildComment;
import bera31.Project.domain.comment.Comment;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
@RequiredArgsConstructor
public class CommentRepository {

    private final EntityManager em;

    public void save(Comment comment) {
        em.persist(comment);
    }

    public void save(ChildComment comment) {
        em.persist(comment);
    }

    public void delete(Comment comment) {
        em.remove(comment);
    }

    public void delete(ChildComment comment) {
        em.remove(comment);
    }

    public List<Comment> findAll() {
        return em.createQuery("select c from Comment c", Comment.class)
                .getResultList();
    }

    public List<ChildComment> findAllChildComment() {
        return em.createQuery("select c from ChildComment c", ChildComment.class)
                .getResultList();
    }

    public Comment findCommentById(Long id) {
        return em.createQuery("select c from Comment c where c.id =:id", Comment.class)
                .setParameter("id", id)
                .getSingleResult();
    }

    public ChildComment findChildCommentById(Long id) {
        return em.createQuery("select c from ChildComment c where c.id =:id", ChildComment.class)
                .setParameter("id", id)
                .getSingleResult();
    }
}
