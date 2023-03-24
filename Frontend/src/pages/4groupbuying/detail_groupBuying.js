
import './detail_groupBuying.css';
import moment from 'moment';
import 'moment/locale/ko';
import React  from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import Chatroom from '../../components/chatting';


function DetailGroupBuying() {
    const [userId, setUserId] = useState([]);
  

    let [userName] = useState('');
    let [comment, setComment] = useState(''); //사용자가 입력하고 있는 댓글
    let [feedComments, setFeedComments] = useState([]); //댓글 리스트
    let [isValid, setIsValid] = useState(false); 

    let post = e => {
        const copyFeedComments = [...feedComments];
        copyFeedComments.push(comment); //copyFeedComments에 comment를 push
        setFeedComments(copyFeedComments);//feedComment를 setFeedComment로 변경
        setComment('');//댓글창 초기화

    
    };//유효성 검사를 통과하고 '등록' 클릭 시 발생하는 함수 post

    const CommentList = props => {
        return (
            <div className='userCommentBox'>
                <p className='userName'>{props.userName}</p>
                <div className='userComment'>{props.userComment}</div>
                
                
            </div>
            
        );
    }

  

    //지수
    const [data, setData] = useState({});
    const { postId } = useParams();
    //yyyy-mm-dd로 변환
    const [postTime, setPostTime] = useState('');
    const [deadLine, setDeadline] = useState('');

    useEffect(() => {
      axios.get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
        .then(response => {
          setData(response.data);
          //yyyy-mm-dd로 변환
          setPostTime(new Date(response.data.postTime).toLocaleDateString("ko-KR"));
          setDeadline(new Date(response.data.deadLine).toLocaleDateString("ko-KR"));
        })
        .catch(error => console.log(error));
    }, [postId]); //postId에 의존(postId에 따라 재실행)

    //게시물 삭제
    const navigate = useNavigate();
    function handleDelete() {
      axios.delete(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
        .then(response => {
          console.log(response)
          alert("삭제되었습니다")
          navigate("/groupBuying")
        })
        .catch(error => {
          console.log(error)
        });
    }

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://3.36.144.128:8080/api/groupBuying/');
          const postIds = response.data.map((content) => content.id);
        
          const requests = postIds.map((postId) => 
            axios.get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)  
          );
          const responses = await Promise.all(requests);
          const contents = responses.map((response) => response.data);
          
          setUserId(contents);
          
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }, []);
    
    useEffect(() => {
      console.log(userId);

     
    }, [userId]);

    return(
      <div className="detail_purchase">
       
            <div className='detail_Title'>
              <p id = "detail_title">{data.title}</p>
            </div>
      
            <div className='userhelp_detail'>
              <button className = "modify">수정하기</button>
              <button className = "delete" onClick={handleDelete}>삭제하기</button>
            </div>

        
            <div id = "nowTime">
              {postTime}
            </div>

            <div className = "profile_purchase">
              {data.nickName}

              <img className = "profileImg" src={data.profileImage} />
            </div>


          <div className='component_purchase'>
            <div className='detailImg'>
              <a href={data.link}>
                <img src={data.postImage} />
              </a>

              <div>
                이미지를 클릭하면 상품 링크로 이동할 수 있습니다
              </div>
            </div>

            

            <div className='items_purchase'>

                <div className="category_purchase">
                <label className="detailform">카테고리</label>
                <div
                  className="categoryPurchase">{data.category}</div>
              </div>
              <div className="item_purchase">
                <label className="detailform">품목</label>
                <div
                  className="itemPurchase">
                    {data.product}
                  </div>
              </div>

              <div className="recruit_purchase">
                <label className="detailform">모집인원</label>
                <div
                  className="recruitPurchase">
                    {data.currentMember} / {data.limitMember} 명
                </div>
              </div>

              <div className="cost_purchase">
                <label className="detailform">공동구매 비용</label>
                <div 
                  className="costPurchase">
                    {data.price}
                  </div>
                <p id='won'>원</p>
              </div>

              <div className="deadline_purchase">
                <label className="detailform">마감일</label>
                <div 
                  className="DeadlinePurchase">
                    {deadLine}
                  </div>
              </div>
              {data.dong} {data.gu}
            </div>
        </div>

            <div className="ingredientStatus">
              <label id="IngredientStatus">설명(기타사항)</label>
              <br></br>
            <div className="IngredientStatus">
              {data.content}
            </div>
            </div>

     

            <div className="LowerUserHelp">
              <button className = "like">찜</button>
              <button className = "application">신청하기</button>
              <div className='sendMessage'>
              {userId && (
          <Link to={{ pathname: `/chatting` }}>
            <button className='SendMessage' >쪽지</button>
         
        </Link>
      )}
          </div>

            </div>   


              <div className='purchase_comment'>
                          {feedComments.map((commentArr,i) => {
                          return (
                        
                            <CommentList
                              userName = {userName}
                              userComment = {commentArr}
                              key = {i}
                            
                          />
                        
                      );
                      
                  })}
                
            
                  <div className='inputcomment'>
                    <input 
                        type="text"
                        className='inputComment'
                        placeholder='댓글 작성하기...'
                        onChange = {e => {
                            setComment(e.target.value);
                        }}
                        onKeyUp={e=> {
                            e.target.value.length>0
                                ? setIsValid(true)
                                : setIsValid(false);
                        }}
                        value = {comment}
                    ></input> </div>

                     <div className='buttonblank'>
                        <button 
                          type='button'
                          className='submitComment'
                          onClick={post}
                          disabled={isValid ? false : true}
                    >
                        등록
                      </button>
            </div>
            </div>
          </div>
      

        )
}

export default DetailGroupBuying;