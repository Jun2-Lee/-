import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./myWriting.css";
import "./myWritingList.css";
import CategoryBar2 from "../../components/categoryBar2";
import Pagination from 'react-js-pagination';
import axios from 'axios';

function MyWriting() {
  const [mySharing, setSharing] = useState('');
  const [myDutch, setDutchpay] = useState(null); // 기본값을 null로 설정합니다.
  const [myGroup, setGroup] = useState('');
  const { kakao } = window;

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    axios.get('http://3.36.144.128:8080/api/mypage/mySharing') 
      .then(res => {
        setSharing(res.data.map(item => {
          const date = new Date(item.postTime);
          const formattedDate = date.toLocaleDateString("ko-KR");
          return { ...item, postTime: formattedDate };
        }))
      })
      .catch(err => console.log(err));

    axios.get('http://3.36.144.128:8080/api/mypage/myDutchPay') 
      .then(res => {
        setDutchpay(res.data.map(item => {
          const date = new Date(item.postTime);
          const formattedDate = date.toLocaleDateString("ko-KR");
          return { ...item, postTime: formattedDate };
        }));
      })
      .catch(err => console.log(err));

    axios.get('http://3.36.144.128:8080/api/mypage/myGroupBuying') 
      .then(res => {
        setGroup(res.data.map(item => {
          const date = new Date(item.postTime);
          const formattedDate = date.toLocaleDateString("ko-KR");
          return { ...item, postTime: formattedDate };
        }));
      })
      .catch(err => console.log(err));
  }, []);

  //수정된 부분
  useEffect(() => {
    if (myDutch !== null) {
      showMaps(myDutch);
    }
  });

  const [isSharingClicked, setSharingClicked] = useState(true);
  const [isDutchpayClicked, setDutchpayClicked] = useState(false);
  const [isGroupbuyingClicked, setGroupClicked] = useState(false);

  //지도 보여주기
  const showMaps = (data) => {
    const addresses = data.map(item => item.address);
    const containers = document.getElementsByClassName('item_map');
    Array.from(containers).forEach((container, index) => {
      const options = {
        center: new kakao.maps.LatLng(35.229609, 129.089358),
        level: 3
      };
      const map = new kakao.maps.Map(container, options);
      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(addresses[index], function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
          var marker = new kakao.maps.Marker({
            map: map,
            position: coords
          });

          map.setCenter(coords);
        }
      });
    });
  };

  //pagination
  const [page, setPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    console.log(pageNumber)
  } 

  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

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
    <>
      <div className="myWriting_title">내가 쓴 글</div>
      <div className="myWriting_body">
        <section className="shortcutBar">
          <CategoryBar2 />
        </section>

        <section className="nav_myWriting">
          <span className="item">
            <span onClick={() => {setSharingClicked(true); setDutchpayClicked(false); setGroupClicked(false);}}
            style={{ color: isSharingClicked ? "black" : "#737373" }}>재료나눔</span>
            <span onClick={() => {setSharingClicked(false); setDutchpayClicked(true); setGroupClicked(false);}}
            style={{ color: isDutchpayClicked ? "black" : "#737373" }}>배달비 n빵</span>
            <span onClick={() => {setSharingClicked(false); setDutchpayClicked(false); setGroupClicked(true);}}
            style={{ color: isGroupbuyingClicked ? "black" : "#737373" }}>공동구매</span>
          </span>
        </section>

        <section className="myWritingList">
          <div className='myWriting_list'>
            {isSharingClicked && mySharing && mySharing.slice(startIndex, endIndex).map((item, index) => (
              <div key={index}>
                <Link to={`/sharing/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
                  <div className="item">
                    <img className='item_image' src={item.image} />
                    <div className='item_nickname'>{item.nickname}</div>
                    <div className='item_date'>{item.postTime}</div>
                    <div className='item_title'>{item.title}</div>
                    <div className='item_area'>{item.dong}</div>
                    <div className='item_deadline'>{calculateTimeLeft(item.deadLine)}</div>
                  </div>
                </Link>
              </div>
            ))}

            {isDutchpayClicked && myDutch && myDutch.slice(startIndex, endIndex).map((item, index) => (
              <div key={index}>
                <div className="item">
                  <div className='item_map'></div>
                  <div className='item_nickname'>{item.nickname}</div>
                  <div className='item_date'>{item.postTime}</div>
                  <div className='item_title'>{item.store}</div>
                  <div className='item_address'>{item.address}</div>
                </div>
              </div>
            ))}

            {isGroupbuyingClicked && myGroup && myGroup.slice(startIndex, endIndex).map((item, index) => (
              <div key={index}>
                <Link to={`/groupBuying/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
                  <div className="item">
                    <img className='item_image' src={item.image} />
                    <div className='item_nickname'>{item.nickname}</div>
                    <div className='item_date'>{item.postTime}</div>
                    <div className='item_title'>{item.title}</div>
                    <div className='item_area'>{item.dong}</div>
                    <div className='item_deadline'>{calculateTimeLeft(item.deadLine)}</div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </section>

        <div className='myWriting_pagination'> 
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
    </>
  );
}

export default MyWriting;
