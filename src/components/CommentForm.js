import showMessages from "../showError";

function CommentForm(props) {

    // Sign user in based on sign in fields.
    const postComment = () => {
        const comment = document.getElementById('comment').value;

        fetch("/api/comments/new", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: props.user.username,
                comment: comment,
                post: props.post
            })
        })
            .then(res => res.json())
            .then(data => {
                // Update comments
                props.fetchComments();

                console.log(data);

                // Show message, if any.
                if (data.errors) {
                    showMessages(data.errors);
                } else {
                    showMessages(['Comment posted!'], true);
                }

            })
            .catch(err => console.log('error: ' + err));

    }

    return (
        <div id="comment-form">

            {props.user && props.post ?
                <div id='comment-form'>
                    <label htmlFor='comment'> Comment </label>
                    <input id='comment' name='comment'></input>

                    <button type='submit' onClick={postComment}> Submit </button>
                </div>
                :

                <div id='comment-form'>
                    Please sign in to comment.
                </div>

            }



        </div>
    );
}

export default CommentForm;