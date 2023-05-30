import commentLine from '../../assets/img/commentLine.png';

import './detail_sharing.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

function DetailSharing() {
  
  const [data, setData] = useState({});
  //yyyy-mm-dd로 변환
  const [postTime, setPostTime] = useState('');
  const [expiry, setExpiry] = useState('');
  const [deadLine, setDeadline] = useState('');
  const [isMine, setIsMine] = useState(false);
  const [isFinish, setFinished] = useState(false);

  const [comments, setComments] = useState([]);
  const [idComment, setIdComment] = useState([]);
  const [getUserId, setUserId] = useState([]);
  let [isValid, setIsValid] = useState(false);
  const { postId } = useParams();
  const { commentId } = useParams();
  const ShowReplyInputBox = ({postId, commentId}) => {
   
    const [replyDto_, setReplyDto_] = useState({ reply: '' });
    const onChange = (e) => {
      const { value } = e.target;
      setReplyDto_({
        ...replyDto_,
        reply: value
      });
  
    };
    useEffect(() => {
  const accessToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios
    .get(`http://3.36.144.128:8080/api/sharing/${postId}`)
    .then((response) => {
      if (response.data.commentResponseDtoList) {
        const contentsReply = response.data.commentResponseDtoList.map(comment => comment.childCommentResponseDto.map(reply => reply.content));
        setReplyDto_(prevState => ({ ...prevState, reply: contentsReply }));
        console.log(data);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}, [postId]);
useEffect(() => {
  console.log(replyDto_);
}, [replyDto_]);
console.log(replyDto_);
const handlePostReply = () => {
    
  console.log(commentId);
  const headers = {
    'Content-Type': 'application/json'
  };
  

  const accessToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios
    .post(`http://3.36.144.128:8080/api/sharing/${postId}/${commentId}/childComment`, { content: replyDto_.reply }, { headers })
    .then((response) => {
      console.log(response);
      alert("등록되었습니다");
      setReplyDto_({ reply: '' }); //답글 작성 후 입력창 초기화
      // 답글 목록 업데이트
      axios
        .get(`http://3.36.144.128:8080/api/sharing/${postId}`)
        .then((response) => {
          setReplyDto_(response.data.commentResponseDtoList);
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
  console.log(replyDto_);
}, [replyDto_]);

console.log(replyDto_);
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
  .get(`http://3.36.144.128:8080/api/sharing/${postId}`)
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

const Post = () => {
const [commentDto_, setCommentDto_] = useState({comment:''});
const{comment} = commentDto_;

const [showReplyInputBox, setShowReplyInputBox] = useState(null);
const headers = {
  'Content-Type': 'application/json'
}

const onChange = (e) => {
  const { value, name } = e.target;
  setCommentDto_({
    ...commentDto_,
    comment: value
  });
};

const body = JSON.stringify({ content: comment })
const handlePost = () => {
  const accessToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios
    .post(`http://3.36.144.128:8080/api/sharing/${postId}/comment`, { content: comment }, { headers })
    .then((response) => {
      console.log(response);
      alert("등록되었습니다");
      setCommentDto_({ comment: '' }); // 댓글 작성 후 입력창 초기화

                // 댓글 목록 업데이트
                axios
                .get(`http://3.36.144.128:8080/api/sharing/${postId}`)
                .then((response) => {
                  setComments(response.data.commentResponseDtoList);
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
            .get(`http://3.36.144.128:8080/api/sharing/${postId}`)
            .then((response) => {
              const contents = response.data.commentResponseDtoList.map((comment) => comment.content);
            
              setCommentDto_(prevState => ({ ...prevState, comment: contents }));
     
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
        }, [postId]);
    
        useEffect(() => {
          console.log(commentDto_);
        }, [commentDto_]);
        console.log(commentDto_);

        return (
          <div>
               <div className='inputcomment'>
  <div className="userCommentBox">
    {data.commentResponseDtoList && data.commentResponseDtoList.map((comment) => (
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
            <div key={reply.id} className="reply"  style={{backgroundColor:"var(--sub_orange)"}}>
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
          <label className="detailform_sharing">카테고리</label>
          <div className="categorySharing">
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

                <div className="deadline_sharing">
                  <label className="detailform_sharing">사는 동네</label>
                  <div className="DeadlineSharing">
                    {data.dong} {data.gu}
                  </div>
                </div>
                  
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
        {!isMine && <button className="shareLike" onClick={handleClipping}>찜</button>}
        {!isMine && <button className="shareApplication">쪽지</button>}
        {isMine && <button className="finishSharing" onClick={handleFinishing}>거래 완료</button>}
      </div>


      <div className='sharing_comment'>
                          
                          <Post commentId={commentId}/>
                        
                    </div>
    </div>

  

</div>

    
  
  )
}

export default DetailSharing;
