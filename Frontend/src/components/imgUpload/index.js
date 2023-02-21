import React, { useState } from "react";
import './index.css';

const ImgUpload = () => {
  const [profileImage, setProfileImage] = useState("");
  //const [file,setFile] = useState();

  // 파일 저장
  const onChangeImg = (e) => {
    e.preventDefault();
    setProfileImage(e.target.files[0])
    //setProfileImage(URL.createObjectURL(e.target.files[0]));
  };

  console.log(profileImage)

  return (
    <div>
      <div className="img_preview">
        {profileImage && (
          <img
            alt="sample"
            src={profileImage}
          />
        )}
      </div>

      <div className="imgUpload_btn">
        <input
          name="imgUpload"
          type="file"
          accept="image/*"
          onChange={onChangeImg}
        />
      </div>

    </div>
  );
}

export default ImgUpload;

