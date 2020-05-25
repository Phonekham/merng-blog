import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import Nav from "./components/Nav";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import CompleteRegistration from "./pages/auth/CompleteRegistration";
import { AuthContext } from "./context/authContext";
import PrivateRoute from "./components/PrivateRoute";
import PasswordUpdate from "./pages/PasswordUpdate";
import PasswordForgot from "./pages/PasswordForgot";
import Profile from "./pages/auth/Profile";
import Post from "./pages/post/Post";
import PublicRoute from "./components/PublicRoute";
import Users from "./pages/Users";
import SingleUser from "./pages/SingleUser";

const App = () => {
  const { state } = useContext(AuthContext);
  const { user } = state;

  const client = new ApolloClient({
    uri: process.env.REACT_APP_GRAPHQL_ENDPOINT,
    request: (operation) => {
      operation.setContext({
        headers: {
          authtoken: user ? user.token : "",
        },
      });
    },
  });

  return (
    <ApolloProvider client={client}>
      <Nav />
      <ToastContainer></ToastContainer>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />

        <PublicRoute exact path="/register" component={Register} />
        <PublicRoute exact path="/login" component={Login} />
        <Route
          exact
          path="/complete-registration"
          component={CompleteRegistration}
        />
        <Route path="/password/forgot" component={PasswordForgot} />
        <PrivateRoute
          exact
          path="/password/update"
          component={PasswordUpdate}
        />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute exact path="/post/create" component={Post} />
        <Route exact path="/user/:username" component={SingleUser} />
      </Switch>
    </ApolloProvider>
  );
};

export default App;
