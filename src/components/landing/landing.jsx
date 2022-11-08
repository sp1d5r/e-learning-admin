import Alert from 'react-bootstrap/Alert';
import "./landing.css";
import {getCourses} from "../../cloud-infrastructure/firebase";
import CourseCard from "./course-card/course-card";
import {useState, useEffect} from "react";
import MiniGameCard from "./minigame-card/minigame-card";

function Landing() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const courseItems = () => {
        getCourses().then((_courses) => {
            setCourses(_courses);
            setLoading(false);
        });
    };

    const minigameItems = () => {
        return [
            {
                imagePath: require("../../assets/minigame-notational/minigame1.png"),
                title: "First Impressions",
                time: 30,
                difficulty: 0,
            },
            {
                imagePath: require("../../assets/minigame-notational/minigame2.png"),
                title: "Catch a Liar",
                time: 30,
                difficulty: 1,
            },
            {
                imagePath: require("../../assets/minigame-notational/minigame3.png"),
                title: "Tracking Client Emotions",
                time: 30,
                difficulty: 2,
            },
        ];
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

            <div className={"minigames"}>
                {minigameItems().map((item, index) => {
                    return (
                        <MiniGameCard
                            imagePath={item.imagePath}
                            title={item.title}
                            time={item.time}
                            difficulty={item.difficulty}
                        />
                    );
                })}
            </div>

        </div>
    )
}

export default Landing;