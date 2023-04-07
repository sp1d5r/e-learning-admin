import React, {createRef, useState} from "react";
import {Alert, Button, Form} from "react-bootstrap";
import {uploadFile} from "../../../../cloud-infrastructure/firebase";

function SelectionImagePage({pageContent, uploadPageContent, setPageContent, children}) {
    /* Image File Handle */
    const imageFile1 = createRef();
    const imageFile2 = createRef();
    const imageFile3 = createRef();
    const imageFile4 = createRef();
    const [thumbnail1, setThumbnail1] = useState()
    const [thumbnail2, setThumbnail2] = useState()
    const [thumbnail3, setThumbnail3] = useState()
    const [thumbnail4, setThumbnail4] = useState()
    const [url1, setUrl1] = useState();
    const [url2, setUrl2] = useState();
    const [url3, setUrl3] = useState();
    const [url4, setUrl4] = useState();
    const [text1, setText1] = useState("");
    const [text2, setText2] = useState("");
    const [text3, setText3] = useState("");
    const [text4, setText4] = useState("");
    const [question, setQuesiton] = useState("");
    const [answer, setAnswer] = useState(1);



    const [errors, setErrors] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const failed_image_upload = (errors) => {
        setErrors([errors]);
        setRefresh(!refresh);
    }

    const successful_image_upload = (setURL, url) => {
        console.log("updating the image")
        setURL(url);
        setRefresh(!refresh);
    }

    const upload_image = (image, setThumbnail, setUrl) => {
        console.log(image)
        const objectUrl = URL.createObjectURL(image[0])
        setThumbnail(objectUrl)
        var binded_success_callback = successful_image_upload.bind(null, setUrl)
        uploadFile(image[0], "lesson-images/", binded_success_callback, failed_image_upload);
    }

    const coalesceContent = () => {
        var content = {
            question: question,
            questions: [
                {
                    src: url1,
                    content: text1,
                },
                {
                    src: url2,
                    content: text2,
                },
                {
                    src: url3,
                    content: text3,
                },
                {
                    src: url4,
                    content: text4,
                },
            ],
            answer:answer
        }
        setPageContent(content);
    }

    return (
        <>
            <Form style={{
                margin: "2%", padding: "5%", width: "80%", border: "1px solid black",
                borderRadius: 5
            }}>
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
                {
                    url1 ?
                        <Alert variant={"primary"}>
                            Image 1 uploaded Successfully! You can upload this course now: <a>{url1}</a>
                        </Alert> :
                        <></>
                }
                {
                    url2 ?
                        <Alert variant={"primary"}>
                            Image 2 uploaded Successfully! You can upload this course now: <a>{url2}</a>
                        </Alert> :
                        <></>
                }
                {
                    url3 ?
                        <Alert variant={"primary"}>
                            Image 3 uploaded Successfully! You can upload this course now: <a>{url3}</a>
                        </Alert> :
                        <></>
                }
                {
                    url4 ?
                        <Alert variant={"primary"}>
                            Image 4 uploaded Successfully! You can upload this course now: <a>{url4}</a>
                        </Alert> :
                        <></>
                }
                <p>Select a Page Type</p>
                <span>
                    { children}
            </span>
                <div className="divider-div-m"></div>
                <Form.Label>Write your question here</Form.Label>
                <Form.Control type="text" placeholder={"Objections to the sale should be ______."} onChange={
                    (e) => {
                        setQuesiton(e.target.value);
                    }
                }/>
                <div className="divider-div-m"></div>
                <>
                    <Form.Label>Images</Form.Label>
                    <div style={{display: "flex", justifyContent: "space-evenly"}}>
                        <div style={{width: '20%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <div style={{width: 70, height: 70, borderRadius: 2, border: "1px solid black", margin: 20}}>
                                <img style={{width: "90%"}} alt={""} src={thumbnail1 ? thumbnail1 : require("../../../../assets/add-course.png")} className={"course-image"}/>
                                <input className="form-control" type={"file"} ref={imageFile1} onChange={(e) => upload_image(e.target.files, setThumbnail1, setUrl1)}/>
                            </div>
                            <Form.Control type="text" placeholder={"option 1"} onChange={
                                (e) => {
                                    setText1(e.target.value);
                                }
                            }/>
                        </div>
                        <div style={{width: '20%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <div style={{width: 70, height: 70, borderRadius: 2, border: "1px solid black", margin: 20}}>
                                <img style={{width: "90%"}} alt={""} src={thumbnail2 ? thumbnail2 : require("../../../../assets/add-course.png")} className={"course-image"}/>
                                <input className="form-control" type={"file"} ref={imageFile2} onChange={(e) => upload_image(e.target.files, setThumbnail2, setUrl2)}/>
                            </div>
                            <Form.Control type="text" placeholder={"option 2"} onChange={
                                (e) => {
                                    setText2(e.target.value);
                                }
                            }/>
                        </div>
                        <div style={{width: '20%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <div style={{width: 70, height: 70, borderRadius: 2, border: "1px solid black", margin: 20}}>
                                <img style={{width: "90%"}} alt={""} src={thumbnail3 ? thumbnail3 : require("../../../../assets/add-course.png")} className={"course-image"}/>
                                <input className="form-control" type={"file"} ref={imageFile3} onChange={(e) => upload_image(e.target.files, setThumbnail3, setUrl3)}/>
                            </div>
                            <Form.Control type="text" placeholder={"option 3"} onChange={
                                (e) => {
                                    setText3(e.target.value);
                                }
                            }/>
                        </div>
                        <div style={{width: '20%', display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
                            <div style={{width: 70, height: 70, borderRadius: 2, border: "1px solid black", margin: 20}}>
                                <img style={{width: "90%"}} alt={""} src={thumbnail4 ? thumbnail4 : require("../../../../assets/add-course.png")} className={"course-image"}/>
                                <input className="form-control" type={"file"} ref={imageFile4} onChange={(e) => upload_image(e.target.files, setThumbnail4, setUrl4)}/>
                            </div>
                            <Form.Control type="text" placeholder={"option 4"} onChange={
                                (e) => {
                                    setText4(e.target.value);
                                }
                            }/>
                        </div>
                    </div>


                    <div className="divider-div-m"></div>

                    <Form.Label>Correct Option</Form.Label>

                    <Form.Select onChange={(e) => {
                        setAnswer(parseInt(e.target.value))
                    }}>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                    </Form.Select>
                    <Form.Text id="passwordHelpBlock" muted>
                        Options aren't zero indexed so select number corresponding to correct option
                    </Form.Text>

                    <div className="divider-div-m"></div>

                </>
                <div className="divider-div-m"></div>
                {JSON.stringify(pageContent)}
                <div className="divider-div-m"></div>

                <Form.Group className={"lesson-upload-div"}>
                    <Button variant={"primary"} onClick={() => {coalesceContent()}}>
                        Coalesce Content
                    </Button>
                    <Button variant={"success"} onClick={() => {uploadPageContent()}}>
                        Add Page
                    </Button>
                </Form.Group>
            </Form>

        </>
    )
}

export default SelectionImagePage;