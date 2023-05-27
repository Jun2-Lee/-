import React, { useState, useEffect} from "react";
import './index.css';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';


function Diary(props) {
  const [showSchedule, setShowSchedule] = useState(false);
  const [schedules, setSchedules] = useState([]); //일정 리스트
  const [mySchedule, setMySchedule] = useState([]); //일정 보기
  const [showMySchedule, setShowMySchedule] = useState(false); //화면 클릭


  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [content, setContent] = useState('');
  const [targetDate, setTargetDate] = useState(props.date);

  
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

    const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handlePlaceChange = (event) => {
    setPlace(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };


//등록 버튼을 누르면 정보가 넘어가는 동시에 달력 전체에 뿌려짐

const postSchedule = () => {
  const accessToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios
    .post("http://3.36.144.128:8080/api/mypage/schedule", {
      title,
      time,
      place,
      content,
      targetDate,
    })
    .then((response) => {
      setSchedules([...schedules, response.data]);
      setShowSchedule(false);

      // 새로운 스케줄을 기존 mySchedule에 추가하여 업데이트
      setMySchedule([...mySchedule, response.data]);
    })
    .catch((error) => {
      console.log(error);
    });
};

useEffect(() => {
  const accessToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  const fetchData = async () => {
    try {
      const response = await axios.get("http://3.36.144.128:8080/api/mypage/schedule/");
      
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [props.date]);



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
        setMySchedule(filteredSchedules); // 수정: [filteredSchedules] 대신 filteredSchedules를 설정
      } else {
        setMySchedule([]);
      }

    } catch (error) {
      console.log(error);
    }
  };
  fetchData();
}, [props.date]);


console.log(mySchedule)




return (
  <div className="schedule" >
    <div className="schedule-list" >
      {mySchedule.map((schedule, index) => (
        <button
          key={index}
          className="dailySchedule"
          onClick={() => setShowMySchedule(schedule)}
        >
          {schedule.title}
        </button>
      ))}
    </div>
    {showMySchedule && (
      <div className="mySchedule">
        <div>{showMySchedule.title}</div>
        <div>{showMySchedule.time}</div>
        <div>{showMySchedule.place}</div>
        <div>{showMySchedule.content}</div>
      </div>
    )}
    {mySchedule.length === 0 && (
      <div className="mySchedule">
        <div>x</div>
      </div>
    )}

  
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
            <input className="titleSchedule"value={title} onChange={handleTitleChange}/>
          </div>

          <div className="timeInput">
            <label className="TimeSchedule">시각</label>
            <input className="timeSchedule" value={time} onChange={handleTimeChange} />
          </div>

          <div className="placeInput">
            <label className="PlaceSchedule">장소</label>
            <input className="placeSchedule"value={place} onChange={handlePlaceChange} />
          </div>

          <div className="memoInput">
            <label className="MemoSchedule">메모</label>
            <input className="memoSchedule" value={content} onChange={handleContentChange}/>
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