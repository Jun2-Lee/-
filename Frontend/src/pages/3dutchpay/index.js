import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import './index.css';
import axios from 'axios'

const { kakao } = window;

function DutchPayPage() {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [showDiv, setShowDiv] = useState(false);
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    //카카오맵 보여주기
    var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(35.229609, 129.089358), //지도의 중심좌표.
      level: 3 //지도의 레벨(확대, 축소 정도)
    };
    var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    axios.get('http://3.36.144.128:8080/api/dutchPay')
      .then(response => {
        setData(response.data);
      })
      .catch(error => console.log(error));
  }, [])

  function handleDetail(id) {
    //setShowDiv(!showDiv)
    setShowDiv(true);
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    axios.get(`http://3.36.144.128:8080/api/dutchPay/${id}`)
        .then(response => {
          setDetail(response.data)
          const container = document.getElementById('map');
          const options = {
            center: new kakao.maps.LatLng(35.229609, 129.089358),
            level: 3
          };
          // 지도를 생성
          const map = new kakao.maps.Map(container, options);
          // 주소-좌표 변환 객체 생성
          const geocoder = new kakao.maps.services.Geocoder();
          // 주소로 좌표를 검색
          geocoder.addressSearch(response.data.address, function (result, status) {

            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              // 결과값으로 받은 위치를 마커로 표시
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords
              });
        
              // 인포윈도우로 장소에 대한 설명 표시
              var infowindow = new kakao.maps.InfoWindow({
                content: `<div style="width:150px; text-align:center; padding:6px 0;">${response.data.store}</div>`
              });
              infowindow.open(map, marker);
        
              // 지도의 중심을 결과값으로 받은 위치로 이동시키기
              map.setCenter(coords);
            }
          })
        })
        .catch(error => console.log(error));      
  }

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

      {data.map((item, index) => (
        <div className="card_container">
          <div key ={index} className="card_dutchpay" onClick={() => handleDetail(item.id)}>
            <div className="foodIcon">
              {item.category === '족발/보쌈' && <img className="f1" src="assets/img/dutchpay/pig_hocks.png"/>}
              {item.category === '찜/탕/찌개' && <img className="f1" src="assets/img/dutchpay/stew.png"/>}
              {item.category === '돈까스/회/일식' && <img className="f1" src="assets/img/dutchpay/japanese_food.png"/>}
              {item.category === '피자' && <img className="f1" src="assets/img/dutchpay/pizza.png"/>}
              {item.category === '고기/구이' && <img className="f1" src="assets/img/dutchpay/meat.png"/>}
              {/*여기에 카테고리 더 추가해야 됨! */}
              <label id="foodName">{item.category}</label>
            </div>
            <div className="card_sub1">
              <div className="title_dutchpay">{item.store}</div>
              <div className="card_sub2">
                <div className="dong_dutchpay">{item.address}</div>
                <div className="deadline_dutchpay">00:03:00</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

    {showDiv && (
      <div className="detail_dutchpay">
        <div className="userInfo_dutchpay">
          <img className="profile_dutchpay" src={detail.profileImage}/>
          <span id="nickName_dutchpay">{detail.nickname} 님</span>
        </div>

        <div className="detail_container"> 
          <div className="storeName_dutchpay">{detail.store}</div>
          <div className="detail_sub1">
            <div className="foodImg_dutchpay">
              {detail.category === '족발/보쌈' && <img className="f1" src="assets/img/dutchpay/pig_hocks.png"/>}
              {detail.category === '찜/탕/찌개' && <img className="f1" src="assets/img/dutchpay/stew.png"/>}
              {detail.category === '돈까스/회/일식' && <img className="f1" src="assets/img/dutchpay/japanese_food.png"/>}
              {detail.category === '피자' && <img className="f1" src="assets/img/dutchpay/pizza.png"/>}
              {detail.category === '고기/구이' && <img className="f1" src="assets/img/dutchpay/meat.png"/>}
            </div>
            <div className="detail_sub2">
              <div className="recruits_dutchpay">{detail.limitMember}명 모집</div>
              <div className="calcCost_dutchpay">{detail.deliveryCost}원/{detail.deliveryCost / detail.limitMember}원</div>
              <div className="countdown_dutchpay">카운트 다운</div>
            </div>
          </div>
          <div className="address_dutchpay">{detail.address}</div>
          <div className="explanation_dutchpay">{detail.content}</div>
        </div>
        <div className="UserHelp_dutchpay">
          <a href="#" id="modify_dutchpay">수정하기</a>
          <a href="#" id="userHelp_dutchpay"> | </a>
          <a href="#" id="delete_dutchpay">삭제하기</a>
        </div>
        <div className="signupDutchpay">
              <input type="submit" className="signup_dutchpay" value="신청하기"></input>
        </div>
      </div>
    )}
     
    <div id="map"></div>
  </div>
  )
}

export default DutchPayPage;