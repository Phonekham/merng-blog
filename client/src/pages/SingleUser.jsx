import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

const PUBLIC_PROFILE = gql`
  query publicProfile($username: String!) {
    publicProfile(username: $username) {
      _id
      username
      name
      email
      images {
        url
        public_id
      }
    }
  }
`;

const SingleUser = () => {
  const { loading, data } = useQuery(PUBLIC_PROFILE, {
    variables: { username: "phone" },
  });

  if (loading) return <p className="p-5">loading</p>;

  return <div className="container">{JSON.stringify(data)}</div>;
};

export default SingleUser;
