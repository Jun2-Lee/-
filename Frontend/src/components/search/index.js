import React from "react";
import "./index.css";
import searchIcon from "../../assets/img/searchIcon.png";

function Search() {
  return (
    <div className="searchArea">
      <div className="searchBar">
        <div className="searchIconBox">
          <img className="searchIcon" src={searchIcon}></img>
        </div>
        <input type="text" className="inputBar" />
      </div>
      <select className="listSorting">
        <option>정렬순</option>
        <option>인기순</option>
        <option>최신순</option>
      </select>
    </div>
  );
}

export default Search;
