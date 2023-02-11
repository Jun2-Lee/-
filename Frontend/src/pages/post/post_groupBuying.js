import React from 'react';
import './post_groupBuying.css'

function PostgroupBuying() {

    return (
        <div>
        <form>
          <div className="Title">
            <label className="form-label">제목</label>
            <input className="title"/>
          </div>
          
          <div className="product_classification">
            <label className="form-label">카테고리</label>
            <select className="category_groupBuying">
                <option value=""></option>
                <option value="육류">육류</option>
                <option value="채소">채소</option>
                <option value="수산물">수산물</option>
            </select>
          </div>

          <div className="ProductName">
            <label className="form-label">상품명</label>
            <input className="productName"/>
          </div>

          <div className="Link">
            <label className="form-label">링크</label>
            <input className="link"/>
          </div>

          <div className="productImg_upload">
            <label className="form-label">사진<br></br>(필수)</label>
            <input 
              className="productImgUpload"
              />
            {/*<input type="file" accept="image/*"></input>*/}
          </div>

          {/******/ }
          <div className="TotalGroupBuying">
            <label className="form-label">공동구매 비용</label>
            <input 
              className="totalGroupBuying"
              />
            <label id="won">원</label>
          </div>

          <div className="NumPeople_groupBuying">
            <label className="form-label">모집인원</label>
            <input 
              className="numPeople_groupBuying"
              />
            <label id="myeong">명</label>
          </div>

          <div className="Deadline_groupBuying">
            <label className="form-label">마감일</label>
            <input 
              type="date"
              className="deadlineGroupBuying"
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

export default PostgroupBuying;