
import './login.css';
import {React, useState} from 'react';
import {BrowserRouter as Router, Route,  Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Login() {
  const REST_API_KEY = "e14465c8dab22961a692f89cdcfb540b";
  const REDIRECT_URI = "http://localhost:3000/oauth/callback/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const [loginInput, setLoginInput] = useState({
    email: '',
    password: ''
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setLoginInput({
      ...loginInput,
      [name]: value
    })
  };

  const { email, password } = loginInput; // 비구조화 할당을 통해 값 추출

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("http://3.36.144.128:8080/api/auth/signin", 
            {
              email: email,
              password: password
            }, 
            {
              headers: { 'Content-Type': 'application/json'}
            })
    .then(onLoginSuccess) 
    .catch(function(error) {
      console.log(error)
    })
  }

  function onSilentRefresh() {
    //local storage에 저장된 토큰 값 가져오기
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    axios.post("http://3.36.144.128:8080/api/auth/reissue", 
            {
              accessToken: accessToken,
              refreshToken: refreshToken
            }, 
            {
              headers: { 'Content-Type': 'application/json'}
            })
    .then(onLoginSuccess) 
    .catch(function(error) {
      console.log(error)
    })
  }
  
  const JWT_EXPIRY_TIME = 0.01 * 3600 * 1000; // 만료 시간 (15분 밀리 초로 표현)

  function onLoginSuccess(response) {
      const { accessToken, refreshToken } = response.data;
      // local storage에 at, rt 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // accessToken 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // accessToken 만료하기 1분 전에 로그인 연장
      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
      navigate('/')
      console.log(response)
  }

  return (
    <div className='login_container'>
      <div>
        <div className="GetID">
        <label id="getID">아이디</label>
        <br></br>
        <input name='email' onChange={onChange} value={email} className="getID"/>
        </div>

        <div className="GetPW">
          <label id="getPW">비밀번호</label>
          <br></br>
          <input name='password' onChange={onChange} value={password} className="getPW"/>
        </div>

        <div className="UserLogin">
          <button type="button" className="userLogin" onClick={handleLogin}>로그인</button>
        </div>

        <div className="UserHelp">
          <a href="/signup" id="userSignUp">회원가입</a>
        </div>

        <div className="kakaoLogin">
          <Link to = {KAKAO_AUTH_URL}>
            <button className="KAKAO">카카오로 로그인</button>
          </Link>
        </div>

      </div>
    </div>
  );
  } 