import React, { useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import omitDeep from "omit-deep";

import { AuthContext } from "../../context/authContext";
import FileUpload from "../../components/FileUpload";

const initialState = {
  content: "",
  image: {
    url: "https://via.placeholder.com/200x200.png?text=Post",
    public_id: "123",
  },
};

const Post = () => {
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {};

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { content } = values;

  const createForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <textarea
          value={content}
          onChange={handleChange}
          name="content"
          rows="10"
          className="md-textarea form-control"
          placeholder="Write something"
          maxLength="150"
          disabled={loading}
        ></textarea>{" "}
      </div>
      <button
        className="btn btn-primary"
        type="submit"
        disabled={loading || !content}
      >
        Post
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      {loading ? <h4 className="text-danger">Loading</h4> : <h4>Create</h4>}

      <FileUpload
        values={values}
        loading={loading}
        setLoading={setLoading}
        setValues={setValues}
        singleUpload={true}
      ></FileUpload>

      <div className="row">
        <div className="col">{createForm()}</div>
      </div>
    </div>
  );
};

export default Post;
