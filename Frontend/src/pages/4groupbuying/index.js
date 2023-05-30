import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import GroupBuyingList from '../../components/groupbuyingList'
import "./index.css";
import "./pagination.css";

function Groupbuying() {
  //사진 경로
  const toggleClose = "assets/img/toggleIcon.png"
  const toggleOpen = "assets/img/toggleIconOpen.png"

  //pagination
  const [page, setPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    console.log(pageNumber)
  } 
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  //category
  const [isOpen, setToggle] = useState([false, false, false, false, false, false, false, false, false, false]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleOpenToggle = (index) => {
    let copy = [...isOpen];
    copy[index] = !copy[index];
    setToggle(copy);
  };

  return (
    <div className="groupbuying_body">
      <section className="groupbuying_search">
        {/*<Search />*/}
      </section>
      <section className="groupbuying_categoryBar">
      <div>
          <div style={{ 
            textAlign: "center",
            margin: "1rem",
            fontWeight: "700",
          }}>
              카테고리
          </div>
          <div className='sideBar'>
            <ul className='category'> 
              <div onClick={()=>handleOpenToggle(0)}>
                채소
                {isOpen[0] && <img className='toggleOpen' src={toggleOpen}></img>}
                {!isOpen[0] && <img className='toggleClose' src={toggleClose}></img>}
              </div>
            </ul>
              {isOpen[0] && <div className='sub-category-box'>
                <li className='sub-category' onClick={() => setSelectedCategory('고구마/감자/당근')}>고구마/감자/당근</li>
                <li className='sub-category' onClick={() => setSelectedCategory('시금치/쌈채소/나물')}>시금치/쌈채소/나물</li>
                <li className='sub-category' onClick={() => setSelectedCategory('브로콜리/파프리카/양배추')}>브로콜리/파프리카/양배추</li>
                <li className='sub-category' onClick={() => setSelectedCategory('양파/대파/마늘/배추')}>양파/대파/마늘/배추</li>
                <li className='sub-category' onClick={() => setSelectedCategory('오이/호박/고추')}>오이/호박/고추</li>
                <li className='sub-category' onClick={() => setSelectedCategory('콩나물/버섯')}>콩나물/버섯</li>
              </div>}
            <ul className='category'>
              <div onClick={()=>handleOpenToggle(1)}>
                과일/견과/쌀
                {isOpen[1] && <img className='toggleOpen' src={toggleOpen}></img>}
                {!isOpen[1] && <img className='toggleClose' src={toggleClose}></img>}
              </div>
              <div className='toggleBtn'/>
            </ul>
              {isOpen[1] && <div className='sub-category-box'>
                <li className='sub-category' onClick={() => setSelectedCategory('제철과일')}>제철과일</li>
                <li className='sub-category' onClick={() => setSelectedCategory('국산과일')}>국산과일</li>
                <li className='sub-category' onClick={() => setSelectedCategory('수입과일')}>수입과일</li>
                <li className='sub-category' onClick={() => setSelectedCategory('간편과일')}>간편과일</li>
                <li className='sub-category' onClick={() => setSelectedCategory('냉동/건과일')}>냉동/건과일</li>
                <li className='sub-category' onClick={() => setSelectedCategory('견과류')}>견과류</li>
                <li className='sub-category' onClick={() => setSelectedCategory('쌀/잡곡')}>쌀/잡곡</li>
              </div>}
            <ul className='category'>
              <div onClick={()=>handleOpenToggle(2)}>
                수산물/건해산
                {isOpen[2] && <img className='toggleOpen' src={toggleOpen}></img>}
                {!isOpen[2] && <img className='toggleClose' src={toggleClose}></img>}
              </div>
              <div className='toggleBtn'/>
            </ul>
              {isOpen[2] && <div className='sub-category-box'>
                <li className='sub-category' onClick={() => setSelectedCategory('생선류')}>생선류</li>
                <li className='sub-category' onClick={() => setSelectedCategory('굴비/반건류')}>굴비/반건류</li>
                <li className='sub-category' onClick={() => setSelectedCategory('오징어/낙지/문어')}>오징어/낙지/문어</li>
                <li className='sub-category' onClick={() => setSelectedCategory('새우/게/랍스터')}>새우/게/랍스터</li>
                <li className='sub-category' onClick={() => setSelectedCategory('해산물/조개류')}>해산물/조개류</li>
                <li className='sub-category' onClick={() => setSelectedCategory('김/미역/해조류')}>김/미역/해조류</li>
              </div>}
            <ul className='category'>
              <div onClick={()=>handleOpenToggle(3)}>
                정육/계란
                {isOpen[3] && <img className='toggleOpen' src={toggleOpen}></img>}
                {!isOpen[3] && <img className='toggleClose' src={toggleClose}></img>}
              </div>
              <div className='toggleBtn'/>
            </ul>
              {isOpen[3] && <div className='sub-category-box'>
                <li className='sub-category' onClick={() => setSelectedCategory('소고기')}>소고기</li>
                <li className='sub-category' onClick={() => setSelectedCategory('돼지고기')}>돼지고기</li>
                <li className='sub-category' onClick={() => setSelectedCategory('닭/오리고기')}>닭/오리고기</li>
                <li className='sub-category' onClick={() => setSelectedCategory('양고기')}>양고기</li>
                <li className='sub-category' onClick={() => setSelectedCategory('계란류')}>계란류</li>
              </div>}
            <ul className='category'>
              <div onClick={()=>handleOpenToggle(4)}>
                우유/유제품
                {isOpen[4] && <img className='toggleOpen' src={toggleOpen}></img>}
                {!isOpen[4] && <img className='toggleClose' src={toggleClose}></img>}
              </div>
              <div className='toggleBtn'/>
            </ul>
              {isOpen[4] && <div className='sub-category-box'>
                <li className='sub-category' onClick={() => setSelectedCategory('우유')}>우유</li>
                <li className='sub-category' onClick={() => setSelectedCategory('요거트/요구르트')}>요거트/요구르트</li>
                <li className='sub-category' onClick={() => setSelectedCategory('두유')}>두유</li>
                <li className='sub-category' onClick={() => setSelectedCategory('치즈')}>치즈</li>
                <li className='sub-category' onClick={() => setSelectedCategory('버터/생크림')}>버터/생크림</li>
              </div>}
            <ul className='category'>
              <div onClick={()=>handleOpenToggle(5)}>
                면류/통조림
                {isOpen[5] && <img className='toggleOpen' src={toggleOpen}></img>}
                {!isOpen[5] && <img className='toggleClose' src={toggleClose}></img>}
              </div>
              <div className='toggleBtn'/>
            </ul>
              {isOpen[5] && <div className='sub-category-box'>
                <li className='sub-category' onClick={() => setSelectedCategory('라면')}>라면</li>
                <li className='sub-category' onClick={() => setSelectedCategory('파스타면')}>파스타면</li>
                <li className='sub-category' onClick={() => setSelectedCategory('참치/스팸')}>참치/스팸</li>
                <li className='sub-category' onClick={() => setSelectedCategory('옥수수 통조림')}>옥수수 통조림</li>
              </div>}
            <ul className='category'>
              <div onClick={()=>handleOpenToggle(6)}>
                샐러드/간편식
                {isOpen[6] && <img className='toggleOpen' src={toggleOpen}></img>}
                {!isOpen[6] && <img className='toggleClose' src={toggleClose}></img>}
              </div>
              <div className='toggleBtn'/>
            </ul>
              {isOpen[6] && <div className='sub-category-box'>
                <li className='sub-category' onClick={() => setSelectedCategory('샐러드/닭가슴살')}>샐러드/닭가슴살</li>
                <li className='sub-category' onClick={() => setSelectedCategory('도시락')}>도시락</li>
                <li className='sub-category' onClick={() => setSelectedCategory('피자/핫도그/만두')}>피자/핫도그/만두</li>
                <li className='sub-category' onClick={() => setSelectedCategory('죽/스프')}>죽/스프</li>
                <li className='sub-category' onClick={() => setSelectedCategory('시리얼')}>시리얼</li>
              </div>}
            <ul className='category'>
              <div onClick={()=>handleOpenToggle(7)}>
                양념
                {isOpen[7] && <img className='toggleOpen' src={toggleOpen}></img>}
                {!isOpen[7] && <img className='toggleClose' src={toggleClose}></img>}
              </div>
              <div className='toggleBtn'/>
            </ul>
              {isOpen[7] && <div className='sub-category-box'>
                <li className='sub-category' onClick={() => setSelectedCategory('식초/소스/드레싱')}>식초/소스/드레싱</li>
                <li className='sub-category' onClick={() => setSelectedCategory('양념/액젓/장류')}>양념/액젓/장류</li>
                <li className='sub-category' onClick={() => setSelectedCategory('식용유/참기름/오일')}>식용유/참기름/오일</li>
                <li className='sub-category' onClick={() => setSelectedCategory('소금/설탕/향신료')}>소금/설탕/향신료</li>
                <li className='sub-category' onClick={() => setSelectedCategory('밀가루/믹스')}>밀가루/믹스</li>
              </div>}
            <ul className='category'>
              <div onClick={()=>handleOpenToggle(8)}>
                생수/음료
                {isOpen[8] && <img className='toggleOpen' src={toggleOpen}></img>}
                {!isOpen[8] && <img className='toggleClose' src={toggleClose}></img>}
              </div>
              <div className='toggleBtn'/>
            </ul>
              {isOpen[8] && <div className='sub-category-box'>
                <li className='sub-category' onClick={() => setSelectedCategory('생수/탄산수')}>생수/탄산수</li>
                <li className='sub-category' onClick={() => setSelectedCategory('음료')}>음료</li>
                <li className='sub-category' onClick={() => setSelectedCategory('커피')}>커피</li>
                <li className='sub-category' onClick={() => setSelectedCategory('차')}>차</li>
              </div>}
              <ul className='category'>
              <div onClick={()=>handleOpenToggle(9)}>
                간식/과자/떡
                {isOpen[9] && <img className='toggleOpen' src={toggleOpen}></img>}
                {!isOpen[9] && <img className='toggleClose' src={toggleClose}></img>}
              </div>
              <div className='toggleBtn'/>
            </ul>
              {isOpen[9] && <div className='sub-category-box'>
                <li className='sub-category' onClick={() => setSelectedCategory('과자/쿠키')}>과자/쿠키</li>
                <li className='sub-category' onClick={() => setSelectedCategory('초콜릿/젤리/캔디')}>초콜릿/젤리/캔디</li>
                <li className='sub-category' onClick={() => setSelectedCategory('떡/한과')}>떡/한과</li>
                <li className='sub-category' onClick={() => setSelectedCategory('아이스크림')}>아이스크림</li>
              </div>}
          </div>
      </div>
      </section>
      <section className="groupbuyingList">
        <GroupBuyingList startIndex={startIndex} endIndex={endIndex} category={selectedCategory} />
        <div className='writing' style={{padding: '1.25rem 2.5rem'}}>
            <Link to="/postGroupBuying" className='postGroupBuying_link'>
              <img src='assets/img/writingIcon.png' className='writingIcon' />
            </Link>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.875rem'}}>
          <div className='pagination_groupBuying'> 
            <Pagination
                activePage={page}
                itemsCountPerPage={itemsPerPage}
                totalItemsCount={100}
                pageRangeDisplayed={5}
                prevPageText={"‹"}
                nextPageText={"›"}
                onChange={handlePageChange}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Groupbuying;
