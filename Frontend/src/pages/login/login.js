import GoogleButton from '../../components/googlecmp';
import './login.css';



function Login(){

  return (
    <div>
      <div className="GetID">
      <label id="getID">아이디</label>
      <br></br>
      <input className="getID"/>
      </div>

      <div className="GetPW">
        <label>비밀번호</label>
        <br></br>
        <input className="getPW"/>
      </div>

      <div className="UserLogin">
        <button type="submit" className="userLogin">로그인</button>
      </div>

      <div className="UserHelp">
        <a href="#" id="findPW">비밀번호 찾기</a>
        <a href="#" id="userHelp"> | </a>
        <a href="#" id="userSignUp">회원가입</a>
      </div>

      <div className="naverLogin">
        <button className="NAVER">네이버로 로그인</button>
      </div>

      <div className="kakaoLogin">
        <button className="KAKAO">카카오로 로그인</button>
      </div>

      
      <div className='googleLogin'>
           <GoogleButton/>
      </div>
     
    </div>
  );
}


export default Login;
