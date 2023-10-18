import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./course-landing.css";

import LessonCard from "./lesson-card/lesson-card";
import {getCourse, getLesson} from "../../cloud-infrastructure/firebase";
import {Breadcrumb, Button} from "react-bootstrap";
import AddLessonCard from "./lesson-card/add-lesson-card";
import EditCourse from "./edit-course/edit-course";

function CourseLanding() {
    /* The URL looks like : http://localhost:3000/course/?course_id=gvhvgvhv
    and the course id you get is gvhvgvhv
    */
    const search_params = useSearchParams()[0];
    const course_id = search_params.get("course_id");
    const [lessons, setLessons] = useState([]);
    const [edit, setEdit] = useState(false);
    const [course_information, set_course_information] = useState({
        courseName: "Loading...",
        time: "time",
    });
    const [loading, setLoad] = useState(true);

    const get_course_information = (course_id) => {
        getCourse(course_id).then((info) => {
            set_course_information(info);
            Promise.all(info.lessons.map((lesson) => {
                return getLesson(lesson)
            })).then((res) => {
                setLessons(res);
                setLoad(false);
            })
        });
    };


    useEffect(() => {
        get_course_information(course_id);
    }, [course_id]);

    const _get_difficulty = () => {
        if (course_information.difficulty === 0) {
            return require("../../assets/difficulty/easy.svg").default;
        } else if (course_information.difficulty === 1) {
            return require("../../assets/difficulty/medium.svg").default;
        } else {
            return require("../../assets/difficulty/hard.svg").default;
        }
    };

    const _get_difficulty_name = () => {
        if (course_information.difficulty === 0) {
            return "  Easy";
        } else if (course_information.difficulty === 1) {
            return "  Medium";
        } else if (course_information.difficulty > 1) {
            return "  Hard";
        } else {
            return "difficulty ";
        }
    };

    const pressedEdit = () => {
        setEdit(!edit);
    }


    return (
        <div className={"course-landing-main"}>
            <div className={"course-breadcrumbs"}>
                <Breadcrumb className={"lesson-breadcrumb-bar"}>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active href={`/course/?course_id=`}>
                        {course_information.courseName}
                    </Breadcrumb.Item>
                </Breadcrumb>
                <Button variant={"danger"} onClick={()=>{pressedEdit()}}>Edit</Button>
            </div>

            {
                edit ? (<>
                    <EditCourse
                        id={course_id}
                        courseThumbnail={course_information.thumbnail}
                        coursColor={course_information.color}
                        courseTitle={course_information.courseName}
                        courseTime={course_information.time}
                        courseDescription={course_information.description}
                        courseDifficutly={course_information.difficulty}
                        courseTags={course_information.tags ? course_information.tags : []}
                        lessons={lessons}
                    />
                </>) : <> {loading ? (
                    <></>
                ) : (
                    <>
                        <div className={"course-landing-information"}>
                            <div className={"course-landing-title"}>
                                {course_information.courseName}
                            </div>
                            <div className={"course-landing-time"}>
                                <img
                                    className={"course-icon-size"}
                                    src={require("../../assets/time.png")}
                                    alt={`This course is expected to take 20 minutes`}
                                />
                                <p>{course_information.time} (mins)</p>
                            </div>
                            <div className={"course-landing-difficulty"}>
                                <img
                                    className={"course-icon-size"}
                                    src={_get_difficulty()}
                                    alt={"This minigame is expected to take 30 minutes"}
                                />
                                <p>{_get_difficulty_name()}</p>
                            </div>
                        </div>
                        <div className={"course-content-lessons"}>
                        <div className={"course-landing-content-section"}>
                            <p className={"course-landing-content-title"}>lessons</p>

                            <div className={"course-landing-content-section-child"}>
                                <AddLessonCard
                                    course_id={course_id}
                                />
                                {course_information &&
                                    course_information.lessons?.map((lesson_ref, index) => {
                                        return (
                                            <LessonCard
                                                lesson_ref={lesson_ref}
                                                course_id={course_id}
                                                key={index}
                                            />
                                        );
                                    })
                                }
                            </div>
                        </div>
                    </div>
                    </>
                )}</>
            }
        </div>
    );
}

export default CourseLanding;
