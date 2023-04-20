import React, {useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";


function BinaryClassificationPage({pageContent, uploadPageContent, setPageContent, children}) {
    const [uploaded, setUploaded] = useState(false);
    const [optionQuestion, setOptionQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");
    const [category1, setCategory1] = useState("");
    const [category2, setCategory2] = useState("");


    const updateContent = (val, pos) => {
        if (pos === 0) {
            setOptionQuestion(val);
        } else if (pos === 1) {
            setOption1(val);
        } else if (pos === 2) {
            setOption2(val)
        } else if (pos === 3) {
            setOption3(val)
        } else if (pos === 4) {
            setOption4(val)
        } else if (pos === 5) {
            setCategory1(val)
        } else {
            setCategory2(val)
        }
        setUploaded(false);
        setPageContent({
            "question": pos === 0 ? val: optionQuestion,
            "category_one": pos === 5 ? val: category1,
            "category_two": pos === 6 ? val: category2,
            "category_one_options": [pos === 1 ? val: option1, pos === 2 ? val: option2],
            "category_two_options": [pos === 3 ? val: option3, pos === 4 ? val: option4]
        })
    }

    return (
        <>
            <Form style={{
                margin: "2%", padding: "5%", width: "80%", border: "1px solid black",
                borderRadius: 5
            }}>
                <p>Select a Page Type</p>
                <span>
                    { children}
            </span>
                <div className="divider-div-m"></div>
                <Form.Label>Write the ordering instructions.</Form.Label>
                <Form.Control type="text" placeholder={"Order the Negotiations."} onChange={
                    (e) => {
                        updateContent(e.target.value, 0);
                    }
                }/>
                <Form.Label>Category One.</Form.Label>
                <Form.Control type="text" placeholder={"Category One"} onChange={
                    (e) => {
                        updateContent(e.target.value, 5);
                    }
                }/>
                <Form.Label>Category One Words</Form.Label>
                <Form.Control type="text" placeholder={"First Option"} onChange={
                    (e) => {
                        updateContent(e.target.value, 1);
                    }
                }/>
                <Form.Control type="text" placeholder={"Second Option"} onChange={
                    (e) => {
                        updateContent(e.target.value, 2);
                    }
                }/>
                <Form.Label>Category Two.</Form.Label>
                <Form.Control type="text" placeholder={"Category Two"} onChange={
                    (e) => {
                        updateContent(e.target.value, 6);
                    }
                }/>
                <Form.Label>Category Two Words</Form.Label>
                <Form.Control type="text" placeholder={"First Option"} onChange={
                    (e) => {
                        updateContent(e.target.value, 3);
                    }
                }/>
                <Form.Control type="text" placeholder={"Second Option"} onChange={
                    (e) => {
                        updateContent(e.target.value, 4);
                    }
                }/>
                <div className={"divider-div-m"}/>
                {JSON.stringify(pageContent)}
                <div className={"divider-div-m"}/>
                {
                    uploaded ?
                        <div style={{borderRadius: 5, padding: 5, background: "#cbffb6", margin: 10}}> Course Uploaded </div> :
                        <div style={{borderRadius: 5, padding: 5, background: "#ffb6b6", margin: 10}}> Course Not Uploaded Yet</div>
                }
                <Form.Group className={"lesson-upload-div"}>
                    <Button variant={"success"} onClick={() => {uploadPageContent(); setUploaded(true)}}>
                        Add Page
                    </Button>
                </Form.Group>
            </Form>

        </>
    )
}

export default BinaryClassificationPage;