package bera31.Project.domain.page;


import bera31.Project.domain.comment.Comment;
import bera31.Project.domain.member.Member;
import lombok.AllArgsConstructor;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
public abstract class Contents {
    @Id
    @GeneratedValue
    @Column(name = "CONTENTS_ID")
    Long id;

    protected String title;

    @ManyToOne
    @JoinColumn(name = "MEMBER_ID")
    protected Member user;

    @OneToMany(mappedBy = "contents")
    List<Comment> comments = new ArrayList<>();

    protected LocalDateTime postTime;
}
