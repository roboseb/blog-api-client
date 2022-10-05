import { useEffect, useState } from "react";
import Postlist from "./components/Postlist";
import Post from "./components/Post";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import ComputerBase from "./components/ComputerBase";
import showMessages from "./showError";

function App() {
    const [currentPost, setPost] = useState(null);
    const [nextPost, setNextPost] = useState(null);
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

    // Animate monitor on post change.
    useEffect(() => {
        const post = document.getElementById('post');

        const postItems = Array.from(post.children);

        postItems.forEach((item, index) => {
            item.classList.remove('flickered');
            void item.offsetWidth;

            item.style.animationDelay = `${(index * 80) + 40}ms`;

            item.classList.add('flickered');
        });

    }, [currentPost])

    return (
        <div id="app">
            <div id='main-content'>

                <div id='monitor-back'></div>



                <Post
                    user={user}
                    post={currentPost}
                    signOutUser={signOutUser}
                    setUser={setUser}
                />


                <ComputerBase
                />

                <Postlist
                    setCurrentPost={setPost}
                    // nextPost={nextPost}
                    setNextPost={setNextPost}
                />
            </div>


        </div>
    );
}

export default App;
