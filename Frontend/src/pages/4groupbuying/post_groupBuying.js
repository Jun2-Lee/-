import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ImgUpload from '../../components/imgUpload'
import AddressSelect from '../../components/addressSelect'
import './post_groupBuying.css'

function PostgroupBuying() {
  //음식 카테고리 선택
  const foodTypes = ['채소', '과일/견과/쌀', '수산물/건해산', '정육/계란', '우유/유제품', '면류/통조림', '샐러드/간편식', '양념', '생수/음료', '간식/과자/떡']
  const [selectedFood, setSelectedFood] = useState('');

  function handleFoodChange(e) {
    setSelectedFood(e.target.value);
    setGroupBuyingRequestDto({
      ...groupBuyingRequestDto,
      category: e.target.value
    })
  }

  //이미지 업로드
  const [postImage, setPostImage] = useState("");
  const [imgsrc, setImgsrc] = useState("");

  function handleImg(selectedImgValue) {
    setPostImage(selectedImgValue)
    setImgsrc(URL.createObjectURL(selectedImgValue))
  }

  // 주소 선택
  const [selectedGu, setSelectedGu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');

  function handleSelectedGu(selectedGuValue) {
    setSelectedGu(selectedGuValue)
    setGroupBuyingRequestDto({
      ...groupBuyingRequestDto,
      gu: selectedGuValue
    })
  }

  function handleSelectedDong(selectedDongValue) {
    setSelectedDong(selectedDongValue)
    setGroupBuyingRequestDto({
      ...groupBuyingRequestDto,
      dong: selectedDongValue
    })
  }

  //axios header 선언
  const headers = {
    'Content-Type': 'multipart/form-data'
  }

  const [groupBuyingRequestDto, setGroupBuyingRequestDto] = useState({
    title: '',
    category: '',
    product: '',
    link: '',
    price: '',
    memberLimit: '',
    deadLine: '',
    dong: '',
    gu: '',
    content: ''
  });

  const { title, category, product, link, price, memberLimit, deadLine, dong, gu, content } = groupBuyingRequestDto;

  const onChange = (e) => {
    const { value, name } = e.target;
    setGroupBuyingRequestDto({
      ...groupBuyingRequestDto,
      [name]: value
    })
  };

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();
    
    if (title.length === 0) {
      alert("제목을 입력해주세요")
    }
    else if (category.length === 0) {
      alert("카테고리를 선택해주세요")
    }
    else if (product.length === 0) {
      alert("상품명을 입력해주세요")
    }
    /*else if (link.length === 0) {
      alert("링크를 입력해주세요")
    }*/
    else if (postImage.length === 0) {
      alert("사진을 업로드 해주세요")
    }
    else if (price.length === 0) {
      alert("공동구매 비용을 입력해주세요")
    }
    else if (isNaN(price)) {
      alert("공동구매 비용을 숫자로 입력해주세요")
    }
    else if (memberLimit.length === 0) {
      alert("모집인원을 입력해주세요")
    }
    else if (isNaN(memberLimit)) {
      alert("모집인원을 숫자로 입력해주세요")
    }
    else if (deadLine.length === 0) {
      alert("마감일을 선택해주세요")
    }
    else if (gu.length === 0) {
      alert("사는 동네를 선택해주세요")
    }
    else if (dong.length === 0) {
      alert("동을 선택해주세요")
    }
    else {
      const form = new FormData()
      form.append('postImage', postImage)
      form.append('groupBuyingRequestDto', new Blob([JSON.stringify(groupBuyingRequestDto)], {
        type: "application/json"
      }))

      axios.post("http://3.36.144.128:8080/api/groupBuying", form, {headers})
        .then(function(response) {
          console.log(response)
          alert("등록되었습니다")
          navigate('/groupBuying')
        }) .catch(function(error) {
          console.log(error)
        })
      }
    }

    return (
      <div className='groupBuying_container'>
        <form onSubmit={onSubmit}>
          <div className="Title">
            <label className="form-label">제목</label>
            <input name='title' onChange={onChange} value={title} className="title"/>
          </div>
          
          <div className="product_classification">
            <label className="form-label">카테고리</label>
            <select name={category} onChange={handleFoodChange} value={selectedFood} className="category">
              {foodTypes.map((foodType) => (
              <option value={foodType} key={foodType}> {foodType} </option>
              ))}
            </select>
          </div>

          <div className="ProductName">
            <label className="form-label">상품명</label>
            <input name='product' onChange={onChange} value={product} className="productName"/>
          </div>

          <div className="Link">
            <label className="form-label">링크</label>
            <input name='link' onChange={onChange} value={link} className="link"/>
          </div>

          <div className="productImg_upload">
            <label className="form-label">사진<br></br>(필수)</label>
            <ImgUpload onSelectedImg={handleImg} />
          </div>

          <div className="TotalGroupBuying">
            <label className="form-label">공동구매 비용</label>
            <input name='price' onChange={onChange} value={price} className="totalGroupBuying" />
            <label id="won">원</label>
          </div>

          <div className="NumPeople_groupBuying">
            <label className="form-label">모집인원</label>
            <input name='memberLimit' onChange={onChange} value={memberLimit} className="numPeople_groupBuying" />
            <label id="myeong">명</label>
          </div>

          <div className="Deadline_groupBuying">
            <label className="form-label">마감일</label>
            <input name='deadLine' onChange={onChange} value={deadLine} type="datetime-local" className="deadline" />
          </div>

          <div className="address">
            <label className="form-label">사는 동네</label>
            <AddressSelect onSelectedGu={handleSelectedGu} onSelectedDong={handleSelectedDong}/>
          </div>

          <div className="Explanation">
            <label className="form-label">설명(기타사항)</label>
            <input name='content' onChange={onChange} value={content} className="explanation" />
          </div>

          <div className="submit">
            <input type="submit" className="post_delivery" value="등록하기" />
          </div>
        </form>
      </div>
    );
}

export default PostgroupBuying;