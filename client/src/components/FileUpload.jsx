import React, { useContext } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";

import { AuthContext } from "../context/authContext";
import Image from "./Image";

const FileUpload = ({
  setValues,
  setLoading,
  values,
  loading,
  singleUpload = false,
}) => {
  const { state } = useContext(AuthContext);
  const { images, image } = values;

  const fileResizeAndUpload = (event) => {
    setLoading(true);
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          // console.log(uri);
          axios
            .post(
              `${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`,
              { image: uri },
              {
                headers: {
                  authtoken: state.user.token,
                },
              }
            )
            .then((response) => {
              setLoading(false);
              console.log("image uploaded", response);
              if (singleUpload) {
                setValues({ ...values, image: response.data });
              } else {
                setValues({ ...values, images: [...images, response.data] });
              }
            })
            .catch((error) => {
              setLoading(false);
              console.log("cloudinary upload failed", error);
            });
        },
        "base64"
      );
    }
  };

  const handleImageRemove = (id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_REST_ENDPOINT}/removeimage`,
        {
          public_id: id,
        },
        {
          headers: {
            authtoken: state.user.token,
          },
        }
      )
      .then((response) => {
        setLoading(false);
        if (singleUpload) {
          setValues({ ...values, image: { url: "", public_id: "" } });
        } else {
          let filteredImages = images.filter((item) => {
            return item.public_id !== id;
          });
          setValues({ ...values, images: filteredImages });
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="form-group">
          <label className="btn btn-primary">
            Upload Image
            <input
              hidden
              type="file"
              accept="image/*"
              onChange={fileResizeAndUpload}
              className="form-control"
              placeholder="image"
            />
          </label>
        </div>
      </div>
      <div className="col-md-9">
        {image && (
          <Image
            key={image.public_id}
            image={image}
            handleImageRemove={handleImageRemove}
          ></Image>
        )}
        {images &&
          images.map((image) => (
            <Image
              key={image.public_id}
              image={image}
              handleImageRemove={handleImageRemove}
            ></Image>
          ))}
      </div>
    </div>
  );
};

export default FileUpload;
