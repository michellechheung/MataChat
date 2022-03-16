import { db, auth } from "./firebase-config";
import { collection, getDocs } from "firebase/firestore";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth"

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log(user.email + " logged in");
  } else {
    console.log("User logged out");
  }
});

export async function login(email="matachat.test@my.csun.edu", password="test.login.logout"){
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    const user = userCredential.user;
    console.log("User logged in successfully");
    console.log(user);
  }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error");
  });
}

export async function logout(){
  signOut(auth).then(() => {
    console.log("User logged out successfully");
  }).catch((error) => {
    console.log("error");
  });
}

/*async function access_users_db(){
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data()}`);
  });
}*/

export function getLoginStatus(){
  const user = auth.currentUser;
  if (user){
    console.log(user.email + " is currently logged in");
  }
  else{
    console.log("User is not logged in");
  }
}

