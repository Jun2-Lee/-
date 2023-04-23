import React, { useState, useEffect } from "react";
import './index.css';

function ImgUpload2({onSelectedImg, image}) {
    const [img, setImg] = useState(null);
    const [imgsrc, setImgsrc] = useState(null);

    useEffect(() => {
      setImg(image);
      setImgsrc(image);
    }, [image]);

    function onChangeImg(e) {
      const file = e.target.files[0];
      setImg(file);
      setImgsrc(URL.createObjectURL(file));
      onSelectedImg(file);
    };

  return (
    <div>
      <div className="img_preview">
        {img && (
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

export default ImgUpload2;
