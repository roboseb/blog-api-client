import { useEffect, useState } from "react";
import Postlist from "./components/Postlist";
import Post from "./components/Post";
import SignIn from "./components/SignIn";

function App() {
    const [currentPost, setCurrentPost] = useState(null);
    const [user, setUser] = useState(null);

    // Check if user was previously signed in.
    useEffect(() => {
        // Prevent attempting to parse undefined.
        if (localStorage.getItem('user') === undefined || localStorage.getItem('user') === 'undefined') return;

        const localUser = JSON.parse(localStorage.getItem('user'));
        if (localUser) {
            setUser(localUser);
        }
    }, []);

    // Remove signed in user from local storage if there.
    const signOutUser = () => {
        localStorage.removeItem('user');
        setUser(null);
    }

    return (
        <div id="app">
            <div id='navbar'>
                <div>Navbar</div>
                <div>{user ? user.username : 'Sign in to comment!'}</div>
                <button onClick={signOutUser}>Sign Out</button>
            </div>
            <div id='main-content'>

                <Postlist
                    setCurrentPost={setCurrentPost}
                />
                <Post
                    user={user}
                    post={currentPost}
                />

                <SignIn 
                    setUser={setUser}
                />
            </div>


        </div>
    );
}

export default App;
