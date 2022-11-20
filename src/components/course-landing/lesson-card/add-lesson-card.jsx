import React from "react";
import { Link } from "react-router-dom";

function AddLessonCard({ lesson_ref, course_id }) {

    return (
        <Link
            className={"course-lesson-add"}
            to={`/add-lesson/?course_id=${course_id}`}
        >
            <p className={"course-plus"}>
                +
            </p>
            <p>
                add lesson
            </p>
        </Link>
    );
}

export default AddLessonCard;
