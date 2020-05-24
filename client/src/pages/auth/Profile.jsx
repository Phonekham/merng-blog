import React, { useState, useMemo, useContext } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import omitDeep from "omit-deep";
import Resizer from "react-image-file-resizer";
import axios from "axios";

import { USER_UPDATE } from "../../graphql/mutations";
import { PROFILE } from "../../graphql/queries";
import { AuthContext } from "../../context/authContext";

const Profile = () => {
  const { state } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    images: [],
  });
  const [loading, setLoading] = useState(false);

  const { data } = useQuery(PROFILE);

  useMemo(() => {
    if (data) {
      console.log(data.profile);
      setValues({
        ...values,
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: omitDeep(data.profile.images, ["__typename"]),
      });
    }
  }, [data]);

  // mutation
  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({ data }) => {
      console.log("user mutation in profile", data);
      toast.success("profile updated");
    },
  });

  // destructure
  const { username, name, about, email, images } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    userUpdate({ variables: { input: values } });
    setLoading(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fileResizeAndUpload = (event) => {
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

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="">Username</label>
        <input
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
          className="form-control"
          placeholder="username"
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="">name</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          className="form-control"
          placeholder="name"
          disabled={loading}
        />
      </div>
      <div className="form-group">
        <label htmlFor="">email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={handleChange}
          className="form-control"
          placeholder="email"
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="">about</label>
        <textarea
          name="about"
          value={about}
          onChange={handleChange}
          className="form-control"
          placeholder="about"
          disabled={loading}
        />
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={!email || loading}
      >
        Submit
      </button>
    </form>
  );

  return (
    <div className="container p-5">
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
            <img
              src={image.url}
              key={image.public_id}
              alt={image.public_id}
              style={{ height: "100px" }}
              className="float-right"
            ></img>
          ))}
        </div>
        {profileUpdateForm()}
      </div>
    </div>
  );
};

export default Profile;
