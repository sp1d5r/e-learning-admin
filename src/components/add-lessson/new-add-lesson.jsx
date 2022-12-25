import React, {createRef, useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import Page from "./page/page";
import {uploadFile, uploadLesson} from "../../cloud-infrastructure/firebase";
import {useSearchParams} from "react-router-dom";

function NewAddLesson() {
    const search_params = useSearchParams()[0];
    const course_id = search_params.get("course_id");

    /* Markdown File Handle */
    const markdownFile = createRef();
    const [content, setContent] = useState("#### Upload to see lesson preview");

    /* Image File Handle */
    const imageFile = createRef();
    const [thumbnail, setThumbnail] = useState()
    const [url, setURL] = useState();

    /* Lesson Data */
    const [title, setTitle] = useState("");
    const [difficulty, setDifficulty] = useState(0);
    const [time, setTime] = useState(0);
    const [errors, setErrors] = useState([]);
    const [success, setSuccess] = useState("");

    /* Lesson Content */
    const [pages, setPages] = useState([{}]);
    const [currentPage, setCurrentPage] = useState({});
    const [refresh, setRefresh] = useState(false);

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

    const upload_image = (image) => {
        console.log(image)
        const objectUrl = URL.createObjectURL(image[0])
        setThumbnail(objectUrl)
        uploadFile(image[0], "lesson-images/", successful_image_upload, failed_image_upload);
    }

    const addPage = () => {
        const _pages = pages;
        _pages.push({});
        setPages(_pages);
        updateRefresh();
    }

    const updateRefresh = () => {
        setRefresh(!refresh);
    }

    const success_lesson_upload = (ref) => {
        setSuccess(ref);
        window.scrollTo(0,0);
    }

    const failed_lesson_upload = (error) => {
        setErrors([error]);
    }

    const upload_lessons = () => {
        uploadLesson(course_id, title, url, difficulty, time, pages, success_lesson_upload, failed_lesson_upload);
    }

    return (
        <>
            <Form className={"editing-course-div"}>
                {
                    success ?
                        <Alert variant={"primary"}>
                            Lesson Upload Complete <a>{success}</a>
                        </Alert> :
                        <></>
                }

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
                <div className="divider"><p className="divider-text">Lesson Content</p>
                    <div></div>
                </div>

                <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {
                        pages.map((page, index) => {
                            return <Page
                                index={index}
                                page={page}
                                pages={pages}
                                setPages={setPages}
                                updateRefresh={updateRefresh}
                            />
                        })
                    }
                </div>

                <Form.Group className={"lesson-upload-div"}>
                    <Button variant={"primary"} onClick={() => {addPage()}}>
                        New Page
                    </Button>
                </Form.Group>


                <Form.Group className={"lesson-upload-div"}>
                    <Button variant={"danger"} onClick={() => {console.log(pages)}}>
                        Check Pages Data (Console)
                    </Button>
                </Form.Group>

                <Form.Group className={"lesson-upload-div"}>
                    <Button variant={"success"} onClick={() => {upload_lessons()}}>
                        Upload Lessons
                    </Button>
                </Form.Group>
            </Form>
        </>
    )
}

export default NewAddLesson;