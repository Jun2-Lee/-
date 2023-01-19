import React, { useState, useRef } from "react";
import './index.css';

export default function ImgUpload() {
  const [fileImage, setFileImage] = useState("");

  // 파일 저장
  const saveFileImage = (e) => {
    setFileImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <div>
      <div className="img_preview">
        {fileImage && (
          <img
            alt="sample"
            src={fileImage}
          />
        )}
      </div>

      <div className="imgUpload_btn">
        <input
          name="imgUpload"
          type="file"
          accept="image/*"
          onChange={saveFileImage}
        />
      </div>

    </div>
  );
}