import { initializeApp } from "firebase/app"; 
import { getAuth, //for authentication
  createUserWithEmailAndPassword, //for creating users
  deleteUser
} from "firebase/auth"
import {getFirestore} from "@firebase/firestore";
import config from "./config";
var key = config.API_KEY; // pulls API key from src/congig.js

const firebaseConfig = {
  apiKey: key,
  authDomain: "matachat-7ecf2.firebaseapp.com",
  projectId: "matachat-7ecf2",
  storageBucket: "matachat-7ecf2.appspot.com",
  messagingSenderId: "658686286791",
  appId: "1:658686286791:web:e14f3670a7b6bf825a17e2"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

//------------------------------------REGISTER USER ------------------------------------
// password must be 6 characters+ , must be valid CSUN EMAIL
const adminRegisterUser = async (name, email, password) => {
  try {
    if(email.trim().endsWith("csun.edu")){
      const response = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = response.user;
      console.log(user);
    }
    else{
      throw new Error ("The provided value for the email user property is invalid. It must be a valid CSUN email address", "auth/invalid-csun");
    }
    
    

  } catch (error) {
    console.error("new error" + error + " code: " + error.code);
    
    let message;

    switch(error.code){
      case "auth/email-already-in-use":
        message = "The provided email is already in use by an existing user. Each user must have a unique email";
        break;
      case "auth/invalid-email":
        message= "The provided value for the email property is invalid. It must be a valid email address";
        break;
      case "auth/weak-password":
        message="Password should be at least 6 characters"
        break;
      case "auth/invalid-csun":
        message="The provided value for the email property is invalid. It must be a valid CSUN email address"
      default:
        message= error.message;
    }
    alert(message);
  }
};


//TEST FUNCTION CALL FOR EMAIL
/*
var name = "kyle";
var email = "testFromReact@ucla.edu";
var password = "passssss"; 
adminRegisterUser(name, email, password);*/


//------------------------------------DELETE CURRENT USER------------------------------------
const adminDeleteUser = () => {
  deleteUser(auth.currentUser)
    .then(() => {
      console.log("Deletion Success");
    })
    .catch((error) => {
      console.error(error.message);
    })
};






/*NOTES

ERROR CODES https://firebase.google.com/docs/auth/admin/errors
List methods https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword 

*/