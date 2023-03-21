import React  from 'react';
import {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import uuid from 'react-uuid';
import comment, { addComment } from '../../components/redux';
import './index.css';



function ReplyList(){

    
   const ReplyComment = ({responseTo}) => {

      const  [commentValue, setCommentValule] = useState(''); //사용자가 입력하고 있는 댓글
      const  [feedComments, setFeedComments] = useState([]); //댓글 리스트
      const  [isValid, setIsValid] = useState(false); 
      const [text, setText] = useState('')
      const comments = useSelector(state => state.comment)

      let postReply = e => {
        const copyFeedComments = [...feedComments];
        copyFeedComments.push(text); //copyFeedComments에 comment를 push
        setFeedComments(copyFeedComments);//feedComment를 setFeedComment로 변경
        setText('')};//댓글창 초기화

      const dispatch = useDispatch()
  
      const onSubmit = (e) => {
       e.preventDefault();
       setCommentValule(text)
       let data = {
         content:text,
         writer: '뭐먹지 님',
         postId: '123123',
         responseTo: responseTo,
         commentId: uuid()
            }
         dispatch(addComment(data))
        
         setText('')
        }

        useEffect(() => {
            localStorage.setItem('reply', JSON.stringify(comments))
            setFeedComments(comments.filter(comment => comment.responseTo === responseTo))
           
        }, [comments])



        return(
        <div>

          {feedComments.map(comment=>  
            <div  key={comment.commentId}>
        
           <div className='reply_cmp'>
              
              <img className = "replyImg"  src='assets/img/reply.png'>
              </img>
              <img className = "smallImg"  src='assets/img/smallcomment.png'>
              </img>
                
          </div>
          <div className='userReplyBox'>
              <p className='userName' style={{color : "#FF8327"}}>{comment.writer}</p>
              <div className='userComment'>{comment.content}</div>
              <ReplyComment responseTo={comment.commentId} />
          </div>
       
          <div className='inputreply'>
                    <input 
                        onSubmit  = {onSubmit}
                        type="text"
                        className='inputReply'
                        placeholder='답글 작성하기...'
                        onChange = {e => {
                            setText(e.target.value);
                        }}
                        onKeyUp={e=> {
                            e.target.value.length>0
                                ? setIsValid(true)
                                : setIsValid(false);
                        }}
                        value = {text}
                    ></input> 
                    <div className='buttonblankReply'>
                        <button 
                          type='button'
                          className='submitReply'
                          onClick={postReply}
                          disabled={isValid ? false : true}
                          
                    >
                        등록
                      </button>
                      
                    </div>

                    </div>
       

          
      </div>)}

            </div>



        )
        


}}

export default ReplyList;