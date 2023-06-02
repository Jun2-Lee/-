import React from "react";
import "./home.css";
import {Link} from "react-router-dom";

function Home() {
  return (
    <div className="home_container">
      <div className="pictureArea">
        <strong>🐱나옹🐱</strong>은 어떤 플랫폼인가요?
        <br></br>
        나옹(나눠주세옹)은 1인 가구를 위한 재료 나눔, 배달비 n빵, 공동구매를 지원하는 플랫폼입니다.
        <br></br>
        💸 부담스러운 음식 배달비를 함께 나누어 낼 수 있습니다.
        <br></br>
        🥔 너무 많은 재료를 사서 버리게 될 때, 따뜻한 마음으로 나눌 수 있습니다.
        <br></br>
        🥕 재료를 사고 싶지만 작은 양은 팔지 않을 때, 공동 구매로 따뜻한 마음을 표현할 수 있습니다.
      </div>
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
