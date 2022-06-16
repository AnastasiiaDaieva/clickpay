import ReactPaginate from "react-paginate";

function PaginatedTransactions({ pageCount, handlePageClick }) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="previous"
      renderOnZeroPageCount={null}
      marginPagesDisplayed={3}
      containerClassName="pagination justify-content-center"
      pageClassName={"page-item"}
      pageLinkClassName={"page-link"}
      previousClassName={"page-item"}
      previousLinkClassName={"page-link"}
      nextClassName={"page-item"}
      nextLinkClassName={"page-link"}
      breakClassName={"page-item"}
      breakLinkClassName={"page-link"}
      activeClassName={"active"}
    />
  );
}
export default PaginatedTransactions;
