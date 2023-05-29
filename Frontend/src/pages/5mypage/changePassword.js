
import './changePassword.css';
import {React, useState, useEffect} from 'react';
import axios from 'axios';

export default function ChangePassword() {
    const accessToken = localStorage.getItem('accessToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    const [userId, setUserId] = useState('');
    const [nickname, setNickname] = useState('');
    const [currentPassword, setCurPW] = useState('');
    const [newPassword, setNewPW] = useState('');
    const [newPassword2, setNewPW2] = useState('');

    useEffect(() => {
        axios.get('http://3.36.144.128:8080/api/mypage/changeInfo')
            .then(res => setUserId(res.data.email))
            .catch(err => console.log(err))

        axios.get('http://3.36.144.128:8080/api/mypage')
            .then(res => setNickname(res.data.nickname))
            .catch(err => console.log(err))
    }, [])

    const headers = {
        'Content-Type': 'application/json'
    }
    const handleChangingPw = (e) => {
        e.preventDefault();
        if (currentPassword === '') alert("현재 비밀번호를 입력해주세요.")
        else if (newPassword === '') alert("변경 비밀번호를 입력해주세요.")
        else if (newPassword2 === '') alert("변경 비밀번호 확인칸을 입력해주세요.")
        else if (newPassword !== newPassword2) alert("변경 비밀번호를 다시 입력해주세요.")
        else {
            axios.put('http://3.36.144.128:8080/api/mypage/changePassword', JSON.stringify(newPassword), {headers})
                .then(res => alert(res.data))
                .catch(err => console.log(err))
        }
    }
    return(
        <div className='ChnnPcontainer'>
            <div className="biglogo_"><img className="bigDefaultImg" src="assets/img/bigLogo.png"/></div>
           
            <div className='currentID'>
                <label className='currentId-label'>아이디</label>
                <input className='CurrentID' value={userId} readOnly />
            </div>

            <div className='currentName'>
                <label className='currentName-label'>닉네임</label>
                <input className='CurrentName' value={nickname} readOnly />
            </div>

            <div className='currentPassword'>
                <label className='currentP-label'>현재 비밀번호</label>
                <input className='CurrentPassword' type='password' onChange={(e) => setCurPW(e.target.value)}/>
            </div>

            <div className='changePassword_'>
                <label className='changeP-label'>변경 비밀번호</label>
                <input className='ChangePassword' type='password' onChange={(e) => setNewPW(e.target.value)}/>
            </div>

            <div className='checkChnnP'>
                <label className='checkP-label'>변경 비밀번호 확인</label>
                <input className='CheckChnnP' type='password' onChange={(e) => setNewPW2(e.target.value)}/>
            </div>

            <div className='changeP_submit'>
                <button type='submit' className='ChangeP_submit' onClick={handleChangingPw}>저장</button>
            </div>


        </div>
    )
}