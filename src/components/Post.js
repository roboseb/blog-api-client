import CommentForm from "./CommentForm";
import { useEffect, useState } from "react";
import uniqid from "uniqid";

function Post(props) {

    const [comments, setComments] = useState(null);

    const fetchComments = () => {
        console.log('fetching comments...');

        fetch("/api/comments", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
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
        console.log('liking comment...');

        fetch("/api/comments/like", {
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
                console.log('comment liked succesfully')
                updateLikeDisplay(e.target);
            })
            .catch(err => console.log('error: ' + err));
    }

    // Send POST request for liking a post.
    const likePost = (post, e) => {
        console.log('liking post...');

        fetch("/api/posts/like", {
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
                console.log('post liked succesfully')
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


    return (
        <div id="post">

            <div className='post-username'>
                {props.post !== null ? props.post.username : null}
            </div>
            <div className='post-screen-title'>
                {props.post !== null ? props.post.title : null}
            </div>
            <div className='post-content'>
                {props.post !== null ? props.post.content : null}
            </div>

            <button className='like-post-btn' onClick={(e) => likePost(props.post, e)}>
                Like
            </button>

            <div className='like-count'>
                {props.post !== null ? props.post.likes : null}
            </div>

            {comments !== null && props.post !== null ? comments.map((comment, index) => {

                if (props.post._id !== comment.post) return null

                return <div
                    className='comment'
                    key={uniqid()}
                >

                    <div className='comment-username'>
                        {comment.username}
                    </div>

                    <div className='comment-pic'>
                        {comment.pic}
                    </div>

                    <div className='comment-content'>
                        {comment.comment}
                    </div>

                    <button className='like-comment-btn' onClick={(e) => likeComment(comment, e)}>
                        Like
                    </button>

                    <div className='like-count'>{comment.likes}</div>

                </div>


            }) :
                <div> No comments yet! </div>
            }

            <CommentForm
                post={props.post}
                user={props.user}
                fetchComments={fetchComments}
            />

        </div>
    );
}

export default Post;