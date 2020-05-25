import React from "react";

const Image = ({ image, handleImageRemove = (f) => f }) => {
  return (
    <img
      src={image.url}
      key={image.public_id}
      alt={image.public_id}
      style={{ height: "100px" }}
      className="img-thumbnail"
      onClick={() => handleImageRemove(image.public_id)}
    ></img>
  );
};

export default Image;
