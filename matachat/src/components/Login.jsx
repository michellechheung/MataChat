import React, { useState, useEffect } from 'react';

function Login(){
    const [passwordInput, setPasswordInput] = useState("");
    const [usernameInput, setUsernameInput] = useState("");

    const GoLogin = async() => { //confirm if its good
        //test login credentials
    };
    return(
        <section className="login-container">
            <h1>Login</h1>
            <form>
                <label>Username</label>
                <input type="text" placeholder='Type your username' onChange={(event) => {setUsernameInput(event.target.value)}} required/>
                <label>Password</label>
                <input type="text" placeholder='Type your password' onChange={(event) => {setUsernameInput(event.target.value)}} required/>
                <button onClick={GoLogin} >Login</button>
            </form>
        </section>
    )
}

export default Login;