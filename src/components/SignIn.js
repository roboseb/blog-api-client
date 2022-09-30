import { useEffect, useState } from "react";

function SignIn(props) {

    // Sign user in based on sign in fields.
    const signInUser = () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;


        console.log('signing in...');

        fetch("/api/sign-in", {
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
                console.log(data);
                props.setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data.user))

            })
            .catch(err => console.log('error: ' + err));
    }



    return (
        <div id="sign-in">
            <h1>Sign-In</h1>

                <label htmlFor='username'>Username</label>
                <input id='username' name='username' required></input>

                <label htmlFor='password'>Password</label>
                <input id='password' name='password' required></input>

                <button type='submit' onClick={signInUser} >Submit</button>


        </div>
    );
}

export default SignIn;