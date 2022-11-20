import React from "react";
import "./deception-video.css";

function DeceptionVideo() {

    return <>
        <div className={"true-false-video"} >
            <div className={"video"}>
                <video />

            </div>
            <div>
                <span className={"video-answer"}>Answer:</span> <span >True</span>
            </div>
            <div>
                <span className={"video-answer"}>Explanation:</span>
                <span>
                This is the explanation for the video.
                </span>
            </div>
        </div>
    </>
}

export default DeceptionVideo;