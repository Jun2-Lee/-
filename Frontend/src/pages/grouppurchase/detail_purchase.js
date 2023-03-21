import './detail_purchase.css';
import moment from 'moment';
import 'moment/locale/ko';
import React  from 'react';
import {useState, useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { addComment } from '../../components/redux';
import ReplyComment from '../../components/replyComment';



function DetailPurchase() {

  const  [commentValue, setCommentValule] = useState(''); //사용자가 입력하고 있는 댓글
  const  [feedComments, setFeedComments] = useState([]); //댓글 리스트
  const  [isValid, setIsValid] = useState(false); 
  const [text, setText] = useState('')
  const comments = useSelector(state => state.comment)
    const nowTime = moment().format('YYYY-MM-DD');

    let post = e => {
      const copyFeedComments = [...feedComments];
      copyFeedComments.push(text); //copyFeedComments에 comment를 push
      setFeedComments(copyFeedComments);//feedComment를 setFeedComment로 변경
      setText('')};//댓글창 초기화

    let data = {
        content:text,
        writer: '뭐먹지 님',
        postId: '123123',
        responseTo: 'root',
        commentId: uuid()
           }
           
    const dispatch = useDispatch()

    const onSubmit = (e) => {
     e.preventDefault();
     setCommentValule(text)
     
       
  }
    
    //댓글 컴포넌트
    const Comment= () => {

      

       dispatch(addComment(data))
      
       setText('')

      useEffect(() => {
        localStorage.setItem('reply', JSON.stringify(comments))
        setFeedComments(comments.filter(comment => comment.responseTo === 'root'))
       
    }, [comments])

    return(
     <div>
      {feedComments.map((comment, index)=>(

        <div key={comment.commentId}>
          <div className='comment_cmp'>
              <img className = "smallimg"  src='assets/img/smallcomment.png'>
              </img>
              
          </div>
          <div className='userCommentBox'>
              <p className='userName' style={{color : "#FF8327",marginLeft:"45px"}}>{comment.writer}</p>
              <div className='userComment' key={index}>{comment.content}</div>
              <ReplyComment responseTo={comment.commentId} />
          </div>

          <div className='Reply'>
            
            <button 
                type='button'
                className='reply'
              
                >답글
            </button>
          </div>
          <div className='commentLine'>
            <img className='commentline' src = 'assets/img/commentLine.png'></img>
          </div>

        
          

          
      </div>


      ))}
      </div>


    )
  }

    
    return(
      <div className="detail_purchase" >
       
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
            </div>   
            
            <div className='comment_cmp1' style={{overflow:'scroll'}} >
           
              <div className='purchase_comment' >
                
                    
                          <Comment/>

                    
                    
                    
                    </div>
              
                  
            </div>
            <div className='commentBox'> 
               <div className='inputcomment'>
                  
                    <input  onSubmit  = {onSubmit}
                        component = "form"
                        type="text"
                        className='inputComment'
                        placeholder='댓글 작성하기...'
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
           
                     </div>
                    

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

            <div className='purchase_reply'>
                
                <ReplyComment/>
              
              
              
            </div>
          </div>
          
        </div>                  
            

      

        )
}

export default DetailPurchase;