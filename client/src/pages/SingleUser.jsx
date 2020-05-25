import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useParams } from "react-router-dom";
import UserCard from "../components/UserCard";

const PUBLIC_PROFILE = gql`
  query publicProfile($username: String!) {
    publicProfile(username: $username) {
      _id
      username
      name
      email
      about
      images {
        url
        public_id
      }
      createdAt
    }
  }
`;

const SingleUser = () => {
  let params = useParams();
  const { loading, data } = useQuery(PUBLIC_PROFILE, {
    variables: { username: params.username },
  });

  if (loading) return <p className="p-5">loading</p>;

  return (
    <div className="container">
      <UserCard user={data.publicProfile}></UserCard>
    </div>
  );
};

export default SingleUser;
