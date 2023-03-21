import './detail_groupBuying.css';
import moment from 'moment';
import 'moment/locale/ko';
import React  from 'react';
import {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useParams } from 'react-router-dom';
import Chatroom from '../../components/chatting';


function DetailGroupBuying() {
    const nowTime = moment().format('YYYY-MM-DD');
    const { postId } = useParams();
    const [chatrooms, setChatrooms] =useState([]);
    const [userId, setUserId] = useState([]);
  

    function ChatroomItem(props) {
      const userId = props.userId;
      if (!Array.isArray(userId) || userId.length === 0) {
        return null;
      }
      return userId.map(user => <Chatroom key={user.userId} userId={user.userId} />);
    }
    

    function addChatroom() {
      const newUserId = [{ userId: userId[0].userId }];
      setChatrooms([...chatrooms, <ChatroomItem userId={newUserId} />]);
    }
    
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
              <p id = "detail_title">제목</p>
            </div>
      
            <div className='userhelp_detail'>
              <button className = "modify">수정하기</button>
              <button className = "delete">삭제하기</button>
            </div>

        
            <div id = "nowTime">
              {nowTime}
            </div>

            <div className = "profile_purchase">
              <img className = "profileImg"  src='assets/img/default_profile.png'>
              </img>
            </div>


          <div className='component_purchase'>
            <div className='detailImg'></div>

            <div className='items_purchase'>

                <div className="category_purchase">
                <label className="detailform">카테고리</label>
                <div
                  className="categoryPurchase"
                  />
              </div>
              <div className="item_purchase">
                <label className="detailform">품목</label>
                <div
                  className="itemPurchase"
                  />
              </div>

              <div className="recruit_purchase">
                <label className="detailform">모집인원</label>
                <div
                  className="recruitPurchase"
                  />
              </div>

              <div className="cost_purchase">
                <label className="detailform">공동구매 비용</label>
                <div 
                  className="costPurchase"
                  />
                <p id='won'>원</p>
              </div>

              <div className="deadline_purchase">
                <label className="detailform">마감일</label>
                <div 
                  className="DeadlinePurchase"
                  />
            </div>
            </div>
        </div>

            <div className="ingredientStatus">
              <label id="IngredientStatus">재료상태</label>
              <br></br>
            <div className="IngredientStatus"/>
            </div>

     

            <div className="LowerUserHelp">
              <button className = "like">찜</button>
              <button className = "application">신청하기</button>
              <div className='sendMessage'>
              {userId && (
          <Link to={{ pathname: `/chatting` }}>
            <button className='SendMessage' onClick={addChatroom}>쪽지</button>
          { chatrooms.map((chatroom, index) => (
            <ChatroomItem key={index} userId={chatroom} />
          ))}
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