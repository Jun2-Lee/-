package bera31.Project;

import bera31.Project.domain.member.Member;
import bera31.Project.domain.page.dutchpay.DutchPay;
import bera31.Project.service.ScheduleService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import javax.persistence.EntityManager;

@Component
@RequiredArgsConstructor
public class InitDB {

    private final InitService initService;

    @PostConstruct
    public void init() {
        initService.dbInit1();
    }

    @Component
    @Transactional
    @RequiredArgsConstructor
    static class InitService {

        private final EntityManager em;
        private final ScheduleService memoService;


        public void dbInit1() {
            Member member = new Member();
            member.setNickname("심진섭");

        }
    }
}
