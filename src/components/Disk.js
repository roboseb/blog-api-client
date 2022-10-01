import { memo } from "react";

const NewDisk = (props) => {


    const getWidth = () => {
        const box = document.getElementById('postlist');
        console.log(box.offsetWidth)

        return box.offsetWidth;
    }

    return (
        <div
            className='post-wrap cube-wrap'
            style={{ right: `${getWidth() / props.count * (props.index)}px` }}
        >
            <div
                className="cube post"
                onClick={(e) => {
                    props.setDisk(props.index, props.post);
                }
                }
            >


                <div className="cube__face cube__face--front">
                    <div className='post-title'>
                        {props.post.title}
                    </div>

                    {/* <Crystal /> */}

                    {/* <div className='crystal-cap'></div> */}
                </div>
                <div className="cube__face cube__face--back"></div>
                <div className="cube__face cube__face--right"></div>
                <div className="cube__face cube__face--left"></div>
                <div className="cube__face cube__face--top"></div>
                <div className="cube__face cube__face--bottom"></div>

                <div className="crystal-box-left"></div>
                <div className="crystal-box-right"></div>



                <div className="crystal1 crystal-back-top-left"></div>
                <div className="crystal2 crystal-back-top-right"></div>
                <div className="crystal2 crystal-back-bottom-left"></div>
                <div className="crystal1 crystal-back-bottom-right"></div>

                <div className="crystal2 crystal-top-left"></div>
                <div className="crystal1 crystal-top-right"></div>
                <div className="crystal1 crystal-bottom-left"></div>
                <div className="crystal2 crystal-bottom-right"></div>
            </div>
        </div>
    )
}

const Disk = memo(NewDisk);
export default Disk;