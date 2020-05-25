import React from "react";
import Image from "./Image";

const UserCard = ({ user }) => {
  const { username, images, about } = user;
  return (
    <div className="card text-center" style={{ minHeight: "375px" }}>
      <div className="card-body">
        <Image image={images[0]}></Image>
        <h4 className="text-primary">@{username}</h4>
        <hr></hr>
        <small>{about}</small>
      </div>
    </div>
  );

  return <div></div>;
};

export default UserCard;
