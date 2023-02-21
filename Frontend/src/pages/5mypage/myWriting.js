import React from "react";
import {Link} from "react-router-dom";
import "./myWriting.css";

import MyWritingList from "../../components/myWritingList";
import ShortcutBar from "../../components/shortcutBar";

function MyWriting() {
  return (
    <>
      <div className="myWriting_title">내가 쓴 글</div>
      <div className="myWriting_body">
        <section className="shortcutBar">
          <ShortcutBar />
        </section>
        <section className="nav_myWriting">
          {/*<Link className="myWriting_link">재료 나눔</Link>
          <Link className="myWriting_link">배달비 n빵</Link>
          <Link className="myWriting_link">공동구매</Link>*/}
        </section>
        <section className="myWritingList">
          <MyWritingList />
        </section>
      </div>
    </>
  );
}

export default MyWriting;
