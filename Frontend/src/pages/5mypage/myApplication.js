import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./myWriting.css";
import "./myWritingList.css";
import ShortcutBar from "../../components/shortcutBar";
import Pagination from '../../components/pagination';
import axios from 'axios';

export default function MyApplication() {
  const [myDutch, setDutchpay] = useState('');
  const [myGroup, setGroup] = useState('');
  const { kakao } = window;
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    axios.get('http://3.36.144.128:8080​/api​/mypage​/participantingDutchPay') 
      .then(res => {
        setDutchpay(res.data.map(item => {
          const date = new Date(item.postTime);
          const formattedDate = date.toLocaleDateString("ko-KR");
          return { ...item, postTime: formattedDate };
        }));
        console.log(res.data)
        res.data.map(item => {
          const container = document.getElementsByClassName('item_image');
          const options = {
            center: new kakao.maps.LatLng(35.229609, 129.089358),
            level: 3
          };
          // 지도를 생성
          const map = new kakao.maps.Map(container, options);
          // 주소-좌표 변환 객체 생성
          const geocoder = new kakao.maps.services.Geocoder();
          // 주소로 좌표를 검색
          geocoder.addressSearch(item.address, function (result, status) {
            // 정상적으로 검색이 완료됐으면 
            if (status === kakao.maps.services.Status.OK) {
              var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
              // 결과값으로 받은 위치를 마커로 표시
              var marker = new kakao.maps.Marker({
                map: map,
                position: coords
              });
        
              //infowindow.open(map, marker);
        
              // 지도의 중심을 결과값으로 받은 위치로 이동시키기
              map.setCenter(coords);
            }
          });
        });
      })
      .catch(err => console.log(err));

    axios.get('http://3.36.144.128:8080/api/mypage/participantingGroupBuying') 
      .then(res => {
        setGroup(res.data.map(item => {
          const date = new Date(item.postTime);
          const formattedDate = date.toLocaleDateString("ko-KR");
          return { ...item, postTime: formattedDate };
        }));
      })
      .catch(err => console.log(err));
  })

  const [isDutchpayClicked, setDutchpayClicked] = useState(true);
  const [isGroupbuyingClicked, setGroupClicked] = useState(false);

  return (
    <>
      <div className="myWriting_title">신청 목록</div>
      <div className="myWriting_body">
        <section className="shortcutBar">
          <ShortcutBar />
        </section>

        <section className="nav_myWriting">
          <span className="item">
            <span onClick={() => {setDutchpayClicked(true); setGroupClicked(false);}}
            style={{ color: isDutchpayClicked ? "black" : "#737373" }}>배달비 n빵</span>
            <span onClick={() => {setDutchpayClicked(false); setGroupClicked(true);}}
            style={{ color: isGroupbuyingClicked ? "black" : "#737373" }}>공동구매</span>
          </span>
        </section>

        <section className="myWritingList">
          <div className='myWriting_list'>
            {isDutchpayClicked && myDutch && myDutch.map((item, index) => (
              <div key={index}>
                <div className="item">
                  <div className='item_image'>이미지</div>
                  <div className='item_nickname'>{item.nickname}</div>
                  <div className='item_date'>{item.postTime}</div>
                  <div className='item_title'>{item.store}</div>
                  <div className='item_area'>{item.address}</div>
                  <div className='item_deadline'>0일 후 마감</div>
                </div>
              </div>
            ))}

            {isGroupbuyingClicked && myGroup && myGroup.map((item, index) => (
              <div key={index}>
                <Link to={`/groupBuying/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
                  <div className="item">
                    <img className='item_image' src={item.image} />
                    <div className='item_nickname'>{item.nickname}</div>
                    <div className='item_date'>{item.postTime}</div>
                    <div className='item_title'>{item.title}</div>
                    <div className='item_area'>{item.dong}</div>
                    <div className='item_deadline'>0일 후 마감</div>
                  </div>
                </Link>
              </div>
            ))}

            <div className='myWriting_pagination'> 
              <Pagination /> 
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
