import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";

import PostCard from "./PostCard";
import { SEARCH } from "../graphql/queries";

const SearchResults = () => {
  const { query } = useParams();
  const { data, loading } = useQuery(SEARCH, {
    variables: { query },
  });

  if (loading)
    return (
      <div className="container text-center">
        <p className="text-danger =-5">loading...</p>
      </div>
    );
  if (!data.search.length)
    return (
      <div className="container text-center">
        <p className="text-danger =-5">No Results</p>
      </div>
    );

  return (
    <div className="container">
      <div className="row pb-5">
        {data &&
          data.search.map((post) => (
            <div className="col-md-4 pt-5" key={post._id}>
              <PostCard post={post}></PostCard>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SearchResults;
