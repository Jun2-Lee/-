import React, { useState } from "react";
import './index.css';
import Pagination from "react-js-pagination";

const Paging= () => {
  const [page, setPage] = useState(1);

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <Pagination
      activePage={page}
      itemsCountPerPage={6}
      totalItemsCount={7}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
  );
};


export default Paging;