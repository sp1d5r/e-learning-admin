import React, {createRef, useState} from "react";
import {Button, Form} from "react-bootstrap";
import "./add-lesson.css"
import Markdown from "markdown-to-jsx";

function AddLesson() {
    /* Markdown File Handle */
    const markdownFile = createRef();
    const [content, setContent] = useState("#### Upload to see lesson preview");

    /* Image File Handle */
    const imageFile = createRef();
    const [thumbnail, setThumbnail] = useState()

    /* Lesson Data */
    const [title, setTitle] = useState("");
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

    const upload_markdown = (file) => {
        const objectUrl = URL.createObjectURL(file[0])

        // axios.get(objectUrl).then(function (response) {
        //     // handle success
        //     setContent(response.data);
        // });

        // clear memory to prevent leaks
        // URL.revokeObjectURL(objectUrl)
    }

    const upload_image = (image) => {
        const objectUrl = URL.createObjectURL(image[0])
        setThumbnail(objectUrl)

        //URL.revokeObjectURL(objectUrl)
    }

    return <>
        <Form className={"editing-course-div"}>
            <div className="divider"><p className="divider-text">new lesson</p>
                <div></div>
            </div>

            <Form.Group className={"mb-3 editing-lesson-md"} style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                <Form.Label>Course Title</Form.Label>
                <Form.Control type="text" placeholder={title} onChange={
                    (e) => {
                        if (e.target.value !==""){
                            setTitle(e.target.value)
                        }
                    }
                }/>

                <div className={"divider-div"}/>

                <Form.Label>Upload Thumbnail</Form.Label>
                <img style={{width: "30%"}} alt={""} src={thumbnail ? thumbnail : require("../../assets/add-course.png")} className={"course-image"}/>
                <br/>
                <Form.Group controlId="formFile" className="mb-3">
                    <input className="form-control" type={"file"} ref={imageFile} onChange={(e) => upload_image((e.target.files))}/>
                </Form.Group>

                <div className={"divider-div"}/>

                <Form.Label>Upload Markdown Lesson</Form.Label>
                <Form.Group controlId="formFile" className="mb-3">
                    <input className="form-control" type={"file"} ref={markdownFile} onChange={(e) => {upload_markdown(e.target.files)}}/>
                </Form.Group>

                <div className={"divider-div"}/>

                <Form.Label>Course Difficulty</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => {
                    setDifficulty(e.target.value);
                }}>
                    <option>Difficulty: {_get_difficulty_name()}</option>
                    <option value="1">Easy</option>
                    <option value="2">Medium</option>
                    <option value="3">Hard</option>
                </Form.Select>

                <div className={"divider-div"}/>
                <Form.Label>Course Time </Form.Label>
                <Form.Control type="number" placeholder={time}  onChange={(e) => {
                    if (e.target.value !== null){
                        setTime(e.target.value)
                    }
                }
                }/>
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