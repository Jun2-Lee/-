import './edit_profile.css';
import {useState} from 'react';
import {BrowserRouter as Router, Route,  Link} from "react-router-dom";

function EditProfile() {
    const [adressFilter,setAdressFilter]= useState("")
    function handleChange(event){
        setAdressFilter(event.target.value);
    }

    return (
        <div >
            <div className="biglogo"><img className="bigDefaultImg" src="assets/img/bigLogo.png"/></div>

            <div className='editID'>
                <label className='id-label'>아이디</label>
                <input className='EditID'></input>
            </div>

            <div className='editName'>
                <label className='name-label'>닉네임</label>
                <input className='EditName'></input>
            </div>

            <div onChange = {handleChange} className='editAddress'>
                <label className='adress-label'>사는 동네</label>
                <select className='edit_gu'>
                    <option value="">구</option>
                    <option value="중구">중구</option>
                    <option value="서구">서구</option>
                    <option value="동구">동구</option>
                    <option value="영도">영도구</option>
                    <option value="진구">진구</option>
                    <option value="동래">동래구</option>
                    <option value="남구">남구</option>
                    <option value="북구">북구</option>
                    <option value="해운대">해운대</option>
                    <option value="사하">사하구</option>
                    <option value="금정">금정구</option>
                    <option value="강서">강서구</option>
                    <option value="연제">연제구</option>
                    <option value="수영">수영구</option>
                    <option value="사상">사상구</option>
                </select>
                <select className='edit_dong'>
                    <option value="">동</option>
                    <option value="중구">남포동</option>
                    <option value="금정구">장전동</option>
                </select>  
            </div>

            <div className='changePassword'>
                <button className='Changepass'>
                    비밀번호 변경
                </button>
            </div>
        

            <div className='Tag'>
                <label className='tag'>즐겨찾는 재료</label>
                <button className='addtag'>+</button>
                <div className='searchTag'>
                        <div className='searchbar'>
                            <input className="searchtag"></input>
                        </div>
                    </div> 
            </div>
            {/*이미지 파일이 input위로 안올라가므로 보류,  div className="imgsearch"><img className="Union" src={union}/></div>*/}

            <div className='edit_submit'>
                <button type='submit' className='Edit_submit'>저장</button>
                
                 </div>




        </div>

    )
}

export default EditProfile;

