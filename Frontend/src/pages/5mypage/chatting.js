import React, { useState, useEffect } from 'react';
import Chatroom from '../../components/chatting';
import axios from 'axios';
import './chatting.css';
import '../4groupbuying/detail_groupBuying';


function Chatting ({userId, chatrooms}) {
  const [visibleChatroomId, setVisibleChatroomId] = useState(null);

  const handleChatroomClick = (chatroomId) => {
    setVisibleChatroomId(chatroomId === visibleChatroomId ? null : chatroomId);
  };
  {console.log(chatrooms)}
  return (
    <div>
      <div className='upper_note'>
        <div className='upperNote'>
          쪽지함
        </div>
      </div>

      <div className='chattingContainer'>
        쪽지
        <div className='openChat'>
          {chatrooms.map((chatroom) => (
            <div key={chatroom.id}>
              <button
                type='button'
                className='Openchat'
                onClick={() => handleChatroomClick(chatroom.id)}
              >
                <img className="chatProfileImg" src='assets/img/default_profile.png' />
              </button>
              {visibleChatroomId === chatroom.id && <Chatroom userId={userId} chatroom={chatroom} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Chatting;
