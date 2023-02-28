import React from 'react';
import { useState } from 'react';
import './initial_info.css'
import ImgUpload from "../../components/imgUpload";
import AddressSelect from "../../components/addressSelect";

function InitialInfo() {
<<<<<<< HEAD:Frontend/src/pages/initial_info/initial_info.js

<<<<<<< HEAD
  const getInfo = document.getElementById("getInfo");
=======
 const getInfo = document.getElementById("getInfo");
>>>>>>> da709f71bf34f9492f8a62bd5cd91a312e35d739
=======
  /*const getInfo = document.getElementById("getInfo");
>>>>>>> ef15415eb527d9dd0695d95a6396edc67df4b115:Frontend/src/pages/1auth/initial_info.js

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
  };*/

  return (
    <div className='initialInfo_container'>
      <form id="getInfo" /*onSubmit={handleSubmit}*/>
        <div className="nick_name">
          <label className="form-label">닉네임</label>
          <input 
            className="nickName"
            /*value={nickName}
            onChange={handleChange}*/
            />
          <button type="submit" className="overlap_check">중복 확인</button>
        </div>

        <div className="profile_upload">
          <label className="form-label">프로필 사진</label>
          
          <div className="profileUpload">
            <ImgUpload/>
          </div>
          
        </div>

        <div className="address">
          <label className="form-label">사는 동네</label>
          <AddressSelect/>
        </div>
        <div className="submit">
          <input type="submit" className="submit_user_info" value="저장하기" /*onClick={onSubmitHandler}*/></input>
        </div>
      </form>
    </div>
  )
}

export default InitialInfo;