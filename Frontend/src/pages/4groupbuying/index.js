import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import Search from "../../components/search";
import CategoryBar from "../../components/categoryBar";
import GroupBuyingList from '../../components/groupbuyingList'
import "./index.css";
import "./pagination.css";

function Groupbuying() {
  //pagination
  const [page, setPage] = useState(1);
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
    console.log(pageNumber)
  } 
  const itemsPerPage = 6;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="groupbuying_body">
      <section className="groupbuying_search">
        {/*<Search />*/}
      </section>
      <section className="groupbuying_categoryBar">
        <CategoryBar />
      </section>
      <section className="groupbuyingList">
        <GroupBuyingList startIndex={startIndex} endIndex={endIndex} />
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
