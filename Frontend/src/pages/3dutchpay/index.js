import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import './index.css';
import axios from 'axios'

const { kakao } = window;

function DutchPayPage() {
  const [data, setData] = useState([]);
  const [detail, setDetail] = useState([]);
  const [showDiv, setShowDiv] = useState(false);
  const [isMine, setIsMine] = useState(false);
  const [id, setId] = useState('')
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
    setId(id)
    const accessToken = localStorage.getItem('accessToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    axios.get(`http://3.36.144.128:8080/api/dutchPay/${id}`)
        .then(response => {
          setDetail(response.data)
          setIsMine(response.data.checkMine)
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

  const handleApplication = (e) => {
    e.preventDefault();
    axios.post(`http://3.36.144.128:8080/api/dutchPay/${id}`)
      .then(response => {
        console.log(response)
        alert("신청 목록은 마이페이지에서 확인하실 수 있습니다.")
      })
      .catch(error => console.log(error))
  }

  const handleDelete = (e) => {
    const accessToken = localStorage.getItem('accessToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    axios.delete(`http://3.36.144.128:8080/api/dutchPay/${id}`) 
      .then(() => {
        alert("삭제되었습니다."); 
        window.location.replace("/dutchpay")
      })
      .catch(err => console.log(err))
  }

  //pagination
  const [page, setPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    console.log(pageNumber)
  } 
  const itemsPerPage = 5;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  //마감일 계산
  const calculateTimeLeft = (deadline) => {
    const targetDate = new Date(deadline);
    const today = new Date();

    const differenceInTime = targetDate.getTime() - today.getTime();
    const differenceInHours = Math.ceil(differenceInTime / (1000 * 3600));

    if (differenceInHours >= 24) {
      const differenceInDays = Math.ceil(differenceInHours / 24);
      return `${differenceInDays}일 후 마감`;
    } else {
      return `${differenceInHours}시간 후 마감`;
    }
  };

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

      {data.slice(startIndex, endIndex).map((item, index) => (
        <div className="card_container">
          <div key ={index} className="card_dutchpay" onClick={() => {handleDetail(item.id); setId(item.id)}}>
            <div className="foodIcon">
              {item.category === '족발/보쌈' && <img className="f1" src="assets/img/dutchpay/pig_hocks.png"/>}
              {item.category === '찜/탕/찌개' && <img className="f1" src="assets/img/dutchpay/stew.png"/>}
              {item.category === '돈까스/회/일식' && <img className="f1" src="assets/img/dutchpay/japanese_food.png"/>}
              {item.category === '피자' && <img className="f1" src="assets/img/dutchpay/pizza.png"/>}
              {item.category === '고기/구이' && <img className="f1" src="assets/img/dutchpay/meat.png"/>}
              {item.category === '야식' && <img className="f1" src="assets/img/dutchpay/midnight.png"/>}
              {item.category === '양식' && <img className="f1" src="assets/img/dutchpay/western.png"/>}
              {item.category === '치킨' && <img className="f1" src="assets/img/dutchpay/chicken.png"/>}
              {item.category === '중식' && <img className="f1" src="assets/img/dutchpay/chinese.png"/>}
              {item.category === '아시안' && <img className="f1" src="assets/img/dutchpay/asian.png"/>}
              {item.category === '백반/죽/국수' && <img className="f1" src="assets/img/dutchpay/rice.png"/>}
              {item.category === '도시락' && <img className="f1" src="assets/img/dutchpay/box_lunch.png"/>}
              {item.category === '분식' && <img className="f1" src="assets/img/dutchpay/flour_based.png"/>}
              {item.category === '카페/디저트' && <img className="f1" src="assets/img/dutchpay/dessert.png"/>}
              {item.category === '패스트푸드' && <img className="f1" src="assets/img/dutchpay/fastfood.png"/>}
              {item.category === '채식' && <img className="f1" src="assets/img/dutchpay/vegetable.png"/>}
              <label id="foodName">{item.category}</label>
            </div>
            <div className="card_sub1">
              <div className="title_dutchpay">{item.store}</div>
              <div className="card_sub2">
                <div className="dong_dutchpay">{item.address}</div>
                <div className="deadline_dutchpay">{calculateTimeLeft(item.deadLine)}</div>
              </div>
            </div>
          </div>
        </div>
      ))}

        <div className='pagination_dutchpay'> 
          <Pagination
              activePage={page}
              itemsCountPerPage={itemsPerPage}
              totalItemsCount={100}
              pageRangeDisplayed={5}
              prevPageText={"‹"}
              nextPageText={"›"}
              onChange={handlePageChange}
          />
        </div>
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
              {detail.category === '야식' && <img className="f1" src="assets/img/dutchpay/midnight.png"/>}
              {detail.category === '양식' && <img className="f1" src="assets/img/dutchpay/western.png"/>}
              {detail.category === '치킨' && <img className="f1" src="assets/img/dutchpay/chicken.png"/>}
              {detail.category === '중식' && <img className="f1" src="assets/img/dutchpay/chinese.png"/>}
              {detail.category === '아시안' && <img className="f1" src="assets/img/dutchpay/asian.png"/>}
              {detail.category === '백반/죽/국수' && <img className="f1" src="assets/img/dutchpay/rice.png"/>}
              {detail.category === '도시락' && <img className="f1" src="assets/img/dutchpay/box_lunch.png"/>}
              {detail.category === '분식' && <img className="f1" src="assets/img/dutchpay/flour_based.png"/>}
              {detail.category === '카페/디저트' && <img className="f1" src="assets/img/dutchpay/dessert.png"/>}
              {detail.category === '패스트푸드' && <img className="f1" src="assets/img/dutchpay/fastfood.png"/>}
              {detail.category === '채식' && <img className="f1" src="assets/img/dutchpay/vegetable.png"/>}
            </div>
            <div className="detail_sub2">
              <div className="recruits_dutchpay">{detail.limitMember}명 모집</div>
              <div className="calcCost_dutchpay">{detail.deliveryCost}원/{detail.deliveryCost / detail.limitMember}원</div>
              <div className="countdown_dutchpay">{calculateTimeLeft(detail.deadLine)}</div>
            </div>
          </div>
          <div className="address_dutchpay">{detail.address}</div>
          <div className="explanation_dutchpay">{detail.content}</div>
        </div>
        {isMine && 
        <div className="UserHelp_dutchpay">
          <span onClick={handleDelete} id="delete_dutchpay">삭제하기</span>
        </div>}
        <div className="signupDutchpay">
            {!isMine && <button type="submit" onClick={handleApplication} className="signup_dutchpay">신청하기</button>}
        </div>
      </div>
    )}
     
    <div id="map"></div>
  </div>
  )
}

export default DutchPayPage;