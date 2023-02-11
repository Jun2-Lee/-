import React,{useState} from 'react';
import toggleClose from '../../assets/img/toggleIcon.png';
import toggleOpen from '../../assets/img/toggleIconOpen.png';

import './index.css';

function ShortcutBar() {
  const [isOpen, setToggle] = useState([false, false, false, false, false, false, false]);

  const handleOpenToggle = (index) => {
    let copy = [...isOpen];
    if(copy[index]==false) {
      copy[index] = true;
    } else if(copy[index]==true) {
      copy[index]=false;
    }
    setToggle(copy);
  };

  return (
    <div>
      <div style={{ 
        fontSize: "10px",
        textAlign: "center",
        margin: "1rem"
      }}>
          카테고리
      </div>
      <div className='sideBar'>
        <ul className='category'> 
          <div onClick={()=>handleOpenToggle(0)}>
            내 프로필
            {isOpen[0] && <img className='toggleOpen' src={toggleOpen}></img>}
            {!isOpen[0] && <img className='toggleClose' src={toggleClose}></img>}
          </div>
        </ul>
          {isOpen[0] && <div className='sub-category-box'>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
          </div>}
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(1)}>
            참여 목록
            {isOpen[1] && <img className='toggleOpen' src={toggleOpen}></img>}
            {!isOpen[1] && <img className='toggleClose' src={toggleClose}></img>}
          </div>
          <div className='toggleBtn'/>
        </ul>
          {isOpen[1] && <div className='sub-category-box'>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
          </div>}
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(2)}>
            쪽지함
            {isOpen[2] && <img className='toggleOpen' src={toggleOpen}></img>}
            {!isOpen[2] && <img className='toggleClose' src={toggleClose}></img>}
          </div>
          <div className='toggleBtn'/>
        </ul>
          {isOpen[2] && <div className='sub-category-box'>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
          </div>}
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(3)}>
            나의 찜
            {isOpen[3] && <img className='toggleOpen' src={toggleOpen}></img>}
            {!isOpen[3] && <img className='toggleClose' src={toggleClose}></img>}
          </div>
          <div className='toggleBtn'/>
        </ul>
          {isOpen[3] && <div className='sub-category-box'>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
          </div>}
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(4)}>
            내가 쓴 글
            {isOpen[4] && <img className='toggleOpen' src={toggleOpen}></img>}
            {!isOpen[4] && <img className='toggleClose' src={toggleClose}></img>}
          </div>
          <div className='toggleBtn'/>
        </ul>
          {isOpen[4] && <div className='sub-category-box'>
            <li className='sub-category'>소고기</li>
            <li className='sub-category'>돼지고기</li>
            <li className='sub-category'>닭고기</li>
            <li className='sub-category'>그 외</li>
          </div>}
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(5)}>
            캘린더
            {isOpen[5] && <img className='toggleOpen' src={toggleOpen}></img>}
            {!isOpen[5] && <img className='toggleClose' src={toggleClose}></img>}
          </div>
          <div className='toggleBtn'/>
        </ul>
          {isOpen[5] && <div className='sub-category-box'>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
          </div>}
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(6)}>
            탈퇴하기
            {isOpen[6] && <img className='toggleOpen' src={toggleOpen}></img>}
            {!isOpen[6] && <img className='toggleClose' src={toggleClose}></img>}
          </div>
          <div className='toggleBtn'/>
        </ul>
          {isOpen[6] && <div className='sub-category-box'>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
          </div>}
      </div>
    </div>
  )
}

export default ShortcutBar;