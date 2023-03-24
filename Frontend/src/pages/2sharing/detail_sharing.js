
import './detail_sharing.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function DetailSharing() {
  const [data, setData] = useState({});
  const { postId } = useParams();
  //yyyy-mm-dd로 변환
  const [postTime, setPostTime] = useState('');
  const [expiry, setExpiry] = useState('');
  const [deadLine, setDeadline] = useState('');

  useEffect(() => {
    axios.get(`http://3.36.144.128:8080/api/sharing/${postId}`)
      .then(response => {
        setData(response.data);
        //yyyy-mm-dd로 변환
        setPostTime(new Date(response.data.postTime).toLocaleDateString("ko-KR"));
        setExpiry(new Date(response.data.expiry).toLocaleDateString("ko-KR"));
        setDeadline(new Date(response.data.deadLine).toLocaleDateString("ko-KR"));
      })
      .catch(error => console.log(error));
  }, [postId]); //postId에 의존(postId에 따라 재실행)

  //게시물 삭제
  const navigate = useNavigate();
  function handleDelete() {
    axios.delete(`http://3.36.144.128:8080/api/sharing/${postId}`)
      .then(response => {
        console.log(response)
        alert("삭제되었습니다")
        navigate("/sharing")
      })
      .catch(error => {
        console.log(error)
      });
  }

  return(
    <div className='detail_sharing'>
    

    <div className='sharingdetail_Title'>
      <p id = "sharingdetail_title">{data.title}</p>
    </div>


    <div className='userhelp_sharedetail'>
      <button className = "modify_sharing">수정하기</button>
      <button className = "delete_sharing" onClick={handleDelete}>삭제하기</button>
    </div>


    <div id = "nowTime">
       {postTime}
    </div>
    
    <div className = "profile_sharing">
      {data.nickname}
      <img className = "profileImg"  src={data.profileImage}/>
    </div>


    <div className='component_sharing'>
      <div className='sharedetailImg'>
        <img src={data.image} />
      </div>
      <div className='items_sharing'>
                <div className="category_sharing">
                <label className="detailform_sharing">카테고리</label>
                <div
                  className="categorySharing">
                    {data.category}
                </div>
              </div>
              <div className="item_sharing">
                <label className="detailform_sharing">품목</label>
                <div
                  className="itemSharing">{data.product}</div>
              </div>

              <div className="expiry_sharing">
                <label className="detailform_sharing">유통기한</label>
                <div
                  className="expirySharing">
                    {expiry}
                  </div>
              </div>

              <div className="deadline_sharing">
                <label className="detailform_sharing">마감일</label>
                <div 
                  className="DeadlineSharing">
                    {deadLine}
                  </div>
              </div>
              {data.dong}
              {data.gu}
              
            </div>
        </div>



    <div className="ingredient_sharing">
      <label id="Ingredient_sharing">재료상태</label>
      <br></br>
    <div className="Ingredient_sharing">
      {data.content}
    </div>
    </div>

    <div className="LowerUserHelp_sharing">
      <button className = "shareLike">찜</button>
      <button className = "shareApplication">신청하기</button>
    </div>    

</div>

    
  
  )
}

export default DetailSharing;
