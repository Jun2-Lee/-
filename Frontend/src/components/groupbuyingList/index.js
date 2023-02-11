import React from 'react';
import { Link } from "react-router-dom";
import Pagination from '../pagination';
import './index.css';

function GroupbuyingList() {
  return (
    <div className='groupbuying_list'>
      <div className='item'>
        <div className='item_image'>이미지</div>
        <div className='item_nickname'>닉네임</div>
        <div className='item_date'>2022.10.28</div>
        <div className='item_title'>제목</div>
        <div className='item_area'>장전동</div>
        <div className='item_deadline'>3일 후 마감</div>
      </div>
      <div className='item'>
        <div className='item_image'>이미지</div>
        <div className='item_nickname'>닉네임</div>
        <div className='item_date'>2022.10.28</div>
        <div className='item_title'>제목</div>
        <div className='item_area'>장전동</div>
        <div className='item_deadline'>3일 후 마감</div>
      </div>
      <div className='item'>
        <div className='item_image'>이미지</div>
        <div className='item_nickname'>닉네임</div>
        <div className='item_date'>2022.10.28</div>
        <div className='item_title'>제목</div>
        <div className='item_area'>장전동</div>
        <div className='item_deadline'>3일 후 마감</div>
      </div>
      <div className='item'>
        <div className='item_image'>이미지</div>
        <div className='item_nickname'>닉네임</div>
        <div className='item_date'>2022.10.28</div>
        <div className='item_title'>제목</div>
        <div className='item_area'>장전동</div>
        <div className='item_deadline'>3일 후 마감</div>
      </div>
      <div className='item'>
        <div className='item_image'>이미지</div>
        <div className='item_nickname'>닉네임</div>
        <div className='item_date'>2022.10.28</div>
        <div className='item_title'>제목</div>
        <div className='item_area'>장전동</div>
        <div className='item_deadline'>3일 후 마감</div>
      </div>
      <div className='item'>
        <div className='item_image'>이미지</div>
        <div className='item_nickname'>닉네임</div>
        <div className='item_date'>2022.10.28</div>
        <div className='item_title'>제목</div>
        <div className='item_area'>장전동</div>
        <div className='item_deadline'>3일 후 마감</div>
      </div>
      <div className='groupBuying_pagination'> <Pagination /> </div>
      <div className='writing'>
        <Link to="/postGroupBuying" className='postGroupBuying_link'>
          <img src='assets/img/writingIcon.png' className='writingIcon' ></img>
        </Link>
      </div>
    </div>
  )
}

export default GroupbuyingList;