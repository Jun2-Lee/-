import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './post_sharing.css';
import AddressSelect from '../../components/addressSelect';
import ImgUpload from '../../components/imgUpload';
import axios from "axios";

function PostSharing() {
  // 음식 카테고리, 상세분류 선택
  const foodTypes = {
    '채소': ['고구마/감자/당근', '시금치/쌈채소/나물','브로콜리/파프리카/양배추', '양파/대파/마늘/배추', '오이/호박/고추', '콩나물/버섯'],
    '과일/견과/쌀': ['제철과일', '국산과일', '수입과일', '간편과일', '냉동/건과일', '견과류', '쌀/잡곡'],
    '수산물/건해산': ['생선류', '굴비/반건류', '오징어/낙지/문어', '새우/게/랍스터', '해산물/조개류', '김/미역/해조류'],
    '정육/계란': ['소고기', '돼지고기', '닭/오리고기', '양고기', '계란류'],
    '우유/유제품': ['우유', '요거트/요구르트', '두유', '치즈', '버터/생크림'],
    '면류/통조림': ['라면', '파스타면', '참치/스팸', '옥수수 통조림'],
    '샐러드/간편식': ['샐러드/닭가슴살', '도시락', '피자/핫도그/만두', '죽/스프', '시리얼'],
    '양념': ['식초/소스/드레싱', '양념/액젓/장류', '식용유/참기름/오일', '소금/설탕/향신료', '밀가루/믹스'],
    '생수/음료': ['생수/탄산수', '음료', '커피', '차'],
    '간식/과자/떡': ['과자/쿠키', '초콜릿/젤리/캔디', '떡/한과', '아이스크림']
  };  
  
  const [selectedFood, setSelectedFood] = useState('');
  const [selectedDetail, setSelectedDetail] = useState('');

  function handleFoodChange(e) {
      setSelectedFood(e.target.value);
      setSelectedDetail('');
      setSharingRequestDto({
        ...sharingRequestDto,
        category: e.target.value
      })
  }

  function handleDetailChange(e) {
      setSelectedDetail(e.target.value);
      setSharingRequestDto({
        ...sharingRequestDto,
        product: e.target.value
      })
  }

  // 주소 선택
  const [selectedGu, setSelectedGu] = useState('');
  const [selectedDong, setSelectedDong] = useState('');

  function handleSelectedGu(selectedGuValue) {
    setSelectedGu(selectedGuValue)
    setSharingRequestDto({
      ...sharingRequestDto,
      gu: selectedGuValue
    })
  }

  function handleSelectedDong(selectedDongValue) {
    setSelectedDong(selectedDongValue)
    setSharingRequestDto({
      ...sharingRequestDto,
      dong: selectedDongValue
    })
  }

  //이미지 업로드
  const [postImage, setPostImage] = useState("");
  const [imgsrc, setImgsrc] = useState("");

  function handleImg(selectedImgValue) {
    setPostImage(selectedImgValue)
    setImgsrc(URL.createObjectURL(selectedImgValue))
  }

  //axios header 선언
  const headers = {
    'Content-Type': 'multipart/form-data'
  }

  const [sharingRequestDto, setSharingRequestDto] = useState({
    title: '',
    category: '',
    product: '',
    content: '',
    expiry: '',
    deadLine: '',
    dong: '',
    gu: '',
  });

  const { title, category, product, content, expiry, deadLine, dong, gu } = sharingRequestDto;

  const onChange = (e) => {
    const { value, name } = e.target;
    setSharingRequestDto({
      ...sharingRequestDto,
      [name]: value
    })
  };

  const navigate = useNavigate();
  const onSubmit = (e) => {
    e.preventDefault();

    const form = new FormData()
    form.append('postImage', postImage)
    form.append('sharingRequestDto', new Blob([JSON.stringify(sharingRequestDto)], {
      type: "application/json"
    }))

    axios.post("http://3.36.144.128:8080/api/sharing", form, {headers})
      .then(function(response) {
        console.log(response)
        navigate('/sharing')
      }) .catch(function(error) {
        console.log(error)
      })
    }

    return (
        <div className='postSharing_container'>
        <form onSubmit={onSubmit}>
          <div className="Title">
            <label className="form-label">제목</label>
            <input name='title' onChange={onChange} value={title} className="title"/>
          </div>
          
          <div className="food_classification">
            <label className="form-label">카테고리</label>
            <select className='category' value={selectedFood} onChange={handleFoodChange}>
              <option value="">분류</option>
              {Object.keys(foodTypes).map((foodtype) => (
                  <option key={foodtype} value={foodtype}>{foodtype}</option>
              ))}
            </select>
          </div>

          <div className='product_container'>
            <label className="form-label">품목</label>
              <select className='category2' value={selectedDetail} onChange={handleDetailChange} disabled={!selectedFood}>
                <option value="">상세 분류</option>
                {foodTypes[selectedFood] && foodTypes[selectedFood].map((foodtype2) => (
                    <option key={foodtype2} value={foodtype2}>{foodtype2}</option>
                ))}
              </select>
          </div>

          <div className="foodImg_upload">
            <label className="form-label">사진<br></br>(필수)</label>
            <ImgUpload onSelectedImg={handleImg} />
          </div>
          
          <div className="address">
            <label className="form-label">사는 동네</label>
            <AddressSelect onSelectedGu={handleSelectedGu} onSelectedDong={handleSelectedDong}/>
          </div>

          <div className="food_condition">
            <label className="form-label">재료상태</label>
            <input name='content' onChange={onChange} value={content} className="foodCondition"/>
          </div>
          
          <div className="expiry_container">
            <label className="form-label">유통기한</label>
            <input name='expiry' onChange={onChange} value={expiry} type="datetime-local" className="expiration_date" />
          </div>

          <div className='deadLine_container'>
            <label className="form-label">마감일</label>
            <input name='deadLine' onChange={onChange} value={deadLine} type="datetime-local" className="deadline" />
          </div>

          <div className="submit">
            <input type="submit" className="post_sharing" value="등록하기"></input>
          </div>
        </form>
      </div>
    );
}

export default PostSharing;