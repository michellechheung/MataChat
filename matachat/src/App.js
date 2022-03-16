
import {useState, useEffect } from "react";
import {db, auth} from "./firebase-config";
import {collection, getDocs} from "firebase/firestore";
import Login from './components/Login'
import Register from './components/Register'

function App(){
  
  
  return (
    //<Login/>  /*ONLT VIEW ONE AT A TIME */
    <Register/>
  );
}

export default App;
