import React from "react";
import "./deception-video-add.css";
import {Link} from "react-router-dom";

function DeceptionVideoAdd() {
    return <>
        <Link className={"deception-detection-add"} to={"/add-deception-detection"}>
            <p className={"course-plus"}>
                +
            </p>
            <p>
                add lesson
            </p>
        </Link>
    </>
}

export default DeceptionVideoAdd;