import React from 'react'
import { Link } from "react-router-dom"
import './index.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

function SharingList({startIndex, endIndex, category}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios.get('http://3.36.144.128:8080/api/sharing')
      .then(response => {
        setItems(response.data.map(item => {
          const date = new Date(item.postTime);
          const formattedDate = date.toLocaleDateString("ko-KR");
          return { ...item, postTime: formattedDate };
        }));
      })
      .catch(error => console.log(error));
  }, [category]) // category가 변경될 때마다 API 호출

  const calculateTimeLeft = (deadline) => {
    const targetDate = new Date(deadline);
    const today = new Date();

    const differenceInTime = targetDate.getTime() - today.getTime();
    const differenceInHours = Math.ceil(differenceInTime / (1000 * 3600));

    if (differenceInHours >= 24) {
      const differenceInDays = Math.ceil(differenceInHours / 24);
      return `${differenceInDays}일 후 마감`;
    } else {
      return `${differenceInHours}시간 후 마감`;
    }
  };

  //카테고리
  const filteredItems = category ? items.filter(item => item.product === category) : items;

  return (
    <div className='sharing_list'>
      {filteredItems.slice(startIndex, endIndex).map((item, index) => (
        <Link to={`/sharing/${item.id}`} style={{ textDecoration: 'none' }}>
          <div key={index} className='item'>
            <div className='item_image'>
              <img src={item.image} alt='이미지 불러오기 실패' />
            </div>
            <div className='item_nickname'>{item.nickname}</div>
            <div className='item_date'>{item.postTime}</div>
            <div className='item_title'>{item.title}</div>
            <div className='item_area'>{item.dong}</div>
            <div className='item_deadline'>{calculateTimeLeft(item.deadLine)}</div>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default SharingList;