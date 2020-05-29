import React from "react";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const params = useParams();

  return <div>SearchResults / {params.query}</div>;
};

export default SearchResults;
