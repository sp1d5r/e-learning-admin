import React, {useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {Alert, Button, Form} from "react-bootstrap";
import {uploadCourse, uploadDeceptionDetection, uploadFile} from "../../cloud-infrastructure/firebase";



const useImage = ({ src }) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.src = src;
        img.onload = () => setLoaded(true);
    }, [src]);

    return loaded;
};

const MinigameVideo = ({ src, alt, pause }) => {
    const { loaded } = useImage({ src });

    useEffect(() => {
        var video = document.getElementById("myVideo");
        if (pause) {
            video.pause();
        } else {
            video.play();
        }
    }, [pause]);

    return (
        <video
            className={`mingame-video-act ${loaded}`}
            alt={alt}
            controls
            autoPlay={"autoplay"}
            id="myVideo"
            key={src}
        >
            <source src={src} type="video/mp4" />
            This browser doesn't support video tag.
        </video>
    );
};


function AddDeceptionDetection() {
    const [url, setURL] = useState("");
    const [thumbnail, setThumbnail] = useState()
    const fileInput = React.createRef();

    const [successMessage, setSuccessMessage] = useState("");

    const [errors, setErrors] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const [correctOption, setCorrectOption] = useState(null);
    const [correctPrompt, setCorrectPrompt] = useState("");
    const [source, setSource] = useState("");

    const successful_video_upload = (url) => {
        setURL(url);
        setRefresh(!refresh);
    }

    const failed_video_upload = (errors) => {
        setErrors([errors]);
        setRefresh(!refresh);
    }

    const upload_video = (video) => {
        console.log(video)
        const objectUrl = URL.createObjectURL(video[0])
        setThumbnail(objectUrl)
        uploadFile(video[0], "deception-detection/", successful_video_upload, failed_video_upload);
    }

    const checkFields = () => {
        const err = [];
        if (!url) {
            err.push("Upload the Video Data")
        }

        if (source === "") {
            err.push("Add Source")
        }

        if (correctOption === null) {
            err.push("Add a Truth/Lie to the video");
        }

        if (correctPrompt === "") {
            err.push("Add a Correct Prompt for the Video")
        }

        setErrors(err);
        setRefresh(!refresh);
        return err.length === 0;
    }

    const success_file_upload = (id) => {
        setSuccessMessage("Course Uploaded Successfully - " + id)
        setURL("");
        setThumbnail();
        setErrors([]);
        setCorrectPrompt(null)
        setCorrectOption("")
        setSource("");
    }

    const submit = () => {
        setSuccessMessage("")
        if (checkFields()) {
            uploadDeceptionDetection(correctOption, correctPrompt, source, url, success_file_upload, failed_video_upload)
        }

        window.scrollTo(0,0);
    }

    return (
        <>
            <div style={{marginTop: "5%"}}/>
            <Container>
                {
                    url ?
                        <Alert variant={"primary"}>
                            Video Upload Success: <a>{url}</a>
                        </Alert> :
                        <></>
                }

                {
                    successMessage!=="" ?
                        <Alert variant={"primary"}>
                            <a>{successMessage}</a>
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
                    <Form.Label>Upload Video - must be MP4</Form.Label>
                    <MinigameVideo src={url} alt={"Minigame"}/>
                    <br/>
                    <Form.Group controlId="formFile" className="mb-3">
                        <input
                            className="form-control"
                            type={"file"}
                            ref={fileInput}
                            onChange={(e) => upload_video((e.target.files))}
                        />
                    </Form.Group>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Video Source</Form.Label>
                    <Form.Control type="text" placeholder={source} onChange={
                        (e) => {
                            if (e.target.value !==""){
                                setSource(e.target.value)
                            }
                        }
                    }/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Truth or Lie</Form.Label>
                    <Form.Select aria-label="Default select example" onChange={(e) => {
                        setCorrectOption(e.target.value === "true");
                    }}>
                        <option>Correct Option</option>
                        <option value="true">Truth</option>
                        <option value="false">Lie</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Video Correct Prompt </Form.Label>
                    <Form.Control type="text" placeholder={correctPrompt}  onChange={(e) => {
                        if (e.target.value !== null){
                            setCorrectPrompt(e.target.value)
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
            </Container>
        </>
    )
}

export default AddDeceptionDetection;