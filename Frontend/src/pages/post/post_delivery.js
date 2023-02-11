import React from 'react';
import './post_delivery.css'

function PostDelivery() {

    return (
        <div>
        <form>
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

export default PostDelivery;