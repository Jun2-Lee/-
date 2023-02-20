import React, { useEffect, useState } from "react";
import './index.css';

const Profile = () => {
  const [user_id, setUserId] = useState();
  const [nickName, setNickName] = useState();
  const [profileImage, setProfileImage] = useState();

  const getProfile = async () => {
    try {
      // Kakao SDK API를 이용해 사용자 정보 획득
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });
      console.log(data);
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
    <div className="profile_container">
      <div>
        <div className="user_name">
          {nickName}님, 환영합니다!
        </div>
        <div className="user_profile">
          <img src={profileImage} alt="이미지 불러오기 실패"></img>
        </div>
      </div>
    </div>
  );
};

export default Profile;