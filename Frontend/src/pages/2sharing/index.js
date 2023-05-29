import { useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "react-js-pagination";
import CategoryBar from "../../components/categoryBar";
import Search from "../../components/search";
import SharingList from '../../components/sharingList'
import "./index.css";
import "./pagination.css"

function SharingPage() {
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
    <div className="sharing_body"  >
      <section className="sharing_body_search">
        {/*<Search />*/}
      </section>
      <section className="sharing_body_categoryBar">
        <CategoryBar />
      </section>
      <section className="sharingList">
        <SharingList startIndex={startIndex} endIndex={endIndex} />
        <div className='writing' style={{padding: '1.25rem 2.5rem'}}>
            <Link to="/postSharing" className='postsharing_link'>
              <img src='assets/img/writingIcon.png' className='writingIcon' />
            </Link>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '1.875rem'}}>
          <div className='pagination'> 
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
};

export default SharingPage;
