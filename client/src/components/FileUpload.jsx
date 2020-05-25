import React, { useContext } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";

import { AuthContext } from "../context/authContext";
import Image from "./Image";

const FileUpload = ({ setValues, setLoading, values, loading }) => {
  const { state } = useContext(AuthContext);
  const { images } = values;

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
              setValues({ ...values, images: [...images, response.data] });
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
        let filteredImages = images.filter((item) => {
          return item.public_id !== id;
        });
        setValues({ ...values, images: filteredImages });
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
        {images.map((image) => (
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
