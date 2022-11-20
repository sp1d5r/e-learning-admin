import React, {createRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import "./add-lesson.css"
import Markdown from "markdown-to-jsx";

function AddLesson() {
    const fileInput = createRef();
    const [content, setContent] = useState("#### Upload to see lesson preview");

    return <>
        <Form className={"editing-course-div"}>
            <div className="divider"><p className="divider-text">new lesson</p>
                <div></div>
            </div>

            <Form.Group className={"mb-3 editing-lesson-md"} style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <Form.Label>Upload Markdown Lesson</Form.Label>
                <Form.Group controlId="formFile" className="mb-3">
                    <input className="form-control" type={"file"} ref={fileInput} onChange={(e) => {}}/>
                </Form.Group>
            </Form.Group>

            {/* Previewing the Lesson */}
            <div className="divider"><p className="divider-text">preview lesson</p>
                <div></div>
            </div>
            <div className={"markdown-container"}>
            <Markdown className={"lesson-landing-body-markdown"}>
                {content}
            </Markdown>
            </div>

            <div className={"divider-div"}>

            </div>

            <Form.Group className={"lesson-upload-div"}>
                <Button variant={"success"}>
                    Upload Lesson
                </Button>
            </Form.Group>
        </Form>
    </>
}

export default AddLesson;