/*
import React, { Component } from "react";
import "./index.css";
import searchIcon from "../../assets/img/searchIcon.png";
//import DummyList from "../../components/sharingList"
class Search extends Component {
  
  constructor(){
    super();

    this.state={
      search:null
    };
  }

  searchSpace=(event)=>{
    let keyword = event.target.value;
    this.setState({search:keyword})
    
  }

  render(){

    const SharingContents = DummyList.filter((it)=>{
      if(this.state.search == null)
            return it
        else if(it.title.toLowerCase().includes(this.state.search.toLowerCase()) || it.nickname.toLowerCase().includes(this.state.search.toLowerCase())){
            return it
        }
      }).map((it,index)=>{
      return (
      <div className='sharing_list'  style={{display:'flex',flexFlow: 'wrap' }}> 
        <li className="item" key={index}>
          <div className='item_image'>{it.image}</div>
          <div className='item_nickname'>{it.nickname}</div>
          <div className='item_date'>{it.date}</div>
          <div className='item_title' >{it.title}</div>
          <div className='item_area'>{it.area}</div>
          <div className='item_deadline'>{it.deadline}</div>
        </li>
        
        
      </div>
    )
    });
    SharingContents.defaultProps={
      item:[],
    };
    
  return (

    
    <div className="searchArea" >
      <div className="searchBar">
        <div className="searchIconBox">
          <img className="searchIcon" src={searchIcon}></img>
        </div>
        <input type="text"  className="inputBar"
        onChange={(e)=> this.searchSpace(e)}
        
        />
        
        
      </div>
      
    {SharingContents}

     
    </div>
  );
}};

export default Search;

*/
