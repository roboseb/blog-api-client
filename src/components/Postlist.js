import { useState, useEffect, useCallback } from "react";
import Post from "./Post";
import uniqid from "uniqid";
import CommentForm from "./CommentForm";
import Crystal from "./Crystal";

function Postlist(props) {
    const [posts, setPosts] = useState(null);
    

    const fetchPosts = () => {
        console.log('fetching...');

        fetch("/api/posts", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.post_list[1]);
                setPosts(data.post_list);

            })
            .catch(err => console.log('error: ' + err));
    }

    useEffect(() => {
        fetchPosts();
    }, []);


    return (
        <div id="postlist">


            {posts !== null ? posts.map((post, index) => {
                return <div
                    className='post'
                    key={uniqid()}
                    onClick={() => props.setCurrentPost(post)}
                >

                    {/* <div className='post-username'>
                        {post.username}
                    </div> */}
                    <div className='post-title'>
                        {post.title}
                    </div>
                    {/* <div className='post-preview'>
                        {post.content}
                    </div> */}

                    <Crystal />
                    <div className='crystal-cap'></div>

                </div>
            }) : null}


        </div>
    );
}

export default Postlist;