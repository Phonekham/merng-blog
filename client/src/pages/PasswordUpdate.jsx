import React, { useState } from "react";
import { toast } from "react-toastify";

import { auth } from "../firebase";
import AuthForm from "../components/forms/AuthForm";

const PasswordUpdate = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        toast.success("password updated");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="container p-5">
      {loading ? (
        <h4 className="text-danger">...loading</h4>
      ) : (
        <AuthForm
          password={password}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          showPasswordInput="true"
          hideEmailInput="true"
        ></AuthForm>
      )}
    </div>
  );
};

export default PasswordUpdate;
