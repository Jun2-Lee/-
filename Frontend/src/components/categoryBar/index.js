import React,{useState} from 'react';
import toggleClose from '../../assets/img/toggleIcon.png';
import toggleOpen from '../../assets/img/toggleIconOpen.png';

import './index.css';

function CategoryBar() {
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
            곡물
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
            견과류
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
            과일
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
            채소
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
            육류
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
            유제품
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
            수산물
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
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(7)}>
            조미료
            {isOpen[7] && <img className='toggleOpen' src={toggleOpen}></img>}
            {!isOpen[7] && <img className='toggleClose' src={toggleClose}></img>}
          </div>
          <div className='toggleBtn'/>
        </ul>
          {isOpen[7] && <div className='sub-category-box'>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
          </div>}
        <ul className='category'>
          <div onClick={()=>handleOpenToggle(8)}>
            기호식품
            {isOpen[8] && <img className='toggleOpen' src={toggleOpen}></img>}
            {!isOpen[8] && <img className='toggleClose' src={toggleClose}></img>}
          </div>
          <div className='toggleBtn'/>
        </ul>
          {isOpen[8] && <div className='sub-category-box'>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
            <li className='sub-category'>--</li>
          </div>}
      </div>
    </div>
  )
}

export default CategoryBar;