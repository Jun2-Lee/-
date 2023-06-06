import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CategoryBar2 from "../../components/categoryBar2";
import "./index.css";
import axios from 'axios'

function MyPage() {
  
  const navigate = useNavigate();

  const[data, setData] = useState('');

  function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}.${month}.${day}`;
  }
  /*접근 제한 */
  useEffect(() => {
    if (localStorage.getItem('refreshToken') === 'null') {
      alert("로그인을 해주세요.");
      navigate('/login');
    }

    const accessToken = localStorage.getItem('accessToken')
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    axios.get('http://3.36.144.128:8080/api/mypage')
      .then(response => {
        setData(
          {
            ...response.data,
            simpleDutchPayList: response.data.simpleDutchPayList.map((item) => ({
              ...item,
              postTime: formatDate(item.postTime),
            })),
            simpleGroupBuyingList: response.data.simpleGroupBuyingList.map((item) => ({
              ...item,
              postTime: formatDate(item.postTime),
            })),
            simpleLikedGroupBuyingList: response.data.simpleLikedGroupBuyingList.map((item) => ({
              ...item,
              postTime: formatDate(item.postTime),
            })),
            simpleLikedSharingList: response.data.simpleLikedSharingList.map((item) => ({
              ...item,
              postTime: formatDate(item.postTime),
            })),
            simpleParticipantingDutchPayList: response.data.simpleParticipantingDutchPayList.map((item) => ({
              ...item,
              postTime: formatDate(item.postTime),
            })),
            simpleParticipantingGroupBuyingList: response.data.simpleParticipantingGroupBuyingList.map((item) => ({
              ...item,
              postTime: formatDate(item.postTime),
            })),
            simpleSharingList: response.data.simpleSharingList.map((item) => ({
              ...item,
              postTime: formatDate(item.postTime),
            }))
          });
        })
      .catch(error => console.log(error));
  }, [])
  console.log(data)

  const [isSharingClicked, setSharing] = useState(true);
  const [isDutchpayClicked, setDutchpay] = useState(false);
  const [isGroupbuyingClicked, setGroupbuying] = useState(false);

  const [isDutchpayClicked2, setDutchpay2] = useState(true);
  const [isGroupbuyingClicked2, setGroupbuying2] = useState(false);

  const [isSharingClicked3, setSharing3] = useState(true);
  const [isGroupbuyingClicked3, setGroupbuying3] = useState(false);
  
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const date = now.getDate().toString().padStart(2, '0');
  
  return (
    <div className="mypage_body">
      <section className="mypage_categoryBar">
        <CategoryBar2 />
      </section>

      <section className="mypage_box">
        <div className="mypage_container"> 
          <label id="mypage_label">내 프로필</label>

          <div className="mypage_profile">
            <img src={data.image}/>
            <span>{data.nickname}님, 안녕하세요</span>
          </div>

          <div className="modify_profile">
            <Link to="/changePW">비밀번호 변경하기&nbsp;</Link>| 
            <Link to="/editProfile">&nbsp;프로필 수정하기</Link>
          </div>
        </div>

        <div className="mypage_container">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <label id="mypage_label">신청 목록</label>
            <span className="mypost">
              <span onClick={() => {setDutchpay2(true); setGroupbuying2(false);}}>&nbsp;배달비 n빵&nbsp;</span> |
              <span onClick={() => {setDutchpay2(false); setGroupbuying2(true);}}>&nbsp;공동구매</span>
            </span>
          </div>
          {isDutchpayClicked2 && data.simpleParticipantingDutchPayList && data.simpleParticipantingDutchPayList.map((item, index) => (
            <div key={index}>
              <div className="participation_list">
                <div style={{width: '70%', fontSize: '11px'}}>{item.title}</div>
                <div style={{width: '30%', display: 'flex', justifyContent: 'flex-end', color: '#737373', fontSize: '11px'}}>{item.postTime}</div>
              </div>
            </div>
          ))}

          {isGroupbuyingClicked2 && data.simpleParticipantingGroupBuyingList && data.simpleParticipantingGroupBuyingList.map((item, index) => (
            <div key={index}>
              <div className="participation_list">
                <div style={{width: '70%', fontSize: '11px'}}>
                  <Link to={`/groupBuying/${item.id}`}>{item.title}</Link>
                </div>
                <div style={{width: '30%', display: 'flex', justifyContent: 'flex-end', color: '#737373', fontSize: '11px'}}>{item.postTime}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mypage_container">
          <label id="mypage_label">쪽지함</label>
          <div className="participation_list"></div>
          <div className="participation_list"></div>
          <div className="participation_list"></div>
          <div className="participation_list"></div>
        </div>

        <div className="mypage_container">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <label id="mypage_label">찜 목록</label>
            <span className="mypost">
              <span onClick={() => {setSharing3(true); setGroupbuying3(false);}}>&nbsp;재료나눔&nbsp;</span> |
              <span onClick={() => {setSharing3(false); setGroupbuying3(true);}}>&nbsp;공동구매</span>
            </span>
          </div>
          {isSharingClicked3 && data.simpleLikedSharingList && data.simpleLikedSharingList.map((item, index) => (
            <div key={index}>
              <div className="participation_list">
                <div style={{width: '70%', fontSize: '11px'}}>
                  <Link to={`/sharing/${item.id}`}>{item.title}</Link>
                </div>
                <div style={{width: '30%', display: 'flex', justifyContent: 'flex-end', color: '#737373', fontSize: '11px'}}>{item.postTime}</div>
              </div>
            </div>
          ))}

          {isGroupbuyingClicked3 && data.simpleLikedGroupBuyingList && data.simpleLikedGroupBuyingList.map((item, index) => (
            <div key={index}>
              <div className="participation_list">
                <div style={{width: '70%', fontSize: '11px'}}>
                  <Link to={`/groupBuying/${item.id}`}>{item.title}</Link>
                </div>
                <div style={{width: '30%', display: 'flex', justifyContent: 'flex-end', color: '#737373', fontSize: '11px'}}>{item.postTime}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mypage_container">
          <div style={{display: 'flex', alignItems: 'center'}}>
            <label id="mypage_label">내가 쓴 글</label>
            <span className="mypost">
              <span onClick={() => {setSharing(true); setDutchpay(false); setGroupbuying(false);}}>재료나눔&nbsp;</span> | 
              <span onClick={() => {setSharing(false); setDutchpay(true); setGroupbuying(false);}}>&nbsp;배달비 n빵&nbsp;</span> |
              <span onClick={() => {setSharing(false); setDutchpay(false); setGroupbuying(true);}}>&nbsp;공동구매</span>
            </span>
          </div>
          
          {isSharingClicked && data.simpleSharingList && data.simpleSharingList.map((item, index) => (
            <div key={index}>
              <div className="my_writing">
                <div style={{width: '70%', fontSize: '11px'}}>
                  <Link to={`/sharing/${item.id}`}>{item.title}</Link>
                </div>
                <div style={{width: '30%', display: 'flex', justifyContent: 'flex-end', color: '#737373', fontSize: '11px'}}>{item.postTime}</div>
              </div>
            </div>
          ))}

          {isDutchpayClicked && data.simpleDutchPayList && data.simpleDutchPayList.map((item, index) => (
            <div key={index}>
              <div className="my_writing">
                <div style={{width: '70%', fontSize: '11px'}}>{item.title}</div>
                <div style={{width: '30%', display: 'flex', justifyContent: 'flex-end', color: '#737373', fontSize: '11px'}}>{item.postTime}</div>
              </div>
            </div>
          ))}

          {isGroupbuyingClicked && data.simpleGroupBuyingList && data.simpleGroupBuyingList.map((item, index) => (
            <div key={index}>
              <div className="my_writing">
                <div style={{width: '70%', fontSize: '11px'}}>
                  <Link to={`/groupBuying/${item.id}`}>{item.title}</Link>
                </div>
                <div style={{width: '30%', display: 'flex', justifyContent: 'flex-end', color: '#737373', fontSize: '11px'}}>{item.postTime}</div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mypage_container">
          <label id="mypage_label">캘린더</label>
          <div className="calendar_container">
            <div className="mydate">
              <div style={{height: '104px'}}>
                <div style={{marginTop: '9px', textAlign: 'center', fontSize: '14px'}}>{year}년 {month}월</div>
                <div style={{display: 'flex', alignItems: 'center', height: '80px', textAlign: 'center', fontSize: '64px'}}>{date}</div>
              </div>
            </div>

            {data.todayScheduleList && data.todayScheduleList.map((item, index) => (
              <div key={index} className="schedule_container">
                <div className="schedule_list">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>



    </div>
  );
}

export default MyPage;