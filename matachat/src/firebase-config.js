import { initializeApp } from "firebase/app"; 
import { getAuth, //for authentication
  createUserWithEmailAndPassword, //for creating users
  deleteUser, // for deleting user
  signInWithEmailAndPassword,  //for signing in
  signOut,  //for signing out
  onAuthStateChanged //for verifying login
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  where
} from "@firebase/firestore";


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


/*onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.email + " logged in");
  } else {
    console.log("User logged out");
  }
});*/

/*
  ------------------------------------FUNCTIONS BELOW INCLUDE:------------------------------------

  adminRegisterUser(name, email, password)
  adminDeleteUser()
  adminGetLoginStatus()
  adminLogout
  adminLogin

*/


//------------------------------------REGISTER USER ------------------------------------
// password must be 6 characters+ , must be valid CSUN EMAIL
export const adminRegisterUser = async (name, email, password) => {
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
export const adminDeleteUser = () => {
  deleteUser(auth.currentUser)
    .then(() => {
      console.log("Deletion Success");
    })
    .catch((error) => {
      console.error(error.message);
    })
};

//------------------------------------GET LOGIN STATUS------------------------------------
export const adminGetLoginStatus = () => {
  const user = auth.currentUser;
  if (user){
    console.log(user.email + " is currently logged in");
  }
  else{
    console.log("User is not logged in");
  }
}

//------------------------------------LOG OUT------------------------------------
export const adminLogout = async () => {
  signOut(auth).then(() => {
    console.log("User logged out successfully");
  }).catch((error) => {
    console.log("error");
  });
}


//------------------------------------LOG IN------------------------------------
export const adminLogin = async (email="matachat.test@my.csun.edu", password="test.login.logout") => {
  return new Promise(resolve => {
    let error_code = null;
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in successfully");
      console.log(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error", errorMessage, errorCode);
      error_code = errorCode;
    }).then(()=>{
      resolve(error_code);
    });
  });
}


// Write message to DB
export async function writeMessageDB(messageText){
  try {
    await addDoc(collection(db, "messages"),
      {
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
        text: messageText,
        profilePicUrl: auth.currentUser.photoURL,
        timestamp: serverTimestamp()
      }
    );
  }
  catch(error) {
    console.log(error);
  }
}

// Load messages from DB
export async function loadMessagesDB() {
    const querySnapshot = await getDocs(query(collection(db, "messages"), orderBy('timestamp', 'desc')));
    let message_array = Array();
    querySnapshot.forEach((doc) => {
      //console.log(`${doc.id} => ${doc.data().email} => ${doc.data().text} (${doc.data().timestamp})`);
      message_array.push({id: doc.data().id, text: doc.data().text, email: doc.data().email, timestamp: doc.data().timestamp});
    });
    return new Promise(resolve => {
      resolve(message_array);
    });
}

/*async function access_users_db(){
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().email}`);
  });
}*/

export const recentMessagesQuery = query(collection(db, 'messages'), orderBy('timestamp', 'desc'), limit(12));

// List rooms the current user belongs to
export async function listChatRoomsDB() {
  const current_user = await auth.currentUser;
  let chatroom_array = Array();
  let q = query(collection(db, "chat rooms"), where("participants", "array-contains", current_user.email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((chatroom_doc) => {
    const chatroom_doc_data = chatroom_doc.data();
    //console.log(`${current_user.email} has rooms: ${chatroom_doc_data.room_name}`);
    chatroom_array.push({id: chatroom_doc_data.id, room_name: chatroom_doc_data.room_name, participants: chatroom_doc_data.participants});
  });
  return new Promise(resolve => {
    resolve(chatroom_array);
  });
}



/*NOTES

ERROR CODES https://firebase.google.com/docs/auth/admin/errors
List methods https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword 

*/