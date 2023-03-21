import React from "react";
import CategoryBar from "../../components/categoryBar";
import Search from "../../components/search";
import SharingContents from "../../components/search";
import "./index.css";
import { Link } from "react-router-dom";
import Paging from "../../components/pagination";

function SharingPage() {
  return (
    <div className="sharing_body"  >
      <select className="listSorting">
        
          <option>정렬순</option>
          <option>인기순</option>
          <option>최신순</option>
        </select>
      <section className="search"  />
    
      
      <div className="sharingList">
        
        <Search/>
        
        <div >
          <Paging/>
        </div>
        <div className='writing'>
          <Link to="/postSharing" className='postsharing_link'>
            <img src='assets/img/writingIcon.png' className='writingIcon' ></img>
          </Link>

        </div>
        </div>
        
     
      <section className="categoryBar" style={{marginLeft:'-170px'}}>
        <CategoryBar />

        
      </section>
      
      
    </div>
  );
};

export default SharingPage;
