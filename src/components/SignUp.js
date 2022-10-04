import { useEffect, useState } from "react";

import showMessages from "../showError";

function SignUp(props) {

    // Sign user in based on sign in fields.
    const signUpUser = () => {
        const username = document.getElementById('username-up').value;
        const password = document.getElementById('password-up').value;
        const confirmPassword = document.getElementById('confirm-password-up').value;



        console.log('signing up...');

        fetch("/api/sign-up", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                confirmPassword: confirmPassword
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.errors) {
                    showMessages(data.errors);
                } else {
                    showMessages(['Sign up succesful!'], true);
                }
            })
            .catch(err => console.log('error: ' + err));
    }



    return (
        <div id="sign-up">
            <h1>Sign Up</h1>
            <div className='form-inputs'>

                <label htmlFor='username-up'>Username</label>
                <input id='username-up' name='username' required></input>

                <label htmlFor='password-up'>Password</label>
                <input id='password-up' name='password' required></input>

                <label htmlFor='confirm-password-up'>Confirm</label>
                <input id='confirm-password-up' name='confirmPassword' required></input>

                <button type='submit' onClick={signUpUser} >Submit</button>
            </div>

        </div>
    );
}

export default SignUp;