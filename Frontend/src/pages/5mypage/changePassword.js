
import './changePassword.css';
import {React, useState, useEffect} from 'react';

export default function ChangePassword(){

    return(
        <div className='ChnnPcontainer'>
            <div className="biglogo_"><img className="bigDefaultImg" src="assets/img/bigLogo.png"/></div>
           
            <div className='currentID'>
                <label className='currentId-label'>아이디</label>
                <input className='CurrentID'></input>
            </div>

            <div className='currentName'>
                <label className='currentName-label'>닉네임</label>
                <input className='CurrentName'></input>
            </div>

            <div className='currentPassword'>
                <label className='currentP-label'>현재 비밀번호</label>
                <input className='CurrentPassword'></input>
            </div>

            <div className='changePassword_'>
                <label className='changeP-label'>변경 비밀번호</label>
                <input className='ChangePassword'></input>
            </div>

            <div className='checkChnnP'>
                <label className='checkP-label'>변경 비밀번호 확인</label>
                <input className='CheckChnnP'></input>
            </div>

            <div className='changeP_submit'>
                <button type='submit' className='ChangeP_submit'>저장</button>
            </div>


        </div>
    )
}