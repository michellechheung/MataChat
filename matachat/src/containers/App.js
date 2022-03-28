import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
//import logo from './matachat-logo.png';
import TestBackendOnly from "../components/TestBackendOnly";
import "./App.css";

import {
  auth,
  adminLogin,
  adminLogout
} from "../firebase-config";

import { onAuthStateChanged } from "firebase/auth";

function App() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [logoV2, setLogo] = useState("./images/logo-iconUF-transparent.png");

  // User Login info
  const database = [
    {
      username: "david.campos.713@my.csun.edu",
      password: "pass"
    },
    {
      username: "kevin.orellana.89@my.csun.edu",
      password: "pass"
    },
    {
      username: "kyle.deguzman.579@my.csun.edu",
      password: "pass"
    },
    {
      username: "mchheav@gmail.com",
      password: "pass"
    },
    {
      username: "pinchun.liu.226@my.csun.edu",
      password: "pass"
    },
    {
      username: "sebastian.salazar.884@my.csun.edu",
      password: "pass"
    },
  ];

  const errors = {
    uname: "invalid username",
    pass: "invalid password"
  };
 
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log(user.email + " logged in");
        setIsSubmitted(true);
      } else {
        console.log("User logged out");
        setIsSubmitted(false);
      }
    });
  }, [isSubmitted]);

  

  const handleSubmit = async (event) => {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    let result = await adminLogin(uname.value, pass.value);
    console.log("result: ", result);
    if (result == "auth/wrong-password"){
      // Invalid password
      setErrorMessages({ name: "pass", message: errors.pass });
    }
    else if (result == "auth/invalid-email"){
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
    
    /*
    // Find user login info
    const userData = database.find((user) => user.username === uname.value);

    // Compare user info
    if (userData) {
      if (userData.password !== pass.value) {
        // Invalid password
        setErrorMessages({ name: "pass", message: errors.pass });
      } else {
        setIsSubmitted(true);
      }
    } else {
      // Username not found
      setErrorMessages({ name: "uname", message: errors.uname });
    }
    */
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );





  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Email </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input background="blue" type="submit" />
        </div>
      </form>
    </div>
  );

  const handleLogout = (event) => {
    adminLogout();
    setErrorMessages({ name: "uname", message: "" });
    setErrorMessages({ name: "pass", message: "" });
  };


  const renderLogout = (
    <>
      <div>User is successfully logged in</div>
      <button onClick={handleLogout}>Logout</button>
      <TestBackendOnly />
    </>
  );

  return (
    <div className="app">
      <div class="row">
      <div class="column-left">
        <img src={logoV2} className="App-logo" alt="logo"></img>
      </div>
      <div class="column-right">
        <div class="login-form">
        <div className="title">Sign In</div>
        {isSubmitted ? renderLogout : renderForm}
        </div>
      </div>
      </div>
    </div>
  );
}
export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);