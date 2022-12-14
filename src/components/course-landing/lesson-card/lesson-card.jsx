import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getLesson } from "../../../cloud-infrastructure/firebase";

function LessonCard({ lesson_ref, course_id }) {
    const [lesson, setLesson] = useState({});

    const get_lesson_information = useCallback(() => {
        getLesson(lesson_ref).then((item) => {
            setLesson(item);
        });
    }, [lesson_ref]);

    const _get_difficulty = () => {
        if (lesson.difficulty === 0) {
            return require("../../../assets/difficulty/easy.svg").default;
        } else if (lesson.difficulty === 1) {
            return require("../../../assets/difficulty/medium.svg").default;
        } else {
            return require("../../../assets/difficulty/hard.svg").default;
        }
    };

    const _get_difficulty_name = () => {
        if (lesson.difficulty === 0) {
            return "easy";
        } else if (lesson.difficulty === 1) {
            return "medium";
        } else {
            return "hard";
        }
    };

    useEffect(() => {
        get_lesson_information();
    }, [get_lesson_information]);

    return (
        <Link
            className={"academy-content-minigame"}
            to={`/lesson/?lesson_id=${lesson.id}&course_id=${course_id}`}
        >
            <div className={"academy-content-minigame-image"}>
                <img
                    className={"academy-content-minigame-image-data"}
                    src={lesson.thumbnail}
                    alt={"minigame Notational Data 1"}
                />
            </div>
            <div className={"academy-content-minigame-title"}>
                <p>{lesson.title}</p>
            </div>
            <div className={"academy-content-course-info"}>
                <img
                    src={require("../../../assets/time.png")}
                    alt={"This course is expected to take 30 minutes"}
                />
                <p>{lesson.time} minutes</p>
            </div>
            <div className={"academy-content-minigame-info"}>
                <img
                    src={_get_difficulty()}
                    alt={"This minigame is expected to take 30 minutes"}
                />
                <p>{_get_difficulty_name()}</p>
            </div>
        </Link>
    );
}

export default LessonCard;
