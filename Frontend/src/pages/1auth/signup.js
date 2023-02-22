import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css'
import ImgUpload from "../../components/imgUpload";
import AddressSelect from "../../components/addressSelect";
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();

  // 주소 선택
  const [selectedGu, setSelectedGu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');

  function handleSelectedGu(selectedGuValue) {
    setSelectedGu(selectedGuValue)
    setSignUpDto({
      ...signUpDto,
      gu: selectedGuValue
    })
  }

  function handleSelectedDong(selectedDongValue) {
    setSelectedDong(selectedDongValue)
    setSignUpDto({
      ...signUpDto,
      dong: selectedDongValue
    })
  }

  //이미지 업로드
  const [profileImage, setProfileImage] = useState("");
  const [imgsrc, setImgsrc] = useState("");

  function handleImg(selectedImgValue) {
    setProfileImage(selectedImgValue)
    setImgsrc(URL.createObjectURL(selectedImgValue))
  }

  //axios header 선언
  const headers = {
    'Content-Type': 'multipart/form-data'
  }

  const [signUpDto, setSignUpDto] = useState({
    dong: '',
    email: '',
    gu: '',
    nickname: '',
    password: '',

  });

  const { dong, email, gu, nickname, password} = signUpDto;

  const onChange = (e) => {
    const { value, name } = e.target;
    setSignUpDto({
      ...signUpDto,
      [name]: value
    })
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData()
    form.append('profileImage', profileImage)
    form.append('signUpDto', new Blob([JSON.stringify(signUpDto)], {
      type: "application/json"
    }))

    axios.post("http://3.36.144.128:8080/api/auth/signup", form, {headers})
      .then(function(response) {
        console.log(response)
        navigate('/login')
      }) .catch(function(error) {
        console.log(error)
      })
  }

  return (
    <div className="signup_container">
      <form onSubmit={onSubmit}>
        <div className="ID">
          <label className="form-label">아이디</label>
          <input name='email' onChange={onChange} value={email} className="id"/>
        </div>
        
        <div className="PASSWORD">
          <label className="form-label">비밀번호</label>
          <input name='password' onChange={onChange} value={password} className="password"/>
        </div>

        <div className="PASSWORD_CHECK">
          <label className="form-label">비밀번호 확인</label>
          <input className="password_check"/>
        </div>

        <div className="nick_name">
          <label className="form-label">닉네임</label>
          <input name='nickname' onChange={onChange} value={nickname} className="nickName"/>
          <button type="submit" className="overlap_check">중복 확인</button>
        </div>

        <div className="profile_upload">
          <label className="form-label">프로필 사진</label>
          <ImgUpload onSelectedImg={handleImg} />
        </div>

        <div className="address">
          <label className="form-label">사는 동네</label>
          <AddressSelect onSelectedGu={handleSelectedGu} onSelectedDong={handleSelectedDong}/>
        </div>

        <div className="submit">
          <input type="submit" className="submit_user_info" value="회원가입"></input>
        </div>
      </form> 
    </div>
  )
}

export default Signup;