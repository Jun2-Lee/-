
import './login.css';
import {React, useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

export default function Login() {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const [loginInput, setLoginInput] = useState({
    email: '',
    password: ''
  });

  const onChange = (e) => {
    const { value, name } = e.target;
  
    setLoginInput({
      ...loginInput,
      [name]: value
    });
  };

  const { email, password } = loginInput; // 비구조화 할당을 통해 값 추출

  const getLoginInfo = () => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    return { accessToken, refreshToken }
  }

  // 컴포넌트에서 로그인 정보를 가져와 상태값을 업데이트하는 useEffect 훅
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);

  useEffect(() => {
    const { accessToken, refreshToken } = getLoginInfo();
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  }, []);

  const handleLogin = (e) => {
    //e.preventDefault();
    if (email === '') alert("아이디를 입력해주세요.")
    else if (password === '') alert("비밀번호를 입력해주세요.")
    else {
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
        if (error.response.status == 400 || error.response.status == 404) alert("아이디 또는 비밀번호를 확인해주세요.")
        console.log(error) 
      })
    }
  }

  function onSilentRefresh() {
    //local storage에 저장된 토큰 값 가져오기
    let isRefreshing = false;

  // 이전에 실행된 갱신 중인 경우 중복 실행 방지
    if (onSilentRefresh.timeoutId) {
      clearTimeout(onSilentRefresh.timeoutId);
      isRefreshing = true;
    }
    const accessToken = localStorage.getItem('accessToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
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
    .finally(() => {
      // 갱신이 완료된 경우에만 다시 자동 갱신 실행
      if (!isRefreshing) {
        onSilentRefresh.timeoutId = setTimeout(
          onSilentRefresh,
          JWT_EXPIRY_TIME - 60000
        );
      }
      })
  }
  onSilentRefresh.timeoutId = null;

  const JWT_EXPIRY_TIME = 0.1 * 3600 * 1000; // 만료 시간 (15분 밀리 초로 표현)

  const navigate = useNavigate();
  function onLoginSuccess(response) {
      const { accessToken, refreshToken } = response.data;
      // local storage에 at, rt 저장
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
      console.log(accessToken)
      console.log(refreshToken)

      // accessToken 설정
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

      // accessToken 만료하기 1분 전에 로그인 연장
      setTimeout(onSilentRefresh, JWT_EXPIRY_TIME - 60000);
      console.log(response)
      navigate('/')
  }

  return (
    <div className='login_container'>
      <form onSubmit={handleLogin}>
        <div className="GetID">
        <label id="getID">아이디</label>
        <br></br>
        <input name='email' onChange={onChange} value={email} className="getID" onKeyPress={handleKeyPress}/>
        </div>

        <div className="GetPW">
          <label id="getPW">비밀번호</label>
          <br></br>
          <input name='password' onChange={onChange} value={password} className="getPW" type="password" onKeyPress={handleKeyPress}/>
        </div>

        <div className="UserLogin">
          <button type="button" className="userLogin" onClick={handleLogin}>로그인</button>
        </div>

        <div className="UserHelp">
          <a href="/signup" id="userSignUp">회원가입</a>
        </div>
        {/*
        <div className="kakaoLogin">
          <Link to = {KAKAO_AUTH_URL}>
            <button className="KAKAO">카카오로 로그인</button>
          </Link>
        </div>
        */}
      </form>
    </div>
  );
  } 