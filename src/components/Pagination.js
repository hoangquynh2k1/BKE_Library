import React from "react";
import ReactPaginate from "react-paginate";

const Pagination = ({ pageCount, currentPage, handlePageClick }) => {
  return (
    <ReactPaginate
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      activeClassName={"active"}
      pageClassName={"page-item"}
      previousClassName={"page-item"}
      nextClassName={"page-item"}
      breakClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousLinkClassName={"page-link"}
      nextLinkClassName={"page-link"}
      breakLinkClassName={"page-link"}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
