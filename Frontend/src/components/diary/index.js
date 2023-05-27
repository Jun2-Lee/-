import React, { useState, useEffect} from "react";
import './index.css';
import axios from "axios";


function Diary(props, {date}) {
  const [showSchedule, setShowSchedule] = useState(false);
  const [schedules, setSchedules] = useState([]); //일정 리스트
  const [mySchedule, setMySchedule] = useState([]); //일정 보기
  const [showMySchedule, setShowMySchedule] = useState(false); //화면 클릭

  
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [content, setContent] = useState('');
  const [targetDate, setTargetDate] = useState(props.date);

//등록 버튼을 누르면 정보가 넘어가는 동시에 달력 전체에 뿌려짐
const postSchedule = () => {
  axios.post("http://3.36.144.128:8080/api/mypage/schedule", {
    title,
    time,
    place,
    content,
    targetDate,
  })
    .then((response) => {
      setSchedules([...schedules, response.data]);
      setShowSchedule(false);
      setMySchedule([response.data]);

      axios.get("http://3.36.144.128:8080/api/mypage/schedule")
        .then((response) => {
          const filteredSchedules = response.data.filter(
            (schedule) => schedule.targetDate === props.date
          );
          setMySchedule(filteredSchedules);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get("http://3.36.144.128:8080/api/mypage/schedule/");
      const scheduleIds = response.data.map((schedule) => schedule.id);
      console.log(scheduleIds)

      const filteredSchedules1 = response.data.filter((schedule) => schedule.targetDate === props.date);

      const requests = filteredSchedules1.map((schedule) =>
        axios.get(`http://3.36.144.128:8080/api/mypage/schedule/${schedule.id}`)
      );
      const responses = await Promise.all(requests);
      const filteredSchedules = responses.map((response) => response.data);

      console.log(filteredSchedules)
      if (filteredSchedules.length > 0) {
        setMySchedule([filteredSchedules]);
      } else {
        setMySchedule([]);
      }

    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [props.date]);




  return (
    
    <div className="schedule">
<button className="dailySchedule" >

{mySchedule && mySchedule.length > 0 ? mySchedule[0][0].title : "일정 없음"}
    </button>
    {mySchedule && Object.keys(mySchedule).length > 0 &&
        <div className="mySchedule">
          <div>{mySchedule[0][0].title}</div>
          <div>{mySchedule[0][0].time}</div>
          <div>{mySchedule[0][0].place}</div>
          <div>{mySchedule[0][0].content}</div>
          {console.log(mySchedule)}
        </div>
}

    <button className="writeSchedule" onClick={() => setShowSchedule(!showSchedule)}>
      <img src='assets/img/writingIcon.png' className='scheduleButton' ></img>
    </button>
      {/* 상태에 따라 다른 UI 렌더링 */}
      {mySchedule && (
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
      {/*<div className="scheduleList" style={{backgroundColor:'wheat'}}>
        {schedules.map((schedule) => (
          <ScheduleItem key={schedule.id} schedule={schedule} />
        ))}
        </div>*/}
    </div>
    
  );
}

export default Diary;