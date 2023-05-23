import React, { useState, useEffect, useCallback } from 'react';
import axios from "axios";
import {DummyList1} from '../../components/chatList/dummyList1.js';
import './chatting.css';
import '../4groupbuying/detail_groupBuying';
import { useLocation } from "react-router-dom";
import { useParams, useNavigate } from 'react-router-dom';

function Chatting(props) {
  const [isChatroomOpen, setIsChatroomOpen] = useState(false);
  const [newOpenChatState, setNewOpenChatState] = useState(false);
  const location = useLocation();
  const getUserId = location.state.getUserId || [];
  const [data, setData] = useState([]);
  const [roomNumbers, setRoomNumbers] = useState([]);

  // 방 번호 값을 저장하는 배열
  const toggleChatroom = () => {
    setIsChatroomOpen(!isChatroomOpen);
    return !isChatroomOpen;
  };

  //전체 메세지 목록
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    axios
      .get(`/message`, { cache: "force-cache" })
      .then((response) => {
        setData(response.data);
        setRoomNumbers(response.data.map((item) => item.roomNumber)); // 방 번호 값을 배열로 저장
      })
      .catch((error) => console.log(error));
  }, []);

  //최초 쪽지 작성
  const SendPost = useCallback(async (comment) => {
    
    if (comment === "") {
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    try {
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      const response = await axios.post("/message", {
        content: comment,
        id: getUserId || '',
      });
      console.log(response);
      const newRoomNumber = response.data.roomNumber;
      setRoomNumbers([...roomNumbers, newRoomNumber]); // 기존 방 번호 리스트에 새 방 번호를 추가
      setIsChatroomOpen(true); // 채팅방을 열기
    } catch (error) {
      console.log(error);
    }
  }, [getUserId, roomNumbers]);
  
  console.log(getUserId);
  const handleSubmit = useCallback((e, comment) => {
    e.preventDefault();
    SendPost(comment);
    setNewOpenChatState(true);
  }, [SendPost]);

  const FirstMessage = () => {
    const [comment, setComment] = useState("");
    console.log(comment);

    return (
      <div>
        {newOpenChatState ? (
          <OpenChat />
        ) : (
          <div className="firstMessage">
            <form onSubmit={(e) => handleSubmit(e, comment)}>
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button type="submit">보내기</button>
            </form>
          </div>
        )}
      </div>
    );
  };

  const OpenChat = (props) => {
    const handleOpenChat = () => {
      const isOpen = toggleChatroom();
     

    setIsChatroomOpen(isOpen); // 상태값을 업데이트합니다
  };

    return (
      <div>
         {data.map(item=>(
        <div className='openChat'>
          <button
            type='button'
            className='Openchat'
            onClick={handleOpenChat}
          >
            <img className="chatProfileImg" src='assets/img/default_profile.png' />
            <div style={{marginTop:"-38px"}}> {item.other}</div>
          </button>
        </div> ))}
        {isChatroomOpen && <Chatroom data={data} roomNumbers={roomNumbers} />} 
        
      </div>
    );
  };




  //Chatting
  const Chatroom = (props) => {
    const { data, roomNumbers } = props;
    
    const { roomNumber } = useParams();
  
    const [chatting, setChatting] = useState(''); // 사용자가 입력하고 있는 채팅
    const [feedChatting, setFeedChatting] = useState([]); // 채팅 리스트
    const [isValid, setIsValid] = useState(false);
    const [currentRoomNumber, setCurrentRoomNumber] = useState(roomNumber); // 현재 채팅방 번호를 상태값으로 추가
  
    useEffect(() => {
      setCurrentRoomNumber(roomNumbers);
    }, [roomNumbers]);

    console.log(currentRoomNumber);
  
    // input에 따라 바뀌는 리스트
    const handleAddContent = () => {
      const newItem = {
        id: feedChatting.length + 1,
        content: chatting,
        sendTime: new Date().toLocaleString(),
        other: 'me'
      };
      setFeedChatting([...feedChatting, newItem]);
      setChatting('');
      const accessToken = localStorage.getItem("accessToken");
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      axios.post(`/message/${currentRoomNumber}`, { // 현재 채팅방 번호로 요청을 보냄
        id: getUserId || '',
        content: chatting
      })
        .then(response => {
          console.log('Message sent successfully!');
  
  })
  .catch(error => {
    console.error('Error sending message:', error);
  });
};




    //채팅 말풍선
    const ChattingList = props => {return(
        <div>
            {data.map(item=>(
                    
            <div className='chatBubble'
              style={{
                display:'flex',
                textAlign: 'right',
                position:'relative',
                margin: 'padding',
                width: '100px',
                height: '50px',
                backgroundColor: 'white',
                borderRadius: '10px',
            
            
            }}
            
            >
                <div className="outputTime"
                 style={{
                    marginLeft:"-150px",
                    marginTop:"15px",
                    fontSize:"10px",
                    wordBreak: "normal"

                 }}
                >{item.sendTime}</div>
                
                <div className='outputChat'
                  style={{
                        fontSize:"12px",
                        marginTop:"18px",
                        marginLeft:"20px"
                  }}>{item.content}
                  
                
                </div>

              
            </div>
          

            ))}
        </div>
    )
}

const ChattingListReturn= props => {return(
    <div>
        <div className='chatBubbleReturn'
          style={{
            display:'flex',
            textAlign: 'right',
            position:'relative',
            margin: 'padding',
            width: '100px',
            height: '50px',
            backgroundColor: 'white',
            borderRadius: '10px'}}
        
        >
            <div className="outputTime"
                 style={{
                    marginLeft:"110px",
                    marginTop:"15px",
                    fontSize:"12px"
                 }}
                >{props.sendTime}</div>
            <div className='outputChat'>{props.userChatting}</div>
        </div>


    </div>
)
}
  

       return(
        <div>
             <div className='noteRoom' style={{overflow:'scroll'}}>
                <img className = "noteImg"  src='assets/img/noteImg.png'>
                </img>

                <div className='purchase_comment' >
                
                    {feedChatting.map((item,i) => {
                      
                          return (
                            <ul>
                            <li className='opacityBox' >
                                <ChattingList

                                />
                            </li>
                            </ul>

                        
                      );
                    
                 
                  })}</div>
                
            </div>

            <div className='chattingBox'>
                <input 
                        type="text"
                        className='inputChat'
                        onChange = {e => {
                            setChatting(e.target.value);
                        }}
                        onKeyUp={e=> {
                            e.target.value.length>0
                                ? setIsValid(true)
                                : setIsValid(false);
                        }}
             
                        
                        >
                </input>
                <div >
                    <button
                        type='button'
                        className='submitChat'
                        onClick={handleAddContent}
                        disabled={isValid ? false : true}
                        
                        >
                        <img  src='assets/img/submitChat.png'/>
                    </button>
                    
                </div>
            </div>

          </div>);
      
}

  return (
    <div>
      <div className='upper_note'>
        <div className='upperNote'>
          쪽지함
        </div>
      </div>
      <div className='chattingContainer'>
        쪽지
       
        <FirstMessage />
      </div>
    </div>
  );
}

export default Chatting;