import React from 'react';
import './post_sharing.css';
import axios from "axios";

function PostSharing() {

    return (
        <div>
        <form>
          <div className="Title">
            <label className="form-label">제목</label>
            <input className="title"/>
          </div>
          
          <div className="food_classification">
            <label className="form-label">카테고리</label>
            <select className="category">
                <option value=""></option>
                <option value="육류">육류</option>
                <option value="채소">채소</option>
                <option value="수산물">수산물</option>
            </select>
            <label className="form-label" id="item">품목</label>
            <select className="item">
            <option value=""></option>
              <option value="소고기">소고기</option>
              <option value="돼지고기">돼지고기</option>
              <option value="닭고기">닭고기</option>
            </select>
          </div>

          <div className="foodImg_upload">
            <label className="form-label">사진<br></br>(필수)</label>
            <input 
              className="foodImgUpload"
              />
            {/*<input type="file" accept="image/*"></input>*/}
          </div>

          <div className="food_condition">
            <label className="form-label">재료상태</label>
            <input className="foodCondition"/>
          </div>
          
          <div className="Date">
            <label className="form-label">유통기한</label>
            <input type="date" className="expiration_date"></input>
            <label id="expir_date">마감일</label>
            <input type="date" className="deadline"></input>
          </div>

          <div className="submit">
            <input type="submit" className="post_sharing" value="등록하기"></input>
          </div>
        </form>
      </div>
    );
}

export default PostSharing;