import React from 'react';
import { Link } from "react-router-dom";
import './index.css';
import {useState} from 'react';

function Chatroom(){


    let [chatting, setChatting] = useState(''); //사용자가 입력하고 있는 채팅
    let [feedChatting, setFeedChatting] = useState([]); //채팅 리스트
    let [isValid, setIsValid] = useState(false); 


    let post = e => {
        const copyFeedChatting = [...feedChatting];
        copyFeedChatting.push(chatting); 
        setFeedChatting(copyFeedChatting);
        setChatting('');

    
    };//유효성 검사를 통과하고 '등록' 클릭 시 발생하는 함수 post

    const ChattingList = props => {return(
        <div>
            <div className='chatBubble'>
                <img className = "ChatBubble"  src='assets/img/chatBubble.png'></img>
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
                
                    {feedChatting.map((chattingArr,i) => {
                          return (
                        
                            <ChattingList
                            
                              userChatting = {chattingArr}
                              key = {i}
                  
                            
                          />
                        
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
                        value = {chatting}
                        
                        >
                </input>
                <button
                        type='button'
                        className='submitChat'
                        onClick={post}
                        disabled={isValid ? false : true}
                        
                        >
                    <img  src='assets/img/submitChat.png'/>
                </button>
            </div>

          </div>
       
    )
}

export default Chatroom;