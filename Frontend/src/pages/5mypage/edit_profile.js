import './edit_profile.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import AddressSelect2 from '../../components/addressSelect2'

function EditProfile() {
    const [data, setData] = useState('');
    const [data2, setData2] = useState('');
    const [dong, setDong] = useState('');
    const [gu, setGu] = useState('');
    const [profileImage, setImage] = useState('');

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        axios.get('http://3.36.144.128:8080/api/mypage/changeInfo')
            .then(response => {
                console.log(response.data);
                setData(response.data);
                setDong(response.data.dong);
                setGu(response.data.gu);
            })
            .catch(err => console.log(err))
        axios.get('http://3.36.144.128:8080/api/mypage')
        .then(response => {
            console.log(response.data);
            setData2(response.data);
        })
        .catch(err => console.log(err))
    })

    const [editInfoRequestDto, setEditInfoRequestDto] = useState({
        dong: dong,
        gu: gu
    });

    // 주소 선택
    const [selectedGu, setSelectedGu] = useState('');
    const [selectedDong, setSelectedDong] = useState('');

    function handleSelectedGu(selectedGuValue) {
        setSelectedGu(selectedGuValue)
        setEditInfoRequestDto({
        ...editInfoRequestDto,
        gu: selectedGuValue
        })
    }
    
    function handleSelectedDong(selectedDongValue) {
        setSelectedDong(selectedDongValue)
        setEditInfoRequestDto({
        ...editInfoRequestDto,
        dong: selectedDongValue
        })
    }
    
    const headers = {
        'Content-Type': 'multipart/form-data'
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (gu == null || dong == null) alert("사는 동네를 선택해주세요.")
        else {
            const accessToken = localStorage.getItem('accessToken');
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

            const form = new FormData()
            form.append('profileImage', profileImage)
            form.append('editInfoRequestDto', new Blob([JSON.stringify(editInfoRequestDto)], {type: "application/json"}))

            axios.put('http://3.36.144.128:8080​/api​/mypage​/changeInfo', form, {headers})
                .then(res => {
                    console.log(res)
                    alert("회원 정보가 수정되었습니다.")
                })
                .catch(err => console.log(err))
        }
    }
    console.log(editInfoRequestDto)

    return (
        <div className='editProfile_container'>
            <div className="biglogo">
                <img src={data2.image}/>
            </div>

            <div className='editID'>
                <label htmlFor='form-label'>아이디</label>
                <input className='EditID' value={data.email} readOnly />
            </div>

            <div className='editName'>
                <label htmlFor='form-label'>닉네임</label>
                <input className='EditName' value={data2.nickname} readOnly/>
            </div>

            <div className='editAddress'>
                <label htmlFor='form-label'>사는 동네</label>
                {/*수정 필요*/}
                <AddressSelect2 onSelectedGu={handleSelectedGu} onSelectedDong={handleSelectedDong} dong={data.dong} gu={data.gu} />
            </div>

            <div className='edit_submit'>
                <button type='submit' className='Edit_submit' onClick={handleSubmit}>저장</button>
            </div>
        </div>
    )
}

export default EditProfile;

