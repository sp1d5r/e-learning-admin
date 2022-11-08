import Alert from 'react-bootstrap/Alert';
import "./landing.css";
import {getCourses} from "../../cloud-infrastructure/firebase";
import CourseCard from "./course-card/course-card";
import {useState, useEffect} from "react";

function Landing() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const courseItems = () => {
        getCourses().then((_courses) => {
            setCourses(_courses);
            setLoading(false);
        });
    };

    useEffect(() => {
        courseItems();
    }, []);

    return (
        <div className={"container-main"}>
            <Alert key={"success"} variant={"success"}>
                Admin panel set up!
            </Alert>

            {/* Courses */}
            <div className={"divider"}>
                <p className={"divider-text"}>
                    Courses
                </p>
                <div/>
            </div>

            <div className={"courses"}>
            {loading ? (
                <></>
            ) : (
                <>
                    {courses.map((item, index) => {
                        return (
                            <CourseCard
                                imagePath={item.thumbnail}
                                title={item.courseName}
                                id={item.id}
                                time={item.time}
                                key={index}
                            />
                        );
                    })}
                </>
                )}
            </div>

            {/* Minigames */}
            <div className={"divider"}>
                <p className={"divider-text"}>
                    Minigames
                </p>
                <div/>
            </div>


        </div>
    )
}

export default Landing;