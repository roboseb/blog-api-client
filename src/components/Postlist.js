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
        fetch("https://vast-brushlands-96580.herokuapp.com/api/posts", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {
                setPosts(data.post_list);

            })
            .catch(err => console.log('error: ' + err));
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    // Insert a disk into the computer.
    const setDisk = (index, post, e) => {
        const diskList = Array.from(document.querySelectorAll('.post-wrap'));

        //Unload current post if changing disks.
        if (post !== nextPost) {
            props.setCurrentPost(null);

            // Animate unlocking the disk slot.
            const slot = document.getElementById('disk-slot');
            slot.classList.remove('locked');
        }

        diskList.forEach((disk, diskIndex) => {
            if (diskIndex === index) {
                disk.classList.add('selected');
            } else {
                disk.classList.remove('selected', 'decased');
            }
        });

        // Open disk if open btn clicked.
        if (e.target.classList.contains('open-btn')) {

            // Animated disk slot.
            const slot = document.getElementById('disk-slot');
            slot.classList.add('locked');

            // Remove case from disk if already inserted.
            if (diskList[index].classList.contains('selected')) {
                diskList[index].classList.add('decased');
                nextPost = post;
            }
        }
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

            </div>
        </div>
    );
}

const Postlist = memo(WrappedPostlist);
export default Postlist;