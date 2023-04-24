import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddressSelect2 from '../../components/addressSelect2';
import ImgUpload2 from '../../components/imgUpload2';
import axios from "axios";

function Revisesharing() {
    const [data, setData] = useState({});
    const { postId } = useParams();
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [product, setProduct] = useState('')
    const [expiry, setExpiry] = useState('')
    const [deadLine, setDeadLine] = useState('')
    const [dong, setDong] = useState('')
    const [gu, setGu] = useState('')
    const [content, setContent] = useState('')

    const [selectedFood, setSelectedFood] = useState('');
    const [selectedDetail, setSelectedDetail] = useState('');

    const [sharingRequestDto, setSharingRequestDto] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.36.144.128:8080/api/sharing/${postId}`);
        const data = response.data;
        setData(data)
        setTitle(data.title) 
        setCategory(data.category)
        setProduct(data.product)
        setDong(data.dong)
        setGu(data.gu)
        setContent(data.content)
        setExpiry(data.expiry)
        setDeadLine(data.deadLine)
        setImage(data.image)

        setSelectedFood(data.category)
        setSelectedDetail(data.product)

        setSharingRequestDto({
          title: data.title,
          category: data.category,
          product: data.product,
          dong: data.dong,
          gu: data.gu,
          content: data.content,
          expiry: data.expiry,
          deadLine: data.deadLine,
          image: data.image
        })
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [postId]);

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
  
  function handleFoodChange(e) {
      setSelectedFood(e.target.value);
      setSelectedDetail('');
      setSharingRequestDto({
        ...sharingRequestDto,
        category: e.target.value
      })
      setData({
        ...data,
        category: e.target.value
      });
  }

  function handleDetailChange(e) {
      setSelectedDetail(e.target.value);
      setSharingRequestDto({
        ...sharingRequestDto,
        product: e.target.value
      })
      setData({
        ...data,
        product: e.target.value
      });
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
  const [image, setImage] = useState("");
  const [imgsrc, setImgsrc] = useState("");

  function handleImg(selectedImgValue) {
    setImage(selectedImgValue)
    setImgsrc(URL.createObjectURL(selectedImgValue))
  }

  //axios header 선언
  const headers = {
    'Content-Type': 'multipart/form-data'
  }

  const onChange = (e) => {
    const { value, name } = e.target;
    setData({
        ...data,
        [name]: value
      });
    setSharingRequestDto({
      ...sharingRequestDto,
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
      alert("품목을 선택해주세요")
    }
    else if (image.length === 0) {
      alert("사진을 업로드 해주세요")
    }
    else if (gu.length === 0) {
      alert("사는 동네를 선택해주세요")
    }
    else if (dong.length === 0) {
      alert("동을 선택해주세요")
    }
    else if (expiry.length === 0) {
      alert("유통기한을 선택해주세요")
    }
    else if (deadLine.length === 0) {
      alert("마감일을 선택해주세요")
    }
    
    else {
      const form = new FormData()
      form.append('postImage', image)
      form.append('sharingRequestDto', new Blob([JSON.stringify(sharingRequestDto)], {
        type: "application/json"
      }))

      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      axios.put(`http://3.36.144.128:8080/api/sharing/${postId}`, form, {headers})
        .then(function(response) {
          console.log(response)
          alert("수정되었습니다")
          navigate('/sharing')
        }) .catch(function(error) {
          console.log(error)
        })
      }
    }
    console.log(selectedFood)
    console.log(sharingRequestDto)

    return (
        <div className='postSharing_container'>
            <form onSubmit={onSubmit}>
                <div className="Title">
                    <label className="form-label">제목</label>
                    <input name='title' onChange={onChange} value={data.title} className="title"/>
                </div>
                
                <div className="food_classification">
                    <label className="form-label">카테고리</label>
                    <select className='category' value={data.category} onChange={handleFoodChange}>
                    <option value="">분류</option>
                    {Object.keys(foodTypes).map((foodtype) => (
                        <option key={foodtype} value={foodtype}>{foodtype}</option>
                    ))}
                    </select>
                </div>

                <div className='product_container'>
                    <label className="form-label">품목</label>
                    <select className='category2' value={data.product} onChange={handleDetailChange} disabled={!selectedFood}>
                        <option value="">상세 분류</option>
                        {foodTypes[selectedFood] && foodTypes[selectedFood].map((foodtype2) => (
                            <option key={foodtype2} value={foodtype2}>{foodtype2}</option>
                        ))}
                    </select>
                </div>

                <div className="foodImg_upload">
                    <label className="form-label">사진<br></br>(필수)</label>
                    <ImgUpload2 onSelectedImg={handleImg} image={data.image}/>
                </div>
                
                <div className="address">
                    <label className="form-label">사는 동네</label>
                    <AddressSelect2 onSelectedGu={handleSelectedGu} onSelectedDong={handleSelectedDong} dong={data.dong} gu={data.gu}/>
                </div>

                <div className="food_condition">
                    <label className="form-label">재료상태</label>
                    <input name='content' onChange={onChange} value={data.content} className="foodCondition"/>
                </div>
                
                <div className="expiry_container">
                    <label className="form-label">유통기한</label>
                    <input name='expiry' onChange={onChange} value={data.expiry} type="datetime-local" className="expiration_date" />
                </div>

                <div className='deadLine_container'>
                    <label className="form-label">마감일</label>
                    <input name='deadLine' onChange={onChange} value={data.deadLine} type="datetime-local" className="deadline" />
                </div>

                <div className="submit">
                    <input type="submit" className="post_sharing" value="등록하기"></input>
                </div>
            </form>
        </div>
    );
}

export default Revisesharing