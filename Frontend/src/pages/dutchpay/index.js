import React, { useEffect } from "react";
import './index.css';

const { kakao } = window;

function DutchPayPage() {
  /*useEffect(() => {
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(35.229609, 129.089358), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
  }, [])*/

  return (
    <div className='dutch'>
      <div className="list_dutchpay">
        <select className="category_dutchpay">
          <option value="">카테고리</option>
          <option value="족발·보쌈">족발·보쌈</option>
          <option value="찜·탕·찌개">찜·탕·찌개</option>
          <option value="돈까스·회·일식">돈까스·회·일식</option>
          <option value="피자">피자</option>
          <option value="고기·구이">고기·구이</option>
        </select>

        <div className="card_dutchpay">
          <div className="foodIcon">
            <img className="f1" src="assets/img/dutchpay/족발,보쌈.png"/>
            <label id="foodName">족발</label>
          </div>
          <div className="card_sub1">
            <div className="title_dutchpay">제목</div>
            <div className="card_sub2">
              <div className="dong_dutchpay">장전동</div>
              <div className="deadline_dutchpay">00:03:00</div>
            </div>
          </div>
        </div>

        <div className="card_dutchpay">
          <div className="foodIcon">
            <img className="f2" src="assets/img/dutchpay/찜,탕,찌개.png"/>
            <label id="foodName">찌개</label>
          </div>
          <div className="card_sub1">
            <div className="title_dutchpay">제목</div>
            <div className="card_sub2">
              <div className="dong_dutchpay">장전동</div>
              <div className="deadline_dutchpay">00:03:00</div>
            </div>
          </div>
        </div>

        <div className="card_dutchpay">
          <div className="foodIcon">
            <img className="f3" src="assets/img/dutchpay/돈까스,회,일식.png"/>
            <label id="foodName">일식</label>
          </div>
          <div className="card_sub1">
            <div className="title_dutchpay">제목</div>
            <div className="card_sub2">
              <div className="dong_dutchpay">장전동</div>
              <div className="deadline_dutchpay">00:03:00</div>
            </div>
          </div>
        </div>

        <div className="card_dutchpay">
          <div className="foodIcon">
            <img className="f4" src="assets/img/dutchpay/피자.png"/>
            <label id="foodName">피자</label>
          </div>
          <div className="card_sub1">
            <div className="title_dutchpay">제목</div>
            <div className="card_sub2">
              <div className="dong_dutchpay">장전동</div>
              <div className="deadline_dutchpay">00:03:00</div>
            </div>
          </div>
        </div>

        <div className="card_dutchpay">
          <div className="foodIcon">
            <img className="f5" src="assets/img/dutchpay/고기,구이.png"/>
            <label id="foodName">고기/구이</label>
          </div>
          <div className="card_sub1">
            <div className="title_dutchpay">제목</div>
            <div className="card_sub2">
              <div className="dong_dutchpay">장전동</div>
              <div className="deadline_dutchpay">00:03:00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="detail_dutchpay">
        <div className="userInfo_dutchpay">
          <img className="profile_dutchpay" src="assets/img/default_profile.png"/>
          <span id="nickName_dutchpay">뭐먹지님</span>
        </div>
        <div className="storeName_dutchpay">매장 이름</div>
        <div className="detail_sub1">
          <div className="foodImg_dutchpay">
            <img src="assets/img/dutchpay/돈까스,회,일식.png"/>
          </div>
          <div className="detail_sub2">
            <div className="recruits_dutchpay">n명 모집</div>
            <div className="calcCost_dutchpay"></div>
            <div className="countdown_dutchpay">카운트 다운</div>
          </div>
        </div>
        <div className="address_dutchpay">00시 00구 00동 000호</div>
        <div className="explanation_dutchpay"></div>
        <div className="UserHelp_dutchpay">
          <a href="#" id="modify_dutchpay">수정하기</a>
          <a href="#" id="userHelp_dutchpay"> | </a>
          <a href="#" id="delete_dutchpay">삭제하기</a>
        </div>
        <div className="signupDutchpay">
              <input type="submit" className="signup_dutchpay" value="신청하기"></input>
        </div>
      </div>

      <div id="map"></div>
    </div>
  )
}

export default DutchPayPage;