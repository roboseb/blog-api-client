import { useState, useEffect } from "react";

import Disk from "./Disk";
import uniqid from "uniqid";

const ComputerBase = (props) => {
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
        <div id='computer-base' className='cube'>
            <div className="cube__face cube__face--front"></div>
            <div className="cube__face cube__face--bottom"></div>

            {/* <div id='computer-post-list'>
                {posts !== null ? posts.map((post, index) => {
                    return (
                        <Disk
                            key={uniqid()}
                            post={post}
                            setCurrentPost={null}
                        />
                    )
                }) : null}
            </div> */}
        </div >
    )
}

export default ComputerBase;