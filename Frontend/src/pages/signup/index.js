import React from 'react';
import { useState } from 'react';
import './signup.css'

function Signup() {
  const [nickName, setNickName] = useState("");
  
  const handleChange = ({ target: { value } }) => setNickName(value);

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="ID">
          <label className="form-label">아이디</label>
          <input className="id"/>
        </div>
        
        <div className="PASSWORD">
          <label className="form-label">비밀번호</label>
          <input className="password"/>
        </div>

        <div className="PASSWORD_CHECK">
          <label className="form-label">비밀번호 확인</label>
          <input className="password_check"/>
        </div>

        <div className="nick_name">
          <label className="form-label">닉네임</label>
          <input 
            className="nickName"
            value={nickName}
            onChange={handleChange}
            />
          <button type="submit" className="overlap_check">중복 확인</button>
        </div>

        <div className="profile_upload">
          <label className="form-label">프로필 사진</label>
          <input 
            className="profileUpload"
            />
          {/*<input type="file" accept="image/*"></input>*/}
        </div>

        <div className="address">
          <label className="form-label">사는 동네</label>
          <select className="gu">
            <option value="">구</option>
            <option value="금정">금정구</option>
            <option value="해운대">해운대구</option>
            <option value="동래">동래구</option>
            <option value="연제">연제구</option>
          </select>
          <select className="dong">
          <option value="">동</option>
            <option value="금정">장전동</option>
            <option value="해운대">부곡동</option>
            <option value="동래">구서동</option>
            <option value="연제">노포동</option>
          </select>
        </div>
        
        <div className="submit">
          <input type="submit" className="submit_user_info" value="회원가입"></input>
        </div>
      </form>
    </div>
  )
}

export default Signup;