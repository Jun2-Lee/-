import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css'
import ImgUpload from "../../components/imgUpload";
import AddressSelect from "../../components/addressSelect";
import axios from 'axios';

function Signup() {
  const navigate = useNavigate();
  const [password_check, setPWCheck] = useState('')

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
  const [profileImage, setProfileImage] = useState('');
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
    email: '',
    password: '',
    nickname: '',
    gu: '',
    dong: '',
  });

  const { email, password, nickname, gu, dong } = signUpDto;

  const onChange = (e) => {
    const { value, name } = e.target;
    setSignUpDto({
      ...signUpDto,
      [name]: value
    })
  };
  console.log(password_check)
  const onSubmit = (e) => {
    e.preventDefault();

    if (email.length === 0) {
      alert("아이디를 입력해주세요")
    }
    else if (password.length === 0) {
      alert("비밀번호를 입력해주세요")
    }
    else if (password !== password_check) {
      alert("비밀번호가 일치하지 않습니다")
    }
    else if (nickname.length === 0) {
      alert("닉네임을 입력해주세요")
    }
    else if (profileImage.length === 0) {
      alert("프로필 사진을 업로드 해주세요")
    }
    else if (gu.length === 0) {
      alert("사는 동네를 선택해주세요")
    }
    else if (dong.length === 0) {
      alert("동을 선택해주세요")
    }
    else {
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
          console.log(profileImage)
          console.log(error)
        })
    }
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
          <input name="password_check" onChange={e => setPWCheck(e.target.value)} value={password_check} className="password"/>
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