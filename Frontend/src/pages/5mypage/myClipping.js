import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./myWriting.css";
import "./myWritingList.css";
import ShortcutBar from "../../components/shortcutBar";
import Pagination from '../../components/pagination';
import axios from 'axios';

export default function MyClipping() {
  const [mySharing, setSharing] = useState('');
  const [myGroup, setGroup] = useState('');
  
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    axios.get('http://3.36.144.128:8080/api/mypage/favoriteSharing') 
      .then(res => {
        setSharing(res.data.map(item => {
          const date = new Date(item.postTime);
          const formattedDate = date.toLocaleDateString("ko-KR");
          return { ...item, postTime: formattedDate };
        }))
        })
      .catch(err => console.log(err));
      
    axios.get('​http://3.36.144.128:8080/api/mypage/favoriteGroupBuying') 
      .then(res => {
        setGroup(res.data.map(item => {
          const date = new Date(item.postTime);
          const formattedDate = date.toLocaleDateString("ko-KR");
          return { ...item, postTime: formattedDate };
        }))
        })
      .catch(err => console.log(err));
    })

  const [isSharingClicked, setSharingClicked] = useState(true);
  const [isGroupbuyingClicked, setGroupClicked] = useState(false);

  return (
    <>
      <div className="myWriting_title">나의 찜한 글</div>
      <div className="myWriting_body">
        <section className="shortcutBar">
          <ShortcutBar />
        </section>

        <section className="nav_myWriting">
          <span className="item">
            <span onClick={() => {setSharingClicked(true); setGroupClicked(false);}}
            style={{ color: isSharingClicked ? "black" : "#737373" }}>재료나눔</span>
            <span onClick={() => {setSharingClicked(false); setGroupClicked(true);}}
            style={{ color: isGroupbuyingClicked ? "black" : "#737373" }}>공동구매</span>
          </span>
        </section>

        <section className="myWritingList">
          <div className='myWriting_list'>
            {isSharingClicked && mySharing && mySharing.map((item, index) => (
              <div key={index}>
                <Link to={`/sharing/${item.id}`} style={{textDecoration: 'none', color: 'black'}}>
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
