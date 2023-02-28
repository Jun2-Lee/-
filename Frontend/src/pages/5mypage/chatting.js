import './chatting.css';
import React  from 'react';
import {useState} from 'react';
import Chatroom from "../../components/chatting";

function Chatting () {

    const [content,setContent] = useState();

    const [visible,setVisible] = useState(false);


    const selectComponent = {
        Chatroom: <Chatroom/>
    }
    
    return( 
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
                    name={Chatroom}
                    onClick={()=>{
                        setVisible(!visible);
                    }}
              
                   >
                    <img className = "chatProfileImg"  src='assets/img/default_profile.png'>
                     </img>
                     
                    </button>
                    {visible && <Chatroom/>}
                </div>
            </div>

  

        </div>
    )
}

export default Chatting;