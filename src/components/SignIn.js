import { useEffect, useState } from "react";
import showMessages from "../showError";

function SignIn(props) {

    // Sign user in based on sign in fields.
    const signInUser = () => {
        const username = document.getElementById('username-in').value;
        const password = document.getElementById('password-in').value;


        console.log('signing in...');

        fetch("https://vast-brushlands-96580.herokuapp.com/api/sign-in", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    showMessages([data.message]);
                } else {
                    showMessages(['Sign in succesful!'], true);
                }

                props.setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user))

            })
            .catch(err => console.log('error: ' + err));
    }



    return (
        <div id="sign-in">
            <h1>Sign-In</h1>
            <div className='form-inputs'>
                <label htmlFor='username-in'>Username</label>
                <input id='username-in' name='username' required></input>

                <label htmlFor='password-in'>Password</label>
                <input type='password' id='password-in' name='password' required></input>

                <button type='submit' onClick={signInUser} >Submit</button>
            </div>

        </div>
    );
}

export default SignIn;