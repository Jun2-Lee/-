import './note.css';
import React  from 'react';
import {useState} from 'react';
import Chatroom from "../../components/chatting";

function Note() {


    
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
                    className='Openchat'>
                    
                    </button>
                </div>
            </div>

            <div>
            <Chatroom/>
            </div>

        </div>
    )
}

export default Note;