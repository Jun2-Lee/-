import React from "react";
import {useState, useEffect} from 'react';
import Search from "../../components/search";
import CategoryBar from "../../components/categoryBar";
import GroupBuyingList from '../../components/groupbuyingList'
import "./index.css";


function Groupbuying() {



  return (
    <div className="groupbuying_body">
      <section className="groupbuying_search">
        {/*<Search />*/}
      </section>
      <section className="groupbuying_categoryBar">
        <CategoryBar />
      </section>
      <section className="groupbuyingList">
        <GroupBuyingList />
      </section>
    </div>
  );
}

export default Groupbuying;
