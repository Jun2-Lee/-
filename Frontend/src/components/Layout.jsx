import React, {useState, useEffect} from "react";
import "./Layout.css";
import {Link, Outlet, useNavigate} from "react-router-dom";
import axios from 'axios'

//import { profileImage, nickName } from "./kakao_login/profile";

function Layout() {
  const [hover, setHover] = useState(false);
  
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();
    axios.post("http://3.36.144.128:8080/api/auth/logout", 
            {
            })
    .then(function(response) {
      console.log(response)
      navigate('/')
    }) .catch(function(error) {
      console.log(error)
    })
  }

  return (
    <>
      <header
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Link to="/">
          <img className="header_logoImg" src="/assets/img/logo.png" />
        </Link>

        <nav>
          <Link className="nav_link" to="/">
            공지사항
          </Link>
          <Link className="nav_link" to="/sharing">
            재료 나눔
          </Link>
          <Link className="nav_link" to="/dutchPay">
            배달비 n빵
          </Link>
          <Link className="nav_link" to="/groupBuying">
            공동구매
          </Link>
          <Link className="nav_link" to="/myPage">
            마이페이지
          </Link>
        </nav>

        <div className="header_profile">
          <img
            className="header_profileImg"
            /*src="/assets/img/default_profile.png"*/
            
          />

          <Link className="profile_nickName" to="/editProfile">
            뭐먹지 님
          </Link>
          <Link className="profile_link" id="mypageLink" to="/myPage">
            마이페이지
          </Link>
          <Link className="profile_link" id="logoutLink" to='/' onClick={handleLogout}>
            로그아웃
          </Link>
          <Link className="profile_link" to="/chatting">
            쪽지
          </Link>
        </div>
      </header>

      <div
        className="hover_area"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {hover === true && (
          <div className="hover">
            <article>
              <Link to="/">공지사항</Link>
            </article>
            <article className="hover_sharing">
              <Link to="/postSharing">나눔글 등록</Link>
              <Link to="/sharing">나눔글 목록</Link>
            </article>
            <article className="hover_dutchPay">
              <Link to="/postDelivery">n빵 등록</Link>
              <Link to="/dutchPay">n빵 목록</Link>
            </article>
            <article className="hover_groupBuying">
              <Link to="/postGroupBuying">공동구매 등록</Link>
              <Link to="/groupBuying">공동구매 목록</Link>
            </article>
            <article className="hover_myPage">
              <Link to="/">내 프로필</Link>
              <Link to="/">쪽지함</Link>
              <Link to="/myWriting">내가 쓴 글</Link>
              <Link to="/">참여 목록</Link>
              <Link to="/">찜 목록</Link>
              <Link to="/">캘린더</Link>
            </article>
          </div>
        )}
      </div>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
