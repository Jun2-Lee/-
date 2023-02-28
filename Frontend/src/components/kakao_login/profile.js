import React, { useEffect, useState } from "react";
import './profile.css';

const Profile = () => {
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();

  //let a = document.querySelector("header_profileImg");
  //console.log(a);

  const getProfile = async () => {
    // 수정
    /*let data = await window.Kakao.API.request({
      url: "/v2/user/me",
    })*/

    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      })
        .then(function(response) {
          console.log(response);
          console.log("성공");
        })
        .catch(function(error) {
          console.error(error);
          console.log("실패");
        });
      
      //try문 안에 변수 data 선언하면 scope 때문에 인식 못함
      data = await window.Kakao.API.request({
        url: "/v2/user/me",
      })

      // 사용자 정보 변수에 저장
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div className="showProfile">
      {user_id}
      <h3>{nickName}</h3>
      <img src={profileImage} />
      
    </div>
  );
};

export default Profile;

