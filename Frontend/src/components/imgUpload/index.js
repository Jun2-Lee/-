import React, { useState } from "react";
import './index.css';

function ImgUpload({onSelectedImg}) {
  const [profileImage, setProfileImage] = useState("");
  const [imgsrc, setImgsrc] = useState("");

  function onChangeImg(e) {
    setProfileImage(e.target.files[0]) //프로필 이미지
    setImgsrc(URL.createObjectURL(e.target.files[0])); //이미지 미리보기
    onSelectedImg(e.target.files[0])
  };

  return (
    <div>
      <div className="img_preview">
        {profileImage && (
          <img
            alt="sample"
            src={imgsrc}
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

