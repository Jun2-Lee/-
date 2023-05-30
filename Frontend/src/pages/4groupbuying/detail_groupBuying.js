import './detail_groupBuying.css';
import 'moment/locale/ko';
import React  from 'react';
import {useState, useEffect,useCallback} from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import commentLine from '../../assets/img/commentLine.png';

function DetailGroupBuying() {
  const [comments, setComments] = useState([]);
  const [idComment, setIdComment] = useState([]);
  const [getUserId, setUserId] = useState([]);
  let [isValid, setIsValid] = useState(false);
  const { postId } = useParams();
  const { commentId } = useParams();
  const ShowReplyInputBox = ({postId, commentId}) => {
   
    const [replyDto, setReplyDto] = useState({ reply: '' });
    const onChange = (e) => {
      const { value } = e.target;
      setReplyDto({
        ...replyDto,
        reply: value
      });
  
    };
    useEffect(() => {
  const accessToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios
    .get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
    .then((response) => {
      if (response.data.commentList) {
        const contentsReply = response.data.commentList.map(comment => comment.childCommentResponseDto.map(reply => reply.content));
        setReplyDto(prevState => ({ ...prevState, reply: contentsReply }));
        console.log(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}, [postId]);
useEffect(() => {
  console.log(replyDto);
}, [replyDto]);
console.log(replyDto);
const handlePostReply = () => {
    
  console.log(commentId);
  const headers = {
    'Content-Type': 'application/json'
  };
  

  const accessToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios
    .post(`http://3.36.144.128:8080/api/groupBuying/${postId}/${commentId}/childComment`, { content: replyDto.reply }, { headers })
    .then((response) => {
      console.log(response);
      alert("등록되었습니다");
      setReplyDto({ reply: '' }); //답글 작성 후 입력창 초기화
      // 답글 목록 업데이트
      axios
        .get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
        .then((response) => {
          setReplyDto(response.data.commentList);
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

useEffect(() => {
  console.log(replyDto);
}, [replyDto]);

console.log(replyDto);
useEffect(() => {
  console.log(commentId);
}, [commentId]);
return (
  <div className='replyBox' >
    <input
      type="text"
      className='inputReply'
      placeholder='답글 작성하기...'
     
      onChange={onChange}
    />
  <div className='buttonReply' >
      <button
        type='submit'
        className='submitReply'
        onClick={(e) => {
          e.preventDefault();
          handlePostReply();
        }}
        disabled={!isValid}
        style={{fontSize:'9px'}}
      >
        등록
      </button>
      
    
    </div>
  </div>
);
};
const [postTimeComment, setPostTimeComment] = useState('');
        
useEffect(() => {
const accessToken = localStorage.getItem("accessToken");
axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

axios
  .get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
  .then((response) => {
    const Id = response.data.commentList.map((id) => id.id);
    setIdComment(Id);
    setPostTimeComment(new Date(response.data.commentList.postTime).toLocaleDateString("ko-KR"));
    setPostTimeComment(postTime);
  })
  .catch((error) => {
    console.log(error);
  });
}, [postId, commentId]);


console.log(idComment);
console.log(commentId)
const Post = () => {
const [commentDto, setCommentDto] = useState({comment:''});
const{comment} = commentDto;

const [showReplyInputBox, setShowReplyInputBox] = useState(null);
const headers = {
  'Content-Type': 'application/json'
}

const onChange = (e) => {
  const { value, name } = e.target;
  setCommentDto({
    ...commentDto,
    comment: value
  });
};

const body = JSON.stringify({ content: comment })
const handlePost = () => {
  const accessToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios
    .post(`http://3.36.144.128:8080/api/groupBuying/${postId}/comment`, { content: comment }, { headers })
    .then((response) => {
      console.log(response);
      alert("등록되었습니다");
      setCommentDto({ comment: '' }); // 댓글 작성 후 입력창 초기화

                // 댓글 목록 업데이트
                axios
                .get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
                .then((response) => {
                  setComments(response.data.commentList);
                  console.log(response.data);
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(error);
            });
        };
       
        
      
        useEffect(() => {
          const accessToken = localStorage.getItem("accessToken");

          axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
          axios
            .get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
            .then((response) => {
              const contents = response.data.commentList.map((comment) => comment.content);
            
              setCommentDto(prevState => ({ ...prevState, comment: contents }));
     
              console.log(data);

        

            })
            .catch((error) => {
              console.log(error);
            });
        }, [postId]);
    
        useEffect(() => {
          console.log(commentDto);
        }, [commentDto]);
        console.log(commentDto);

        return (
          <div>
               <div className='inputcomment'>
  <div className="userCommentBox">
    {data.commentList && data.commentList.map((comment) => (
      <div key={comment.id} className="comment">
             <p className="userProfile"><img src={comment.profileImage}/></p>
        <p className="userName">{comment.author}님</p>
        <p className="userComment">{comment.content}</p>

        <button className="reply"style={{marginRight:"10px"}} onClick={() => setShowReplyInputBox(comment.id)}>
        답글
        </button>
        {showReplyInputBox === comment.id && (
          <ShowReplyInputBox postId={postId} commentId={comment.id} />
        )}
            {console.log(comment.id)}
       <div className="userPostTime">{new Date(comment.postTime).toLocaleString("ko-KR").replace('T', ' ').slice(0, -3)}</div>

        <div className="commentline"><img alt="commentLineImg" src={commentLine}/></div>


        <div className="replyCommentBox"style={{marginTop:"-50px", marginLeft:"50px"}}>
          {comment.childCommentResponseDto && comment.childCommentResponseDto.map((reply) => (
            <div key={reply.id} className="replyReply"  style={{backgroundColor:"var(--sub_orange)"}}>
              <p className="userProfileReply"><img src={reply.profileImage}/></p>
              <p className="userNameReply">{reply.author}님</p>
              <p className="userCommentReply">{reply.content}</p>
              <button className="reply" style={{marginRight:"10px"}} onClick={() => setShowReplyInputBox(reply.id)}>
                답글
              </button>
              {showReplyInputBox === reply.id && (
                <ShowReplyInputBox postId={postId} commentId={comment.id} />
              )}
                 <div className="userPostTimeReply">{new Date(comment.postTime).toLocaleString("ko-KR").replace('T', ' ').slice(0, -3)}</div>
              <div className="commentlineReply"><img alt="commentLineImg" src={commentLine}/>
              </div>
        </div>
          ))}

          </div>
          </div>
    ))}
    </div>
  </div>
  <div className='inputCommentBox'>
          <input
              type="text"
              className='inputComment'
              placeholder='댓글 작성하기...'
              onKeyUp={e => {
                e.target.value.length > 0
                  ? setIsValid(true)
                  : setIsValid(false);
              }}
              
              onChange={onChange}
            />
             <div className='buttonblank'>
            <button
              type='submit'
              className='submitComment'
              onClick={(e) => {
                e.preventDefault();
                handlePost();
              }}
              disabled={!isValid}
            >
              등록
            </button>
            
          
          </div>
          </div>
        </div>
      );
    
  
    }
    
    //지수
    const [data, setData] = useState({});
   
    //yyyy-mm-dd로 변환
    const [postTime, setPostTime] = useState('');
    const [deadLine, setDeadline] = useState('');
    
  
    useEffect(() => {
      const accessToken = localStorage.getItem("accessToken")
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      axios.get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
        .then(response => {
          setData(response.data);
          console.log(data);
          console.log(data.commentList);
          setUserId(response.data.userId);
          
        
         
  
          //yyyy-mm-dd로 변환
          setPostTime(new Date(response.data.postTime).toLocaleDateString("ko-KR"));
          setDeadline(new Date(response.data.deadLine).toLocaleDateString("ko-KR"));
        })
        .catch(error => console.log(error));
    }, [postId, getUserId]); //postId에 의존(postId에 따라 재실행)
    //게시물 삭제
    const navigate = useNavigate();
    function HandleDelete() {
             
      const accessToken = localStorage.getItem('accessToken');
      useEffect(()=>{
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        axios.delete(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
          .then(response => {
            console.log(response)
            alert("삭제되었습니다")
            navigate("/groupBuying")
          })
          .catch(error => {
            console.log(error)
          });
      })
     
    }
    //태영
    function handleRevise() {
      navigate(`/reviseGroupBuying/${postId}`)
    } 

  
    return(
      
      <div className="detail_purchase">
       
            <div className='detail_Title'>
              <p id = "detail_title">{data.title}</p>
            </div>
      
            <div className='userhelp_detail'>
              <button className = "modify" onClick={handleRevise}>수정하기</button>
              <button className = "delete" onClick={HandleDelete}>삭제하기</button>
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
              <div className="sendMessage">
              <Link to={ "/chatting"} state= {{getUserId:getUserId}} >

              <button className="SendMessage" >
                 쪽지
                  </button>
              </Link>
           
      
      </div>
            </div>   
              <div className='purchase_comment'>
                          
                  <Post commentId={commentId}/>
                
            </div>
          </div>
            )
          }
          export default DetailGroupBuying;
          
