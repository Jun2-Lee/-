import React, { Component } from "react";
import { Link } from "react-router-dom";
import './index.css';
import {useState} from 'react';
import {DummyList1} from '../chatList/dummyList1.js';
import axios from "axios";

function Chatroom(userId){
    const [chatting, setChatting] = useState(''); //사용자가 입력하고 있는 채팅
    const [feedChatting, setFeedChatting] = useState(DummyList1); //채팅 리스트
    const [isValid, setIsValid] = useState(false); 

//input에 따라 바뀌는 리스트
    const handleAddContent = () => {
        const newItem = {
            id: feedChatting.length + 1,
            content: chatting,
            sendTime: new Date().toLocaleString(),
            other: 'me'
        };
        setFeedChatting([...feedChatting, newItem]);
        setChatting('');
    };


    const postMessage = (userId) =>{
        axios.post("http://3.36.144.128:8080/api/message")
        .then((response)=>{
            
        })
    }

    //채팅 말풍선
    const ChattingList = props => {return(
        <div>
            <div className='chatBubble'
              style={{
                display:'flex',
                textAlign: 'right',
                position:'relative',
                margin: 'padding',
                width: '100px',
                height: '50px',
                backgroundColor: 'white',
                borderRadius: '10px'
            
            }}
            
            >
                <div className="outputTime"
                 style={{
                    marginLeft:"-65px",
                    marginTop:"15px",
                    fontSize:"12px"
                 }}
                >{props.sendTime}</div>
                <div className='outputChat'>{props.userChatting}
                </div>

                
            </div>


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
                        if(item.other==='me'){
                          return (
                            <ul>
                            <li className='opacityBox' >
                                <ChattingList
                            
                                userChatting = {item.content}
                                sendTime = {item.sendTime}
                                key = {i}
                  
                            
                                />
                            </li>
                            </ul>

                        
                      );
                    }
                    else{
                        return(
                            <ul>
                             <li key = {i}>
                                <ChattingListReturn
                                    userChatting = {item.content}
                                    sendTime = {item.sendTime}
                                    key = {i}
                                
                                />
                            </li>
                            </ul>
                        )
                    }
                      
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

export default Chatroom;