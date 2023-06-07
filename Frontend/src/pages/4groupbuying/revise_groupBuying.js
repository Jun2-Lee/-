import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import ImgUpload2 from '../../components/imgUpload2'
import AddressSelect2 from '../../components/addressSelect2'
import './revise_groupBuying.css'

export default function RevisegroupBuying() {
    const [data, setData] = useState({});
    const { postId } = useParams();
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState('')
    const [product, setProduct] = useState('')
    const [link, setLink] = useState('')
    const [price, setPrice] = useState('')
    const [memberLimit, setMemberLimit] = useState('')
    const [deadLine, setDeadLine] = useState('')
    const [dong, setDong] = useState('')
    const [gu, setGu] = useState('')
    const [content, setContent] = useState('')
    const [image, setImage] = useState('')

    const [groupBuyingRequestDto, setGroupBuyingRequestDto] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://3.36.144.128:8080/api/groupBuying/${postId}`);
        const data = response.data;
        setData(data)
        setTitle(data.title)
        setCategory(data.category)
        setProduct(data.product)
        setLink(data.link)
        setPrice(data.price)
        setMemberLimit(data.memberLimit)
        setDeadLine(data.deadLine)
        setDong(data.dong)
        setGu(data.gu)
        setContent(data.content)
        setPostImage(null)
        setImage(data.postImage)

        setGroupBuyingRequestDto({
          title: data.title,
          category: data.category,
          product: data.product,
          link: data.link,
          price: data.price,
          memberLimit: data.memberLimit,
          deadLine: data.deadLine,
          dong: data.dong,
          gu: data.gu,
          content: data.content,
          image: data.postImage 
        })
        setPostImage(null)

      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [postId]);

  //음식 카테고리 선택
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
    setGroupBuyingRequestDto({
      ...groupBuyingRequestDto,
      category: e.target.value
    })
    setData({
      ...data,
      category: e.target.value
    });
  }

  function handleDetailChange(e) {
    setSelectedDetail(e.target.value);
    setGroupBuyingRequestDto({
      ...groupBuyingRequestDto,
      product: e.target.value
    })
    setData({
      ...data,
      product: e.target.value
    });
}

  //이미지 업로드
  const [postImage, setPostImage] = useState("");
  const [imgsrc, setImgsrc] = useState("");

  function handleImg(selectedImgValue) {
    setPostImage(selectedImgValue)
    //setImgsrc(data.postImage)
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

  const onChange = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value
    });
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
      

      const accessToken = localStorage.getItem('accessToken')
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
      axios.put(`http://3.36.144.128:8080/api/groupBuying/${postId}`, form, {headers})
        .then(function(response) {
          console.log(response)
          alert("수정되었습니다")
          navigate('/groupBuying')
        }) .catch(function(error) {
          console.log(error)
        })
      }
    }
    console.log(groupBuyingRequestDto)
    
    return (
      <div className='groupBuying_container'>
        <form onSubmit={onSubmit}>
          <div className="Title">
            <label className="form-label">제목</label>
            <input name='title' onChange={onChange} value={data.title} className="title" />
          </div>
          
          <div className="product_classification">
            <label className="form-label">카테고리</label>
            <select name={category} onChange={handleFoodChange} value={data.category} className="category">
              {foodTypes.map((foodType) => (
              <option value={foodType} key={foodType}> {foodType} </option>
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

          <div className="Link">
            <label className="form-label">링크</label>
            <input name='link' onChange={onChange} value={data.link} className="link" />
          </div>

          <div className="productImg_upload">
            <label className="form-label">사진<br></br>(필수)</label>
            <ImgUpload2 onSelectedImg={handleImg} image={image} />
          </div>

          <div className="TotalGroupBuying">
            <label className="form-label">공동구매 비용</label>
            <input name='price' onChange={onChange} value={data.price} className="totalGroupBuying" />
            <label id="won">원</label>
          </div>

          <div className="NumPeople_groupBuying">
            <label className="form-label">모집인원</label>
            <input name='memberLimit' onChange={onChange} value={data.memberLimit} className="numPeople_groupBuying" />
            <label id="myeong">명</label>
          </div>

          <div className="Deadline_groupBuying">
            <label className="form-label">마감일</label>
            <input name='deadLine' onChange={onChange} value={data.deadLine} type="datetime-local" className="deadline" />
          </div>

          <div className="address">
            <label className="form-label">사는 동네</label>
            <AddressSelect2 onSelectedGu={handleSelectedGu} onSelectedDong={handleSelectedDong} dong={data.dong} gu={data.gu}/>
          </div>

          <div className="Explanation">
            <label className="form-label">설명(기타사항)</label>
            <input name='content' onChange={onChange} value={data.content} className="explanation" />
          </div>

          <div className="submit">
            <input type="submit" className="post_delivery" value="수정하기" />
          </div>
        </form>
      </div>
    );
}