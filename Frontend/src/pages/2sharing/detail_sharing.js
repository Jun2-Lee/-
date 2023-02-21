
import './detail_sharing.css';

import React  from 'react';
import moment from 'moment';
import 'moment/locale/ko';

import { useRef, useEffect } from "react";


function DetailSharing() {
    const nowTime = moment().format('YYYY-MM-DD');
  return(
    <div className='detail_sharing'>
    

    <div className='sharingdetail_Title'>
      <p id = "sharingdetail_title">제목</p>
    </div>


    <div className='userhelp_sharedetail'>
      <button className = "modify_sharing">수정하기</button>
      <button className = "delete_sharing">삭제하기</button>
    </div>


    <div id = "nowTime">
       {nowTime}
    </div>
    
    <div className = "profile_sharing">
      <img className = "profileImg"  src='assets/img/default_profile.png'/>
    </div>


    <div className='component_sharing'>
      <div className='sharedetailImg'></div>
      <div className='items_sharing'>
                <div className="category_sharing">
                <label className="detailform_sharing">카테고리</label>
                <div
                  className="categorySharing"
                  />
              </div>
              <div className="item_sharing">
                <label className="detailform_sharing">품목</label>
                <div
                  className="itemSharing"
                  />
              </div>

              <div className="expiry_sharing">
                <label className="detailform_sharing">유통기한</label>
                <div
                  className="expirySharing"
                  />
              </div>

              <div className="deadline_sharing">
                <label className="detailform_sharing">마감일</label>
                <div 
                  className="DeadlineSharing"
                  />
            </div>
            </div>
        </div>



    <div className="ingredient_sharing">
      <label id="Ingredient_sharing">재료상태</label>
      <br></br>
    <input className="Ingredient_sharing"/>
    </div>

    <div className="LowerUserHelp_sharing">
      <button className = "shareLike">찜</button>
      <button className = "shareApplication">신청하기</button>
    </div>    

</div>

    
  
  )
}

export default DetailSharing;
