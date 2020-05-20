import React, { useState, useEffect, useContext } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { AuthContext } from "../../context/authContext";
import AuthForm from "../../components/forms/AuthForm";

const USER_CREATE = gql`
  mutation userCreate {
    userCreate {
      username
      email
    }
  }
`;

const CompleteRegistration = () => {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailFormRegistration"));
  }, [history]);

  const [userCreate] = useMutation(USER_CREATE);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        window.localStorage.removeItem("emailFormRegistration");
        let user = auth.currentUser;
        await user.updatePassword(password);
        // dispatch user with token angd email
        // then redirect
        const idTokenResult = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: { email: user.email, token: idTokenResult.token },
        });
        // make api request to save/update user in mongodb
        userCreate();
        history.push("/");
      }
    } catch (error) {
      console.log("register complete error");
      setLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <div className="container">
      {loading ? (
        <h4 className="text-danger">Loading...</h4>
      ) : (
        <h4>Complete your registration</h4>
      )}
      <AuthForm
        email={email}
        loading={loading}
        password={password}
        setPassword={setPassword}
        setEmail={setEmail}
        handleSubmit={handleSubmit}
        showPasswordInput="true"
      ></AuthForm>
    </div>
  );
};

export default CompleteRegistration;
