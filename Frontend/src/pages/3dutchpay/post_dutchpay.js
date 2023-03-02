import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './post_dutchpay.css'
import axios from 'axios'

function PostDutchpay() {
  //음식 카테고리 선택 (수정해야함)
  const foodTypes = ['채소', '과일/견과/쌀', '수산물/건해산', '정육/계란', '우유/유제품', '면류/통조림', '샐러드/간편식', '양념', '생수/음료', '간식/과자/떡']
  const [selectedFood, setSelectedFood] = useState('');

  function handleFoodChange(e) {
    setSelectedFood(e.target.value);
    setGroupBuyingRequestDto({
      ...groupBuyingRequestDto,
      category: e.target.value
    })
  }

  //axios header 선언
  const headers = {
    'Content-Type': 'application/json'
  }

  const [groupBuyingRequestDto, setGroupBuyingRequestDto] = useState({
    store: '',
    category: '',
    deliveryCost: '',
    limitMember: '',
    content: '',
  });

  const { title, category, product, link, price, memberLimit, deadLine, dong, gu, content } = groupBuyingRequestDto;

  const onChange = (e) => {
    const { value, name } = e.target;
    setGroupBuyingRequestDto({
      ...groupBuyingRequestDto,
      [name]: value
    })
  };

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    let form = new FormData()
    //form.append 채우기

    axios.post("http://3.36.144.128:8080/api/dutchPay", form, {headers})
      .then(function(response) {
        console.log(response)
        navigate('/groupBuying')
      }) .catch(function(error) {
        console.log(error)
      })
    }

    return (
        <div>
        <form onSubmit={onSubmit}>
          <div className="StoreName">
            <label className="form-label">매장 이름</label>
            <input className="storeName"/>
          </div>
          
          <div className="food_classification">
            <label className="form-label">카테고리</label>
            <select className="category_delivery">
                <option value=""></option>
                <option value="육류">분식</option>
                <option value="채소">일식</option>
                <option value="수산물">양식</option>
                <option value="수산물">중식</option>
                <option value="수산물">패스트푸드</option>
            </select>
          </div>

          <div className="DeliveryAddress">
          <label className="form-label">배달 주소</label>
          <input 
            className="deliveryAddress"
            />
          <button type="submit" className="searchAddress">주소 검색</button>
        </div>

        <div className="DetailedAddress">
          <input 
            className="detailedAddress" placeholder="상세 주소"
            />
        </div>

          <div className="TotalDelivery">
            <label className="form-label">총 배달비</label>
            <input 
              className="totalDelivery"
              />
            <label id="won">원</label>
          </div>

          <div className="NumPeople">
            <label className="form-label">모집인원</label>
            <input 
              className="numPeople"
              />
            <label id="myeong">명</label>
          </div>

          <div className="Deadline_delivery">
            <label className="form-label">마감일</label>
            <input 
              type="date"
              className="deadlineDelivery"
              />
          </div>

          <div className="Explanation">
            <label className="form-label">설명(기타사항)</label>
            <input 
              className="explanation"
              />
          </div>

          <div className="submit">
            <input type="submit" className="post_delivery" value="등록하기"></input>
          </div>
        </form>
      </div>
    );
}

export default PostDutchpay;