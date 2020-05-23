import React, { useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useMemo } from "react";

const PROFILE = gql`
  query {
    profile {
      _id
      name
      username
      email
      images {
        url
        public_id
      }
      about
      createdAt
      updatedAt
    }
  }
`;

const Profile = () => {
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    images: "",
  });
  const [loading, setLoading] = useState(false);

  const { data } = useQuery(PROFILE);

  useMemo(() => {
    if (data) {
      console.log(data.profile);
      setValues({
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: data.profile.images,
      });
    }
  }, [data]);

  // destructure
  const { username, name, about, email } = values;

  const handleSubmit = () => {};

  const handleChange = () => {};

  const handleImageChange = () => {};

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
        <label htmlFor="">image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="form-control"
          placeholder="image"
        />
      </div>
      <div className="form-group">
        <label htmlFor="">about</label>
        <textarea
          name="about"
          value={username}
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

  return <div className="container p-5">{profileUpdateForm()}</div>;
};

export default Profile;
