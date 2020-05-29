import React from "react";

const PostPagination = ({ page, setPage, postCount }) => {
  let totalPages;
  const pagination = () => {
    totalPages = Math.ceil(postCount && postCount.totalPosts / 3);
    if (totalPages > 10) totalPages = 10;
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li onClick={() => setPage(i)}>
          <a className={`page-link ${page === i && "activePagination"}`}>{i}</a>
        </li>
      );
    }
    return pages;
  };

  return (
    <nav>
      <ul className="pagination justify-content-center">
        <li onClick={() => setPage(1)}>
          <a className={`page-link ${page === 1 && "disabled"}`}>Previous</a>
        </li>
        {pagination()}
        <li onClick={() => setPage(totalPages)}>
          <a className={`page-link ${page === totalPages && "disabled"}`}>
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default PostPagination;
