import React, { useContext, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/authContext";
import { GET_ALL_POSTS, TOTAL_POSTS } from "../graphql/queries";

const Home = () => {
  const [page, setPage] = useState(1);
  const { data, loading, error } = useQuery(GET_ALL_POSTS, {
    variables: { page },
  });

  const { data: postCount } = useQuery(TOTAL_POSTS);
  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);
  const { state, dispatch } = useContext(AuthContext);

  let history = useHistory();

  let totalPages;
  const pagination = () => {
    totalPages = Math.ceil(postCount && postCount.totalPosts / 3);
    // console.log(totalPages);
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

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row pt-5">
        {data &&
          data.allPosts.map((post) => (
            <div className="col-md-4" key={post._id}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4>@{post.postedBy.username}</h4>
                  </div>
                  <p className="card-text">{post.content}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
      <hr></hr>
      <button
        onClick={() => fetchPosts()}
        className="btn btn-raised btn-primary"
      >
        Fetch Posts
      </button>
      <hr></hr>
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
      <hr></hr>
      {JSON.stringify(state.user)}
    </div>
  );
};

export default Home;
