import React, {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {editCourse, uploadCourse, uploadFile} from "../../../cloud-infrastructure/firebase";
import {Draggable} from "react-drag-reorder";

function EditCourse({id, courseThumbnail, courseTitle, courseTime, courseDifficutly, lessons}) {
    const [thumbnail, setThumbnail] = useState(courseThumbnail)
    const fileInput = React.createRef();

    const [courseName, setCourseName] = useState(courseTitle)
    const [difficulty, setDifficulty] = useState(courseDifficutly);
    const [time, setTime] = useState(courseTime);
    const [newLessons, newLessonsOrder] = useState(lessons.map((i) => {return i}));
    const [errors, setErrors] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [url, setURL] = useState(courseThumbnail);
    const navigate = useNavigate();

    const _get_difficulty_name = () => {
        if (difficulty === 0) {
            return "  Easy";
        } else if (difficulty === 1) {
            return "  Medium";
        } else if (difficulty > 1) {
            return "  Hard";
        } else {
            return "difficulty ";
        }
    };

    const successful_image_upload = (url) => {
        setURL(url);
    }

    const failed_image_upload = (errors) => {
        setErrors([errors]);
        setRefresh(!refresh);
    }

    const successful_course_upload = () => {
        window.location.reload();
    }

    const failed_course_upload = (errors) => {
        setErrors([errors]);
        setRefresh(!refresh);
    }

    const upload_image = (image) => {
        console.log(image)
        const objectUrl = URL.createObjectURL(image[0])
        setThumbnail(objectUrl)
        uploadFile(image[0], "course-images/", successful_image_upload, failed_image_upload);
    }

    const checkFields = () => {
        const err = [];
        if (courseName === "") {
            err.push("Add Course Name")
        }

        if (url === "") {
            err.push("Thumbnail not uploaded successfully")
        }

        if (!thumbnail) {
            err.push("Set Thumbnail")
        }
        setErrors(err);
        setRefresh(!refresh);
        return err.length === 0;
    }

    const submit = () => {
        if (checkFields()) {
            editCourse(id, courseName, thumbnail, difficulty, newLessons, successful_course_upload, failed_course_upload)
            // uploadCourse(courseName, url, time, difficulty, successful_course_upload, failed_course_upload)
        }

        window.scrollTo(0,0);
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    function arraymove(arr, fromIndex, toIndex) {
        var element = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, element);
        return arr;
    }

    const onDragEnd = (destination, source ) => {
        // dropped outside the list
        const newItems = arraymove(newLessons.map(i => {
            return i
        }), source, destination);

        newLessonsOrder(newItems);
        console.log(newItems);
    };


    return (
        <>
            <Form className={"editing-course-div"}>
                <div className="divider"><p className="divider-text">new course</p>
                    <div></div>
                </div>
                {
                    url ?
                        <Alert variant={"primary"}>
                            Image uploaded Successfully! You can upload this course now: <a>{url}</a>
                        </Alert> :
                        <></>
                }

                {
                    errors.length > 0 && <Alert variant={"danger"}>
                        <b>There are a few errors on your forum</b>
                        <ul>
                            {errors.length > 0 && errors.map((error) => {
                                return <li>{error}</li>
                            })}
                        </ul>
                    </Alert>
                }
                <Form.Group className={"mb-3 editing-image-div"} style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                    <Form.Label>Upload Thumbnail</Form.Label>
                    <img alt={""} src={thumbnail ? thumbnail : require("../../../assets/add-course.png")} className={"course-image"}/>
                    <br/>
                    <Form.Group controlId="formFile" className="mb-3">
                        <input className="form-control" type={"file"} ref={fileInput} onChange={(e) => upload_image((e.target.files))}/>
                    </Form.Group>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Course Title</Form.Label>
                    <Form.Control type="text" placeholder={courseName} onChange={
                        (e) => {
                            if (e.target.value !==""){
                                setCourseName(e.target.value)
                            }
                        }
                    }/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Course Difficulty</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={(e) => {
                        setDifficulty(e.target.value);
                    }}>
                        <option>Difficulty: {_get_difficulty_name()}</option>
                        <option value="1">Easy</option>
                        <option value="2">Medium</option>
                        <option value="3">Hard</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Course Time </Form.Label>
                    <Form.Control type="number" placeholder={time}  onChange={(e) => {
                        if (e.target.value !== null){
                            setTime(e.target.value)
                        }
                    }
                    }/>
                    <Form.Text id="passwordHelpBlock" muted>
                        Don't worry you can change this later
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Label>Reorder Courses </Form.Label>
                    <table style={{width: "100%"}}>
                        <Draggable onPosChange={(currentPos, newPos) => {onDragEnd(newPos, currentPos);}}>
                            {newLessons &&
                                newLessons.map((lesson_ref, index) => {
                                    return (
                                        <div style={{outline: "1px solid #000000", padding: "1%"}}>
                                            {lesson_ref.title}
                                        </div>
                                    );
                                })
                            }
                        </Draggable>
                    </table>
                </Form.Group>

                <Button variant="primary" onClick={() => {submit()}}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default EditCourse;