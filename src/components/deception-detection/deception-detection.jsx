import React from "react";
import "./deception-detection.css";
import DeceptionVideo from "./deception-video/deception-video";

function DeceptionDetection() {
    const deception = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];

    return <>
        <div className={"deception"}>
            <div className={"divider"}>
                <p className={"divider-text"}>
                    Deception Detection
                </p>
                <div/>
            </div>

            <div className={"deceotion-videos"}>
                {
                    deception.map((item) => {
                        return <DeceptionVideo />
                    })
                }
            </div>
        </div>
    </>
}

export default DeceptionDetection;