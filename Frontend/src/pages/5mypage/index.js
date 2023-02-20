import React from "react";
import CategoryBar2 from "../../components/categoryBar2";
import "./index.css";

function MyPage() {
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