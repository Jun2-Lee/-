import React, {useState, useEffect} from "react";
import "./Layout.css";
import {Link, Outlet, useNavigate} from "react-router-dom";
import axios from 'axios'

function Layout() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('refreshToken') === 'null' ? false : true);
  
  const navigate = useNavigate();
  const [image, setImage] = useState('');
  const [nickname, setNickname] = useState('');

  const LoginCheck = () => {
    setIsLoggedIn(localStorage.getItem('refreshToken') === 'null' ? false : true);
  };

  useEffect(() => {
    LoginCheck();
    if (isLoggedIn) {
      const accessToken = localStorage.getItem('accessToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      axios.get('http://3.36.144.128:8080/api/mypage')
        .then((res) => {
          console.log(res.data)
          setImage(res.data.image);
          setNickname(res.data.nickname);
        })
        .catch((err) => console.log(err))
    }
  }); // isLoggedIn 변경 시에만 useEffect 내부 코드 실행

  const handleLogout = (e) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios.post("http://3.36.144.128:8080/api/auth/logout")
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
      <header>
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
        
        

          <div>
            {isLoggedIn ? (
              <div className="header_profile">
                <img
                  className="header_profileImg"
                  src={image}
                />
                <Link className="profile_nickName" to="/editProfile">
                  {nickname} 님
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
            ) : 
            (
              <div className="header_profile_2">
                <Link className="profile_link_2" id="signupLink" to="/signup">
                  회원가입
                </Link>
                <Link className="profile_link_2" id="loginLink" to='/login' style={{marginLeft: '1rem'}}>
                  로그인
                </Link>
              </div>
            )}

        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
