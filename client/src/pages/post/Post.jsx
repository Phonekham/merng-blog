import React, { useState } from "react";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/react-hooks";
import omitDeep from "omit-deep";

import { AuthContext } from "../../context/authContext";
import FileUpload from "../../components/FileUpload";
import PostCard from "../../components/PostCard";

import { POST_CREATE } from "../../graphql/mutations";
import { POSTS_BY_USER } from "../../graphql/queries";

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

  const { data: posts } = useQuery(POSTS_BY_USER);

  const [postCreate] = useMutation(POST_CREATE, {
    // update cache
    update: (cache, { data: { postCreate } }) => {
      // query from cache
      const { postByUser } = cache.readQuery({
        query: POSTS_BY_USER,
      });
      // Write query to cache
      cache.writeQuery({
        query: POSTS_BY_USER,
        data: {
          postByUser: [postCreate, ...postByUser],
        },
      });
    },
    onError: (err) => console.log(err),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    postCreate({ variables: { input: values } });
    setValues(initialState);
    setLoading(false);
    toast.success("Post created");
  };

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
      <hr></hr>
      <div className="row p-5">
        {posts &&
          posts.postByUser.map((post) => (
            <div className="col-md-6 pt-5" key={post._id}>
              <PostCard
                post={post}
                showUpdateButton={true}
                showDeleteButton={true}
              ></PostCard>
            </div>
          ))}
      </div>
      {JSON.stringify(posts)}
    </div>
  );
};

export default Post;
