import React, { useState } from "react";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  const { data, loading, error } = useQuery(GET_ALL_POSTS);
  const [fetchPosts, { data: posts }] = useLazyQuery(GET_ALL_POSTS);

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row pt-5">
        {data.allPosts.map((post) => (
          <div className="col-md-4" key={post.id}>
            <div className="card">
              <div className="card-body">
                <div className="card-title">
                  <h4>{post.title}</h4>
                </div>
                <p className="card-text">{post.description}</p>
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
      {JSON.stringify(posts)}
    </div>
  );
};

export default Home;
