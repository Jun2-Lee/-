import React from "react";
import CategoryBar from "../../components/categoryBar";
//import Search from "../../components/search";
import SharingList from '../../components/sharingList'
import "./index.css";

function SharingPage() {
  return (
    <div className="sharing_body"  >
      <section className="sharing_body_search">
        {/*<Search />*/}
      </section>
      <section className="sharing_body_categoryBar">
        <CategoryBar />
      </section>
      <section className="sharingList">
        <SharingList />
      </section>
    </div>
  );
};

export default SharingPage;
