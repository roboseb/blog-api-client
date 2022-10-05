import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import uniqid from "uniqid";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

function Post(props) {

    const [comments, setComments] = useState(null);

    const fetchComments = () => {

        fetch("https://vast-brushlands-96580.herokuapp.com/api/comments", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                setComments(data.comment_list);

            })
            .catch(err => console.log('error: ' + err));
    }

    // Get all comments on load.
    useEffect(() => {
        fetchComments();
    }, []);

    // Send POST request for liking a comment.
    const likeComment = (comment, e) => {

        fetch("https://vast-brushlands-96580.herokuapp.com/api/comments/like", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: comment._id
            })
        })
            .then(res => res.json())
            .then(data => {
                updateLikeDisplay(e.target);
            })
            .catch(err => console.log('error: ' + err));
    }

    // Send POST request for liking a post.
    const likePost = (post, e) => {

        fetch("https://vast-brushlands-96580.herokuapp.com/api/posts/like", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: post._id
            })
        })
            .then(res => res.json())
            .then(data => {
                updateLikeDisplay(e.target);
            })
            .catch(err => console.log('error: ' + err));
    }

    // Locally update the displayed like count.
    const updateLikeDisplay = (target) => {
        const parent = target.parentElement
        const likeBox = parent.querySelector('.like-count');

        const prevCount = likeBox.innerText;
        const newCount = parseInt(prevCount) + 1;

        likeBox.innerText = newCount;
    }

    // Show sign in panel.
    const showSignIn = () => {
        const panel = document.getElementById('sign-in');
        panel.classList.toggle('shown');

        // Offset second panel if both visible.
        const shownPanels = Array.from(document.querySelectorAll('.shown'));
        if (shownPanels.length > 1) {
            panel.classList.add('offset');
        }
    }

    // Show sign up panel.
    const showSignUp = () => {
        const panel = document.getElementById('sign-up');
        panel.classList.toggle('shown');

        // Offset second panel if both visible.
        const shownPanels = Array.from(document.querySelectorAll('.shown'));
        if (shownPanels.length > 1) {
            panel.classList.add('offset');
        }
    }

    // Convert a date object to a readable format.
    const convertDate = (date) => {
        const options = { month: 'short', day: 'numeric' };
        const newDate = new Date(date);

        return newDate.toLocaleDateString("en-US", options);
    }


    if (props.post) {
        return (

            <div id="post">
                <div id='navbar'>
                    <div>{props.user ? `Signed in as ${props.user.username}` : 'Sign in to comment!'}</div>
                    <div id='nav-btns'>
                        <button onClick={props.signOutUser}>Sign Out</button>

                        <button onClick={showSignIn}>Sign In</button>
                        <button onClick={showSignUp}>Sign Up</button>
                    </div>


                    <SignIn setUser={props.setUser} />

                    <SignUp />
                </div>
                <div id='computer-content'>
                    <div id='msg-box'></div>
                    <div className='post-screen-title'>
                        {props.post.title}
                    </div>

                    <div className='post-username'>
                        Posted by {props.post.username} on {convertDate(props.post.postDate)}
                    </div>

                    <div className='post-content'>
                        {props.post.content}
                    </div>

                    <button className='like-post-btn' onClick={(e) => likePost(props.post, e)}>
                        Like <span className='like-count'>{props.post.likes}</span>
                    </button>


                    <CommentForm
                        post={props.post}
                        user={props.user}
                        fetchComments={fetchComments}
                    />

                    {comments !== null && props.post !== null ? comments.map((comment, index) => {

                        if (props.post._id !== comment.post) return null

                        return <div
                            className='comment'
                            key={uniqid()}
                        >

                            <div className='comment-username'>
                                <div>
                                    <span>{comment.pic}</span>
                                    {comment.username}
                                </div>

                                <div className='comment-date'>{convertDate(comment.postDate)}</div>
                            </div>

                            <div className='comment-content'>
                                {comment.comment}
                            </div>

                            <button className='like-comment-btn' onClick={(e) => likeComment(comment, e)}>
                                Like <span className='like-count'>{comment.likes}</span>
                            </button>


                        </div>


                    }) :
                        <div> No comments yet! </div>
                    }

                </div>





            </div>
        )
    } else {
        return (
            <div id='post'>
                <div id='navbar'>
                    <div>{props.user ? `Signed in as ${props.user.username}` : 'Sign in to comment!'}</div>

                    <div id='nav-btns'>
                        <button onClick={props.signOutUser}>Sign Out</button>

                        <button onClick={showSignIn}>Sign In</button>
                        <button onClick={showSignUp}>Sign Up</button>
                    </div>


                    <SignIn setUser={props.setUser} />

                    <SignUp />
                </div>

                <div id='computer-content'>
                    <div id='msg-box'>
                        <div className='error'>NO DISK LOADED</div>
                    </div>

                    <div>Hey</div>
                    <div>You need to choose a disk</div>
                    <div> And then open it</div>
                    <div>And then load it </div>
                </div>



            </div>
        )
    }
}

export default Post;