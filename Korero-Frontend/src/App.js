
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";

import Login from "./components/signin/Login";
import Korero from "./components/Korero";
import { login, selectUser } from "./feature/userSlice";
import { auth } from "./Firebase";
import { onAuthStateChanged } from "firebase/auth";


function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      console.log(authUser);
      if (authUser) {
        dispatch(
          login({
            name: authUser.displayName,
            imageURL : authUser.photoURL,
            email: authUser.email,
            _id: authUser.providerData[0].uid,
          })
        );
        console.log("AuthUser", authUser);
      }
    });
  }, [dispatch]);
  return (
    <div className="App">

      {user ? <Korero /> : <Login />}
     

    </div>
  );
}

export default App;