import { useState, useEffect, useCallback, memo } from "react";
import Post from "./Post";
import uniqid from "uniqid";
import CommentForm from "./CommentForm";
import Crystal from "./Crystal";
import Disk from "./Disk";

const WrappedPostlist = (props) => {
    const [posts, setPosts] = useState(null);

    let nextPost = null;

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

    // Insert a disk into the computer.
    const setDisk = (index, post) => {
        const diskList = Array.from(document.querySelectorAll('.post-wrap'));

        // Remove case from disk if already inserted.
        if (diskList[index].classList.contains('selected')) {
            diskList[index].classList.add('decased');
            nextPost = post;
            return;
        }

        diskList.forEach((disk, diskIndex) => {
            if (diskIndex === index) {
                disk.classList.add('selected');
            } else {
                disk.classList.remove('selected', 'decased');
            }
        });
    }

    // Load an inserted disk into the computer.
    const loadDisk = () => {
        const disk = document.querySelector('.decased');
        if (disk) {
            props.setCurrentPost(nextPost);
        }
    }


    return (
        <div id='postlist-wrap'>
            <div id='disk-controls'>
                <button id='load-btn' onClick={loadDisk}>
                    <div>Load</div>
                </button>

                <div id='disk-slot'></div>
            </div>

            <div id="postlist" className='cubed'>



                {posts !== null ? posts.map((post, index) => {
                    return (
                        <Disk
                            post={post}
                            setCurrentPost={props.setCurrentPost}
                            key={uniqid()}
                            setDisk={setDisk}
                            index={index}
                            count={posts.length}
                        />
                    )
                }) : null}


                {/* <div className="cube-wrap">
                    <div className="cube">
                        <div className="cube__face cube__face--front">front</div>
                        <div className="cube__face cube__face--back">back</div>
                        <div className="cube__face cube__face--right">right</div>
                        <div className="cube__face cube__face--left">left</div>
                        <div className="cube__face cube__face--top">top</div>
                        <div className="cube__face cube__face--bottom">bottom</div>
                    </div>
                </div> */}


            </div>
        </div>
    );
}

const Postlist = memo(WrappedPostlist);
export default Postlist;