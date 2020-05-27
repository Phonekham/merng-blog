import React from "react";
import { Link } from "react-router-dom";

import Image from "./Image";

const PostCard = ({ post }) => {
  const { image, content, postedBy } = post;
  return (
    <div className="card text-center" style={{ minHeight: "375px" }}>
      <div className="card-body">
        <Image image={image} />
        <h4 className="text-primary">@{post.postedBy.username}</h4>
        <hr />
        <small>{content}</small>
      </div>
    </div>
  );
};

export default PostCard;
