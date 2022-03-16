<<<<<<< HEAD
import {config} from "./config"; // pulls API key from src/congig.js
=======
>>>>>>> 29be6cc864c0ff0b5236c141dd0270a90e822dfa
import { initializeApp } from "firebase/app"; 
import { getAuth} from "firebase/auth"
import {getFirestore} from "@firebase/firestore";
import config from "./config";
var key = config.API_KEY; // pulls API key from src/congig.js

const firebaseConfig = {
  apiKey: config.API_KEY,
  authDomain: "matachat-7ecf2.firebaseapp.com",
  projectId: "matachat-7ecf2",
  storageBucket: "matachat-7ecf2.appspot.com",
  messagingSenderId: "658686286791",
  appId: "1:658686286791:web:e14f3670a7b6bf825a17e2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
