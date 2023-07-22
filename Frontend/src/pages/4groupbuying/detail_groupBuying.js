import './detail_groupBuying.css';
import 'moment/locale/ko';
import React  from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

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
      }
    })
    .catch((error) => {
      console.log(error);
    });
}, [postId]);

const handlePostReply = () => {
  const headers = {
    'Content-Type': 'application/json'
  };
  

  const accessToken = localStorage.getItem("accessToken");
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
  axios
    .post(`http://3.36.144.128:8080/api/groupBuying/${postId}/${commentId}/childComment`, { content: replyDto.reply }, { headers })
    .then((response) => {
      setReplyDto({ reply: '' }); //답글 작성 후 입력창 초기화
      // 답글 목록 업데이트
      axios
        .get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
        .then((response) => {
          setReplyDto(response.data.commentList);
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

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
  if (localStorage.getItem('refreshToken') === 'null') {
    alert("로그인을 해주세요.");
    navigate('/login');
  }
  else {
    const accessToken = localStorage.getItem("accessToken");
axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

axios.get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
  .then((response) => {
    const Id = response.data.commentList.map((id) => id.id);
    setIdComment(Id);
    setPostTimeComment(new Date(response.data.commentList.postTime).toLocaleDateString("ko-KR"));
    setPostTimeComment(postTime);
  })
  .catch((error) => {
    console.log(error);
  });
  }
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
      setCommentDto({ comment: '' }); // 댓글 작성 후 입력창 초기화

                // 댓글 목록 업데이트
                axios
                .get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
                .then((response) => {
                  setComments(response.data.commentList);
                  window.location.reload();
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
             <p className="userProfile"><img src={comment.profileImage} style={{borderRadius: '50%'}}/></p>
        <p className="userName">{comment.author}님</p>
        <p className="userComment">{comment.content}</p>

        <button className="reply"style={{marginRight:"10px"}} onClick={() => setShowReplyInputBox(comment.id)}>
        답글
        </button>
        {showReplyInputBox === comment.id && (
          <ShowReplyInputBox postId={postId} commentId={comment.id} />
        )}
       <div className="userPostTime">{new Date(comment.postTime).toLocaleString("ko-KR").replace('T', ' ').slice(0, -3)}</div>

        <div className="commentline"><img alt="commentLineImg" src="/assets/img/commentLine.png"/></div>


        <div className="replyCommentBox"style={{marginTop:"-50px", marginLeft:"50px"}}>
          {comment.childCommentResponseDto && comment.childCommentResponseDto.map((reply) => (
            <div key={reply.id} className="replyReply"  style={{backgroundColor:"var(--sub_orange)"}}>
              <p className="userProfileReply"><img src={reply.profileImage} style={{borderRadius: '50%'}}/></p>
              <p className="userNameReply">{reply.author}님</p>
              <p className="userCommentReply">{reply.content}</p>
              <button className="reply" style={{marginRight:"10px"}} onClick={() => setShowReplyInputBox(reply.id)}>
                답글
              </button>
              {showReplyInputBox === reply.id && (
                <ShowReplyInputBox postId={postId} commentId={comment.id} />
              )}
                 <div className="userPostTimeReply">{new Date(comment.postTime).toLocaleString("ko-KR").replace('T', ' ').slice(0, -3)}</div>
              <div className="commentlineReply"><img alt="commentLineImg" src="/assets/img/commentLine.png"/>
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
    const [isMine, setIsMine] = useState(false);
    const [isFinish, setFinished] = useState(false);
    
    useEffect(() => {
      if (localStorage.getItem('refreshToken') === 'null') {
        alert("로그인을 해주세요.");
        navigate('/login');
      }
      else {
        const accessToken = localStorage.getItem("accessToken")
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
        
        axios.get(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
          .then(response => {
            setData(response.data);
            setUserId(response.data.userId);
            //yyyy-mm-dd로 변환
            setPostTime(new Date(response.data.postTime).toLocaleDateString("ko-KR"));
            setDeadline(new Date(response.data.deadLine).toLocaleDateString("ko-KR"));
            if (response.data.checkMine) setIsMine(true);
          })
          .catch(error => console.log(error));
        }
    }, [postId, getUserId]); //postId에 의존(postId에 따라 재실행)

    //게시물 삭제
    const navigate = useNavigate();
    function handleDelete() {
        axios.delete(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
          .then(() => {
            alert("삭제되었습니다")
            navigate("/groupBuying")
          })
          .catch(error => {
            console.log(error)
          });

     
    }

    function handleRevise() {
      navigate(`/reviseGroupBuying/${postId}`)
    } 

    const handleClipping = (e) => {
      e.preventDefault();
      axios.post(`http://3.36.144.128:8080/api/groupBuying/${postId}/like`)
        .then(response => {
          alert("찜 목록은 마이페이지에서 확인하실 수 있습니다.");
        })
        .catch(error => console.log(error))
    }

    const handleApplication = (e) => {
      e.preventDefault();
      axios.post(`http://3.36.144.128:8080/api/groupBuying/${postId}`)
        .then(() => {
          alert("신청 목록은 마이페이지에서 확인하실 수 있습니다.");
        })
        .catch(error => console.log(error))
    }

    const handleFinishing = (e) => {
      e.preventDefault();
      axios.post(`http://3.36.144.128:8080/api/groupBuying/${postId}/finish`) 
        .then(response => {
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
            {data.nickName} 님
          </div>
            <div>
              {isMine && <button className = "modify_sharing" onClick={handleRevise}>수정하기</button>}
              {isMine && <button className = "delete_sharing" onClick={handleDelete}>삭제하기</button>}
              <div className="postTime"> {postTime} </div>
            </div>
          </div>

          <div className='component_sharing'>
            <div>
              <Link to={data.link}>
                <div className='sharedetailImg'>
                  <img src={data.postImage} />
                </div>
              </Link>
              <div style={{marginTop: '5px', backgroundColor: 'var(--main_orange)', color: 'white', padding: '0px 3px'}}>이미지를 클릭하면 상품 링크로 이동할 수 있습니다</div>
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
                <label htmlFor="detailform_sharing">모집인원</label>
                <div
                  className="expirySharing">
                    {data.currentMember} / {data.memberLimit} 명
                  </div>
              </div>

              <div className="expiry_sharing">
                <label htmlFor="detailform_sharing">공동구매 비용</label>
                <div
                  className="expirySharing">
                    {data.price}원
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
                        {data.gu} {data.dong} 
                      </div>
                    </div>
                      
                  </div>
              </div>

          <div style={{display: 'flex', justifyContent: 'center'}}>
            <div className="ingredient_sharing">
              <div className="Ingredient_sharing_content">
                {data.content}
            </div>
          </div>
          
          </div>

          <div className="LowerUserHelp_sharing">
            {!isMine && <button className="shareLike" onClick={handleClipping}>찜</button>}
            {!isMine && <button className="finishSharing" style={{marginRight: '25px'}} onClick={handleApplication}>신청하기</button>}
            {!isMine && <button className="shareApplication">쪽지</button>}
            {isMine && <button className="finishSharing" onClick={handleFinishing}>거래 완료</button>}
          </div>  

          <div className='purchase_comment' style={{display: 'flex', justifyContent: 'center', margin: '30px'}}>       
              <div>
                <Post commentId={commentId}/>
              </div>
          </div>
        </div> 
      </div>
    )
}

export default DetailGroupBuying;
          
