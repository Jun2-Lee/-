import React,{useState} from 'react';
import toggleClose from '../../assets/img/toggleIcon.png';
import toggleOpen from '../../assets/img/toggleIconOpen.png';

import './index.css';

function CategoryBar2() {
  const [isOpen, setToggle] = useState([false, false, false, false, false, false, false, false, false]);

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
        margin: "1rem",
        fontWeight: "700",
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
            <li className='sub-category'>프로필 수정하기</li>
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
            <li className='sub-category'>재료 나눔</li>
            <li className='sub-category'>배달비 n빵</li>
            <li className='sub-category'>공동구매</li>
          </div>}
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(2)}>
            쪽지함
          </div>
          <div className='toggleBtn'/>
        </ul>
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(3)}>
            나의 찜
            {isOpen[3] && <img className='toggleOpen' src={toggleOpen}></img>}
            {!isOpen[3] && <img className='toggleClose' src={toggleClose}></img>}
          </div>
          <div className='toggleBtn'/>
        </ul>
          {isOpen[3] && <div className='sub-category-box'>
            <li className='sub-category'>재료 나눔</li>
            <li className='sub-category'>배달비 n빵</li>
            <li className='sub-category'>공동구매</li>
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
            <li className='sub-category'>재료 나눔</li>
            <li className='sub-category'>배달비 n빵</li>
            <li className='sub-category'>공동구매</li>
          </div>}
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(5)}>
            캘린더
          </div>
          <div className='toggleBtn'/>
        </ul>
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(6)}>
            탈퇴하기
          </div>
          <div className='toggleBtn'/>
        </ul>
      </div>
    </div>
  )
}

export default CategoryBar2;