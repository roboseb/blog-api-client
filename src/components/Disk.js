import { memo, useEffect, useState } from "react";

const NewDisk = (props) => {

    const [colors, setColors] = useState({ r: 0, b: 0 })

    // Get postlist width for absolute positioning.
    const getWidth = () => {
        const box = document.getElementById('postlist');
        return box.offsetWidth;
    }

    // Process posts' likes to decide its color.
    const getColor = () => {
        const likes = props.post.likes;

        const length = props.post.content.length;

        // Process likes and post length into fractions.
        let likeFr = likes / 50;
        let lengthFr = length / 70;

        if (likeFr > 1) likeFr = 1;
        if (lengthFr > 1) likeFr = 1;


        // Convert likes and length into R and B values.
        const r = Math.floor(likeFr * 255);
        const b = Math.floor(lengthFr * 255);

        return { r, b };
    }

    // On load, set colors to be used by disk crystal.
    useEffect(() => {
        const newColors = getColor();
        setColors(newColors);
    }, []);

    return (
        <div
            className='post-wrap cube-wrap'
            style={{ right: `${getWidth() / props.count * (props.index)}px` }}
        >
            <div
                className="cube post"
                onClick={(e) => {
                    props.setDisk(props.index, props.post, e);
                }}
            >


                <div className="cube__face cube__face--front">
                    <div className='post-title'>
                        {props.post.title}
                    </div>
                    <div>{props.post.likes} {props.post.content.length}</div>
                </div>
                <div className="cube__face cube__face--back"></div>
                <div className="cube__face cube__face--right"></div>
                <div className="cube__face cube__face--left"></div>
                <div className="cube__face cube__face--top open-btn-box">
                    <button className='open-btn'>OPEN</button>
                </div>
                <div className="cube__face cube__face--bottom"></div>

                <div className="crystal-box-left"></div>
                <div className="crystal-box-right"></div>



                <div className="crystal1 crystal-back-top-left" style={{ backgroundColor: `rgb(${colors.r}, 50, ${colors.b})` }}></div>
                <div className="crystal2 crystal-back-top-right" style={{ backgroundColor: `rgb(${colors.r}, 50, ${colors.b})` }}></div>
                <div className="crystal2 crystal-back-bottom-left" style={{ backgroundColor: `rgb(${colors.r}, 50, ${colors.b})` }}></div>
                <div className="crystal1 crystal-back-bottom-right" style={{ backgroundColor: `rgb(${colors.r}, 50, ${colors.b})` }}></div>

                <div className="crystal2 crystal-top-left" style={{ backgroundColor: `rgb(${colors.r}, 50, ${colors.b})` }}></div>
                <div className="crystal1 crystal-top-right" style={{ backgroundColor: `rgb(${colors.r}, 50, ${colors.b})` }}></div>
                <div className="crystal1 crystal-bottom-left" style={{ backgroundColor: `rgb(${colors.r}, 50, ${colors.b})` }}></div>
                <div className="crystal2 crystal-bottom-right" style={{ backgroundColor: `rgb(${colors.r}, 50, ${colors.b})` }}></div>
            </div>
        </div>
    )
}

const Disk = memo(NewDisk);
export default Disk;