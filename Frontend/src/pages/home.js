import React from "react";
import "./home.css";
import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="home_container">
      <div className="pictureArea">picture area</div>
      <Link to="/sharing" className="home_link">
        <button className="home_sharingBtn">
          <h1 className="home_pagemoving_head">재료나눔</h1>
          <h2 className="home_pagemoving_body">
            냉장고 속 남은 재료 버리지마시고 나누세요!
          </h2>
          <img
            className="home_pagemoving_img"
            id="sharingPicture"
            src="assets/img/sharing.png"
          ></img>
        </button>
      </Link>
      <Link to="/dutchpay" className="home_link">
        <button className="home_dutchPayBtn">
          <h1 className="home_pagemoving_head">배달비 n빵</h1>
          <h2 className="home_pagemoving_body">
            배달비 부담된다면 주변사람들과 n빵 하세요!
          </h2>
          <img
            className="home_pagemoving_img"
            id="dutchPayPicture"
            src="assets/img/dutchpay.png"
          ></img>
        </button>
      </Link>
      <Link to="/groupbuying" className="home_link">
        <button className="home_groupBuyingBtn">
          <h1 className="home_pagemoving_head">공동구매</h1>
          <h2 className="home_pagemoving_body">
            혼자 사기에 양이 많다면 공동 구매하세요!
          </h2>
          <img
            className="home_pagemoving_img"
            id="groupBuyingPicture"
            src="assets/img/groupBuying.png"
          ></img>
        </button>
      </Link>
    </div>
  );
}

export default Home;
