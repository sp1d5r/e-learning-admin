import React, {useEffect, useState} from "react";
import "./deception-detection.css";
import DeceptionVideo from "./deception-video/deception-video";
import {getAllDeceptionVideos, getCountOfMinigames} from "../../cloud-infrastructure/firebase";

function DeceptionDetection() {
    const [lessons, setLessons] = useState([]);
    const [numberOfLessons, setLessonCount] = useState(0);

    useEffect(() => {
        getCountOfMinigames().then((count) => {
            setLessonCount(count);
            for (let i=0; i<count; i=i+50){
                getAllDeceptionVideos(i, i+50, count).then((docs) => {
                    let lessonDocs = [];
                    docs.forEach((doc) => {
                        console.log(doc)
                        lessonDocs.push(doc);
                    })
                    setLessons(lessonDocs);
                    console.log(lessonDocs)
                })
            }
        })
    }, [])

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
                    lessons.map((doc) => {
                        return <DeceptionVideo />
                    })
                }
            </div>
        </div>
    </>
}

export default DeceptionDetection;