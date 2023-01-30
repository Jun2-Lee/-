package bera31.Project.domain.message;


import bera31.Project.domain.member.Member;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
public class Room {

    @Id
    @GeneratedValue
    Long id;

    @ManyToOne
    @JoinColumn(name = "MEMBER1_ID")
    Member member1;
    @ManyToOne
    @JoinColumn(name = "MEMBER2_ID")
    Member member2;

    @OneToMany(mappedBy = "room")
    List<Message> messages;
}
