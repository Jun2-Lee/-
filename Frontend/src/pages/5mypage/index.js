import {useState} from "react";
import { useEffect } from "react";
import CategoryBar2 from "../../components/categoryBar2";
import "./index.css";
import axios from 'axios'

function MyPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://3.36.144.128:8080/api/mypage')
      .then(response => {
        setItems(Object.values(response.data).map(item => {
          const date_sharing = new Date(item.simpleSharingList.postTime).toLocaleDateString("ko-KR");
          const date_dutchpay = new Date(item.simpleDutchPayList.postTime).toLocaleDateString("ko-KR");
          const date_groupBuying = new Date(item.simpleGroupBuyingList.postTime).toLocaleDateString("ko-KR");
          return { ...item, 
                  "simpleSharingList": { ...item.simpleSharingList, "postTime": date_sharing },
                  "simpleDutchPayList": { ...item.simpleDutchPayList, "postTime": date_dutchpay },
                  "simpleGroupBuyingList": { ...item.simpleGroupBuyingList, "postTime": date_groupBuying },
                }     
        }));
      })
      .catch(error => console.log(error));
  }, [])

  function handeleSimpleSharingList() {
    
  }
  /*useEffect(() => {
    axios.get('http://3.36.144.128:8080/api/mypage')
      .then(response => {
        setItems(response.data.map(item => {
          const formattedDate_sharing = new Date(item.postTime).toLocaleDateString("ko-KR");
          return { ...item, postTime: formattedDate };
        }));
      })
      .catch(error => console.log(error));
  }, [])*/
  return (
    <div className="mypage_body">
      <section className="mypage_categoryBar">
        <CategoryBar2 />
      </section>

      <section className="mypage_box">
        <div className="mypage_container"> 
          <label id="mypage_label">내 프로필</label>

          <div className="mypage_profile">
            <img src="assets/img/bigLogo.png"/>
            <span>뭐먹지님, 안녕하세요</span>
          </div>

          <div className="modify_profile">
            <span>프로필 수정하기</span>
          </div>
        </div>

        <div className="mypage_container">
          <label id="mypage_label">참여 목록</label>
          <div className="participation_list"></div>
          <div className="participation_list"></div>
          <div className="participation_list"></div>
          <div className="participation_list"></div>
        </div>

        <div className="mypage_container">
          <label id="mypage_label">쪽지함</label>
          <div className="participation_list"></div>
          <div className="participation_list"></div>
          <div className="participation_list"></div>
          <div className="participation_list"></div>
        </div>

        <div className="mypage_container">
          <label id="mypage_label">찜 목록</label>
          <div className="scrap_list">
            <div className="box1"></div>
            <div className="box2"></div>
          </div>
          <div className="scrap_list">
            <div className="box1"></div>
            <div className="box2"></div>
          </div>
          
        </div>

        <div className="mypage_container">
          <label id="mypage_label">내가 쓴 글</label>
          <span className="mypost">재료나눔 | 배달비 n빵 | 공동구매</span>
          {items.map((item, index) => (
            <div key={index} className="scrap_list">
              <div className="box1">{item.simpleSharingList[0].title}</div>
              <div className="box2">{item.simpleSharingList[1].title}</div>
            </div>
          ))}
        </div>
        
        <div className="mypage_container">
          <label id="mypage_label">캘린더</label>
          <div className="calendar_container">
            <div className="mydate"></div>
            <div className="schedule_container">
              <div className="schedule_list"></div>
              <div className="schedule_list"></div>
              <div className="schedule_list"></div>
              <div className="schedule_list"></div>
            </div>
          </div>
        </div>
      </section>



    </div>
  );
}

export default MyPage;