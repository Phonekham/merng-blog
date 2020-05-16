import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row p-5">
        <h4>Login</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              placeholder="Enter email"
              disabled={loading}
            ></input>
          </div>
          <button
            className="btn btn-raised btn-primary"
            disabled={!email || loading}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
