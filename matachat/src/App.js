
import {useState, useEffect } from "react";
import {db, auth} from "./firebase-config";
import {collection, getDocs} from "firebase/firestore";

import Login from './components/Login'
import Register from './components/Register'
import { login, logout, getLoginStatus } from "./login";

function App(){
  
  function loginButtonClicked(){
    login();
  }
  function logoutButtonClicked(){
    logout();
  }
  function statusButtonClicked(){
    getLoginStatus();
  }
  
  return (
    <>
      //<Login/>  /*ONLT VIEW ONE AT A TIME */
      <Register/>
    
      <h1> Hello World </h1>
      <button onClick={loginButtonClicked}>Login</button>
      <button onClick={logoutButtonClicked}>Logout</button>
      <button onClick={statusButtonClicked}>Get Login Status</button>
      <p>See console log for more information.</p>
    </>
  );
}

export default App;
