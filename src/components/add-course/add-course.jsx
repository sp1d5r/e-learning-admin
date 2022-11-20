import React, {useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";

function AddCourse() {
    const [thumbnail, setThumbnail] = useState()
    const fileInput = React.createRef();

    const [courseName, setCourseName] = useState("")
    const [difficulty, setDifficulty] = useState(0);
    const [time, setTime] = useState(0);
    const [errors, setErrors] = useState([]);

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

    const upload_image = (image) => {
        console.log(image)
        const objectUrl = URL.createObjectURL(image[0])
        setThumbnail(objectUrl)
    }

    const submit = () => {
        setErrors(["Sorry this function is not ready yet"]);
        window.scrollTo(0,0);
    }

    return (
        <>

            <Form className={"editing-course-div"}>
                <div className="divider"><p className="divider-text">new course</p>
                    <div></div>
                </div>
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
                    <img alt={""} src={thumbnail ? thumbnail : require("../../assets/add-course.png")} className={"course-image"}/>
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

                <Button variant="primary" onClick={() => {submit()}}>
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default AddCourse;