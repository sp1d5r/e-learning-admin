import {Button, Form} from "react-bootstrap";
import React, {useEffect} from "react";
import {uploadFile} from "../../../cloud-infrastructure/firebase";

function LessonMetadataComponent(
    {
        lessonMetadata,
        onChange,
        successful_image_upload,
        failed_image_upload,
    }
    ){

    const _get_difficulty_name = () => {
        if (lessonMetadata.difficulty === 0) {
            return "  Easy";
        } else if (lessonMetadata.difficulty === 1) {
            return "  Medium";
        } else if (lessonMetadata.difficulty > 1) {
            return "  Hard";
        } else {
            return "difficulty ";
        }
    };

    useEffect(() => {
        console.log("rerender")
    }, [lessonMetadata.thumbnail])

    const upload_image = (image) => {
        const objectUrl = URL.createObjectURL(image[0])
        const event = {
            target: {
                name: 'thumbnail',
                value: objectUrl,
            },
        };
        onChange(event);
        uploadFile(image[0], "lesson-images/", successful_image_upload, failed_image_upload);
    }

    return <div>
        <Form.Group
            className={"mb-3 editing-lesson-md"}
            style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <Form.Label>Lesson Title</Form.Label>
            <Form.Control type="text" name="title" placeholder={lessonMetadata.title} onChange={
                onChange
            }/>

            <Form.Label>Lesson Description</Form.Label>
            <Form.Control type="text" name="description" placeholder={lessonMetadata.description} onChange={
                onChange
            }/>

            <div className={"divider-div"}/>

            <Form.Label>Upload Thumbnail</Form.Label>
            <img style={{width: "30%"}} alt={""} src={lessonMetadata.thumbnail ? lessonMetadata.thumbnail : require("../../../assets/add-course.png")} className={"course-image"}/>
            <br/>
            <Form.Control type="text" name="thumbnail" placeholder={lessonMetadata.thumbnail} onChange={
                onChange
            }/>
            <Form.Group controlId="formFile" className="mb-3">
                <input className="form-control"
                       type={"file"}
                       ref={lessonMetadata.imageFile}
                       onChange={(e) => upload_image((e.target.files))}/>
            </Form.Group>

            <div className={"divider-div"}/>

            <Form.Label>Lesson Difficulty</Form.Label>
            <Form.Select aria-label="Default select example" name="difficulty" onChange={onChange}>
                <option>Difficulty: {_get_difficulty_name()}</option>
                <option value="1">Easy</option>
                <option value="2">Medium</option>
                <option value="3">Hard</option>
            </Form.Select>

            <div className={"divider-div"}/>
            <Form.Label>Lesson Time </Form.Label>
            <Form.Control type="number" name="time" placeholder={lessonMetadata.time}  onChange={onChange
            }/>
        </Form.Group>
    </div>
}

export default LessonMetadataComponent;