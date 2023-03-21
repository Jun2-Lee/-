import React, { useState, useEffect} from "react";
import './index.css';
import axios from "axios";


function Diary() {
  const [showSchedule, setShowSchedule] = useState(false); // 상태 변수 추가
  const [schedules, setSchedules] = useState([]);// 일정 정보 저장 배열
  const [mySchedule, setMySchedule] = useState(null);//일정 보기
 
  const postSchedule = () => {
    const title = document.querySelector(".titleSchedule").value;
    const time = document.querySelector(".timeSchedule").value;
    const place = document.querySelector(".placeSchedule").value;
    const content = document.querySelector(".memoSchedule").value;
    const postDate = document.querySelector(".postDateSchedule").value;
  
  
    axios.post("http://3.36.144.128:8080/api/mypage/schedule", { postDate, title, time, place, content })
    .then((response) => {
      setSchedules([...schedules, response.data]); // 등록된 일정 목록에 새로 추가
      setShowSchedule(false); // 일정 등록 화면 닫기
      setMySchedule(response.data); // 등록된 일정을 mySchedule에 할당
      
    })
    .catch((error) => {
      console.log(error);
    });
};

const handleClickSchedule = (schedule) => {
  setMySchedule(schedule);
};
  

const ScheduleItem = ({ schedule }) => {
  return (
    <div className="scheduleItem" onClick={() => handleClickSchedule(schedule)} key={schedule.id}>
      <div>{schedule.title}</div>
      <div>{schedule.time}</div>
      <div>{schedule.place}</div>
      <div>{schedule.content}</div>
      <div>{schedule.postDate}</div>
    </div>
  );
};


  useEffect(() => {
    axios.get("http://3.36.144.128:8080/api/mypage/schedule")
      .then((response) => {
        setSchedules(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);




  return (
    
    <div className="schedule">
    <button className="dailySchedule" onClick={()=> setMySchedule(true)}>
      ㅇㅇ
    </button>
    {mySchedule && (
        <div className="checkSchedule">
          <div className="checkTitle">제목: {mySchedule.title}</div>
          <div className="checkTime">시각: {mySchedule.time}</div>
          <div className="checkPlace">장소: {mySchedule.place}</div>
          <div className="checkContent">메모: {mySchedule.content}</div>
        
        </div>
        
      )}

    <button className="writeSchedule" onClick={() => setShowSchedule(true)}>
      <img src='assets/img/writingIcon.png' className='scheduleButton' ></img>
    </button>
      {/* 상태에 따라 다른 UI 렌더링 */}
      {showSchedule && (
        <div className="postSchedule">
          <div className="namePost">
              일정 등록
          </div>
         
          <div className="titleInput">
            <label className="TitleSchedule">제목</label>
            <input className="titleSchedule" />
          </div>

          <div className="timeInput">
            <label className="TimeSchedule">시각</label>
            <input className="timeSchedule" />
          </div>

          <div className="placeInput">
            <label className="PlaceSchedule">장소</label>
            <input className="placeSchedule" />
          </div>

          <div className="memoInput">
            <label className="MemoSchedule">메모</label>
            <input className="memoSchedule" />
          </div>

          

        

          <button className="postScheduleButton" onClick={postSchedule}>
              등록
          </button>
        </div>
      )}
      {/* 등록된 일정 목록 렌더링 */}
      <div className="scheduleList">
        {schedules.map((schedule,id) => (
          <ScheduleItem key={id} schedule={schedule} />
        ))}
      </div>
    </div>
    
  );
}

export default Diary;