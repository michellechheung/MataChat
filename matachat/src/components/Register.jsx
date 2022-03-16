/*
https://firebase.google.com/docs/auth/web/email-link-auth
https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
*/
import React, { useState, useEffect } from 'react';

function Register(props){
    const [fName, setFName] = useState("");
    const [lName, setLName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    let validCredentials = true;


    

    const registerEmailAndPassword = async() => { //confirm if its good
       
       
    };
    return(
        <section className="register-container">
            <h1>SignUp</h1>
            <form>
                <label>First Name</label>
                <input type="text" placeholder='John' onChange={(event) => {setFName(event.target.value)}} required/>
                <label>Last Name</label>
                <input type="text" placeholder='Doe' onChange={(event) => {setLName(event.target.value)}} required/>
                <label>Email</label>
                <input type="text" placeholder='johndoe@john.com' onChange={(event) => {setEmail(event.target.value)}} required/>
                <label>Password</label>
                <input type="text" placeholder='Enter password' onChange={(event) => {setPassword(event.target.value)}} required/>
                <button onClick={registerEmailAndPassword} >Login</button>
            </form>
        </section>
    )
}

export default Register;