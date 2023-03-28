import React, { useState, useEffect } from 'react';
import Chatroom from '../../components/chatting';

import './chatting.css';
import '../4groupbuying/detail_groupBuying';


function Chatting () {
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
         
              <button
                type='button'
                className='Openchat'
              
              >
                <img className="chatProfileImg" src='assets/img/default_profile.png' />
              </button>
             
            </div>
          <Chatroom/>
        </div>
      </div>

  );
}

export default Chatting;
