import React, {useState, useEffect} from "react";
import "./Layout.css";
import ProfileGoogle from "./userInfo";
import {Link, Outlet, useNavigate} from "react-router-dom";
import axios from 'axios'

//import { profileImage, nickName } from "./kakao_login/profile";


function Layout() {
  const [hover, setHover] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('refreshToken') === 'null' ? false : true);
  
  const navigate = useNavigate();

  useEffect(() => {
    LoginCheck();
  });

  const LoginCheck = () => {
    setIsLoggedIn(localStorage.getItem('refreshToken') === 'null' ? false : true);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    axios.post("http://3.36.144.128:8080/api/auth/logout", 
            {
            })
    .then(function(response) {
      console.log(response);
      
      localStorage.setItem('accessToken', 'null');
      localStorage.setItem('refreshToken', 'null');

      LoginCheck();
      navigate('/');
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

          <div>
                {isLoggedIn ? (
                  <div>
                  <Link className="profile_nickName" to="/editProfile">
                  이름
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
                ) : (
                  <p>로그인을 해주세요.</p>
                )}
              </div>
          {/*           
          <Link className="profile_nickName" to="/editProfile">
            이름
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
          */}
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
