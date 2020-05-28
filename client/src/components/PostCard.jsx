import React from "react";
import { Link, useHistory } from "react-router-dom";

import Image from "./Image";

const PostCard = ({
  post,
  handleDelete = (f) => f,
  showDeleteButton = false,
  showUpdateButton = false,
}) => {
  const { image, content, postedBy } = post;
  let history = useHistory();
  return (
    <div className="card text-center" style={{ minHeight: "375px" }}>
      <div className="card-body">
        <Image image={image} />
        <h4 className="text-primary">@{post.postedBy.username}</h4>
        <hr />
        <small>{content}</small>
        <br />
        <br />
        {showDeleteButton && (
          <button
            onClick={() => handleDelete(post._id)}
            className="btn m-2 btn-danger"
          >
            Delete
          </button>
        )}
        {showUpdateButton && (
          <button
            onClick={() => history.push(`/post/update/${post._id}`)}
            className="btn m-2 btn-warning"
          >
            Update
          </button>
        )}
      </div>
    </div>
  );
};

export default PostCard;
