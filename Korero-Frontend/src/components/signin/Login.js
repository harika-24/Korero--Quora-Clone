import React from "react";
import "../css/Login.css";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../../Firebase";
import GoogleButton from 'react-google-button'

const Login = ()=> {
  const handleSubmit = async () => {
    await signInWithPopup(auth, googleProvider)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="login-container">
      <div className="login-content">
        <img
          src="./images/Korero-logo.png"
          alt="logo"
        />
        <GoogleButton onClick={handleSubmit}/>
      </div>
    </div>
  );
}

export default Login;

