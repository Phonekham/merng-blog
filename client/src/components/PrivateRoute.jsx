import React, { useState, useContext, useEffect } from "react";
import { Route, Link } from "react-router-dom";

import { AuthContext } from "../context/authContext";

const PrivateRoute = ({ children, ...rest }) => {
  const [user, setUser] = useState(false);
  const { state } = useContext(AuthContext);

  useEffect(() => {
    if (state.user) {
      setUser(true);
    }
  }, [state.user]);

  const navLinks = () => (
    <nav>
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link className="nav-link" to="/update/profile">
            Profile
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/update/password">
            Passsword
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/create/post">
            Post
          </Link>
        </li>
      </ul>
    </nav>
  );

  const renderContent = () => (
    <div className="container-fluid pt-5">
      <div className="row">
        <div className="col-md-4">{navLinks()}</div>
        <div className="col-md-8">
          <Route {...rest}></Route>
        </div>
      </div>
    </div>
  );

  return user ? renderContent() : <h4>...loading</h4>;
};

export default PrivateRoute;
