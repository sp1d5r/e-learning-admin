import React, {useEffect} from "react";
import "./deception-video.css";

function DeceptionVideo({doc}) {

    return <>
        <div className={"true-false-video"} >
            <div className={"video"}>
                <video src={doc.videoUrl} style={{width: "90%", margin: "auto"}}/>

            </div>
            <div>
                <span className={"video-answer"}>Answer:</span> <span >{`${doc.correctOption}`}</span>
            </div>
            <div>
                <span className={"video-answer"}>Explanation:</span>
                <span>
                {doc.correctPrompt}
                </span>
            </div>
            <div>
                <span className={"video-answer"}>Index:</span> <span >{`${doc.index}`}</span>
            </div>
        </div>
    </>
}

export default DeceptionVideo;