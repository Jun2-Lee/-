import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './post_dutchpay.css'
import axios from 'axios'

function PostDutchpay() {
  //음식 카테고리 선택 (수정해야함)
  const foodTypes = ['족발/보쌈', '찜/탕/찌개', '돈까스/회/일식', '피자', '고기/구이', '야식', '양식', '치킨', '중식', '아시안', '백반/죽/국수', '도시락', '분식', '카페/디저트', '패스트푸드', '채식']
  const [selectedFood, setSelectedFood] = useState('');

  function handleFoodChange(e) {
    setSelectedFood(e.target.value);
    setDutchpayRequestDto({
      ...dutchpayRequestDto,
      category: e.target.value
    })
  }

  //axios header 선언
  const headers = {
    'Content-Type': 'application/json'
  }

  const [dutchpayRequestDto, setDutchpayRequestDto] = useState({
    store: '',
    category: '',
    /* 배달 주소 */
    deliveryCost: '',
    limitMember: '',
    deadLine: '',
    content: '',
  });

  const { store, category, deliveryCost, limitMember, deadLine, content } = dutchpayRequestDto;

  const onChange = (e) => {
    const { value, name } = e.target;
    setDutchpayRequestDto({
      ...dutchpayRequestDto,
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
        navigate('/dutchpay')
      }) .catch(function(error) {
        console.log(error)
      })
    }

    return (
      <div className='postDutchpay_container'>
        <form onSubmit={onSubmit}>
          <div className="StoreName">
            <label className="form-label">매장 이름</label>
            <input name='store' onChange={onChange} value={store} className="storeName"/>
          </div>
          
          <div className="food_classification">
            <label className="form-label">카테고리</label>
            <select name={category} onChange={handleFoodChange} value={selectedFood} className="category">
              {foodTypes.map((foodType) => (
              <option value={foodType} key={foodType}> {foodType} </option>
              ))}
            </select>
          </div>

          <div className="DeliveryAddress">
            <label className="form-label">배달 주소</label>
            <input input name='address' onChange={onChange} value={address} className="deliveryAddress" />
            <button type="submit" className="searchAddress">주소 검색</button>
          </div>

          <div className="DetailedAddress">
            <input 
              className="detailedAddress" placeholder="상세 주소"
              />
          </div>

          <div className="TotalDelivery">
            <label className="form-label">총 배달비</label>
            <input name='deliveryCost' onChange={onChange} value={deliveryCost} className="totalDelivery" />
            <label id="won">원</label>
          </div>

          <div className="NumPeople">
            <label className="form-label">모집인원</label>
            <input name='limitMember' onChange={onChange} value={limitMember} className="numPeople" />
            <label id="myeong">명</label>
          </div>

          <div className="Deadline_delivery">
            <label className="form-label">마감일</label>
            <input name='deadLine' onChange={onChange} value={deadLine} type="datetime-local" className="deadlineDelivery" />
          </div>

          <div className="Explanation">
            <label className="form-label">설명(기타사항)</label>
            <input name='content' onChange={onChange} value={content} className="explanation" />
          </div>

          <div className="submit">
            <input type="submit" className="post_dutchpay" value="등록하기"></input>
          </div>
        </form>
      </div>
    );
}

export default PostDutchpay;