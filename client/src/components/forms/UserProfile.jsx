import React from "react";

const UserProfile = ({
  handleChange,
  handleSubmit,
  username,
  name,
  email,
  about,
  loading,
}) => {
  return (
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
};

export default UserProfile;
