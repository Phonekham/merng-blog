import React, { useContext, useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
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

  const pagination = () => {
    const totalPages = Math.ceil(postCount && postCount.totalPosts / 3);
    // console.log(totalPages);
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li onClick={() => setPage(i)}>
          <a className="page-link">{i}</a>
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
        <ul className="pagination justify-content-center">{pagination()}</ul>
      </nav>
      <hr></hr>
      {JSON.stringify(state.user)}
    </div>
  );
};

export default Home;
