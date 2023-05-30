
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
  const [isMine, setIsMine] = useState(false);
  const [isFinish, setFinished] = useState(false);

  const accessToken = localStorage.getItem('accessToken')
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    axios.get(`http://3.36.144.128:8080/api/sharing/${postId}`)
      .then(response => {
        setData(response.data);
        //yyyy-mm-dd로 변환
        setPostTime(new Date(response.data.postTime).toLocaleDateString("ko-KR"));
        setExpiry(new Date(response.data.expiry).toLocaleDateString("ko-KR"));
        setDeadline(new Date(response.data.deadLine).toLocaleDateString("ko-KR"));
        if (response.data.checkMine) setIsMine(true);
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

  function handleRevise() {
    navigate(`/reviseSharing/${postId}`);
  }

  const handleClipping = (e) => {
    e.preventDefault();
    axios.post(`http://3.36.144.128:8080/api/sharing/${postId}/like`)
      .then(response => {
        console.log(response);
        alert("찜 목록은 마이페이지에서 확인하실 수 있습니다.");
      })
      .catch(error => console.log(error))
  }

  const handleFinishing = (e) => {
    e.preventDefault();
    axios.post(`http://3.36.144.128:8080/api/sharing/${postId}/finish`) 
      .then(response => {
        console.log(response);
        alert(response.data);
        setFinished(true);
      })
      .catch(error => {
        console.log(error);
      })
  }

  return(
    <div className='detail_sharing'>
    
    <div>
      <div className='sharingdetail_title'>
        {data.title}
      </div>

      <div className='userhelp_sharedetail'>
      <div className = "profile_sharing">
        <img className = "profileImg"  src={data.profileImage}/>
        {data.nickname} 님
      </div>
        <div>
          {isMine && <button className = "modify_sharing" onClick={handleRevise}>수정하기</button>}
          {isMine && <button className = "delete_sharing" onClick={handleDelete}>삭제하기</button>}
          <div className="postTime"> {postTime} </div>
        </div>
      </div>

      <div className='component_sharing'>

        <div className='sharedetailImg'>
          <img src={data.image} />
        </div>

        <div className='items_sharing'>
          <div className="category_sharing">
          <label htmlFor="detailform_sharing">카테고리</label>
          <div className="categorySharing">
              {data.category}
          </div>
        </div>

          <div className="item_sharing">
            <label htmlFor="detailform_sharing">품목</label>
            <div
              className="itemSharing">{data.product}</div>
          </div>

          <div className="expiry_sharing">
            <label htmlFor="detailform_sharing">유통기한</label>
            <div
              className="expirySharing">
                {expiry}
              </div>
          </div>

                <div className="deadline_sharing">
                  <label htmlFor="detailform_sharing">마감일</label>
                  <div 
                    className="DeadlineSharing">
                      {deadLine}
                    </div>
                </div>

                <div className="deadline_sharing">
                  <label htmlFor="detailform_sharing">사는 동네</label>
                  <div className="DeadlineSharing">
                    {data.dong} {data.gu}
                  </div>
                </div>
                  
              </div>
          </div>

      <div style={{display: 'flex', justifyContent: 'center'}}>
        <div className="ingredient_sharing">
          <label id='Ingredient_sharing'>재료상태</label>
          <br></br>
          <div className="Ingredient_sharing_content">
            {data.content}
        </div>
      </div>
      
      </div>

      <div className="LowerUserHelp_sharing">
        {!isMine && <button className="shareLike" onClick={handleClipping}>찜</button>}
        {!isMine && <button className="shareApplication">쪽지</button>}
        {isMine && <button className="finishSharing" onClick={handleFinishing}>거래 완료</button>}
      </div>


    </div>

</div>

    
  
  )
}

export default DetailSharing;
