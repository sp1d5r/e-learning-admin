import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

function AddCourse() {
    const [thumbnail, setThumbnail] = useState("../../../")
    const [courseName, setCourseName] = useState("")
    const [difficulty, setDifficulty] = useState(0);
    const [time, setTime] = useState(0);

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

    return (
        <>
            <Form className={"editing-course-div"}>
                <Form.Group className={"mb-3 editing-image-div"} style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                    <img alt={""} src={thumbnail} className={"course-image"}/>
                    <br/>
                    <Form.Group controlId="formFile" className="mb-3">
                        <Form.Control type="file" />
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

                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default AddCourse;