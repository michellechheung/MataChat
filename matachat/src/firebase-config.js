var key = config.API_KEY;
import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "matachat-7ecf2.firebaseapp.com",
  projectId: "matachat-7ecf2",
  storageBucket: "matachat-7ecf2.appspot.com",
  messagingSenderId: "658686286791",
  appId: "1:658686286791:web:e14f3670a7b6bf825a17e2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)