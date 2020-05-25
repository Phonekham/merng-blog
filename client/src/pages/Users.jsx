import React from "react";
import { useQuery } from "@apollo/react-hooks";

import { GET_ALL_USERS } from "../graphql/queries";

const Users = () => {
  const { data, loading, error } = useQuery(GET_ALL_USERS);

  if (loading) return <p className="p-5">Loading...</p>;

  return (
    <div className="container">
      <div className="row pt-5">
        {data &&
          data.allUsers.map((u) => (
            <div className="col-md-4" key={u._id}>
              <div className="card">
                <div className="card-body">
                  <div className="card-title">
                    <h4>{u.username}</h4>
                  </div>
                  <p className="card-text">{u.about}</p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Users;
