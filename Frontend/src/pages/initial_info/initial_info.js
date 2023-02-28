import React from 'react';
import { useState } from 'react';
import './initial_info.css';
import axios from 'axios';

function InitialInfo() {

<<<<<<< HEAD
  const getInfo = document.getElementById("getInfo");
=======
 const getInfo = document.getElementById("getInfo");
>>>>>>> da709f71bf34f9492f8a62bd5cd91a312e35d739

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const nickName_linkage = document.getElementsByClassName("nickName_linkage");
    const gu = document.getElementsByClassName("gu");
    const dong = document.getElementsByClassName("dong");

    formData.append("nickName_linkage", nickName_linkage);
    formData.append("gu", gu);
    formData.append("dong", dong);

    fetch("http://3.36.144.128:8080/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: new FormData(getInfo),
    })
      .then((response) => {
        if (response.ok === true) {
          return response.json();
        }
        throw new Error("에러 발생");
      })
      .catch((error) => {
        alert(error);
      })
      .then((data) => {
        console.log(data);
      });
  };


  const [nickName, setNickName] = useState("");
  
  const handleChange = ({ target: { value } }) => setNickName(value);

  const nickName_linkage = document.getElementsByClassName("nickName_linkage");
    const gu = document.getElementsByClassName("gu");
    const dong = document.getElementsByClassName("dong");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      nickName_linkage,
      gu,
      dong,
    });
  };

  //파일 미리 볼 url을 저장해줄 state
  const [fileImage, setFileImage] = useState("");

  // 파일 저장
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  // 파일 삭제
  const deleteFileImage = () => {
    URL.revokeObjectURL(fileImage);
    setFileImage("");
  };

  return (
    <div>
      <form id="getInfo" onSubmit={handleSubmit}>
        <div className="nick_name">
          <label className="form-label">닉네임</label>
          {/*nickName의 margin-top을 바꾸면 signup 페이지(1-3)에도 영향이 가서 className 다르게 설정*/}
          <input 
            className="nickName_linkage"
            value={nickName}
            onChange={handleChange}
            />
          <button type="submit" className="overlap_check">중복 확인</button>
        </div>

        <div className="profile_upload">
          <label className="form-label">프로필 사진</label>
          <div className="profileUpload"></div>
          <input type="file" accept="image/*" hidden={true} onChange={saveFileImage}></input>  
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
          <input type="submit" className="submit_user_info" value="저장하기" onClick={onSubmitHandler}></input>
        </div>
      </form>
    </div>
  )
}

export default InitialInfo;