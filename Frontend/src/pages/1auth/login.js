
import './login.css';
import {useState} from 'react';
import {BrowserRouter as Router, Route,  Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function Login() {
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
    .then(function(response) {
      console.log(response)
      navigate('/')
    }) .catch(function(error) {
      console.log(error)
    })
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
          <label>비밀번호</label>
          <br></br>
          <input name='password' onChange={onChange} value={password} className="getPW"/>
        </div>

        <div className="UserLogin">
          <button type="button" className="userLogin" onClick={handleLogin}>로그인</button>
        </div>

        <div className="UserHelp">
          <a href="#" id="findPW">비밀번호 찾기</a>
          <a href="#" id="userHelp"> | </a>
          <a href="/signup" id="userSignUp">회원가입</a>
        </div>

        <div className="naverLogin">
          <button className="NAVER">네이버로 로그인</button>
        </div>

        <div className="kakaoLogin">
          <Link to = {KAKAO_AUTH_URL}>
            <button className="KAKAO">카카오로 로그인</button>
          </Link>
        </div>

        <div className="googleLogin">
          <button className="GOOGLE">구글로 로그인</button>
        </div>
      </div>
    </div>
  );
} 

export default Login;
