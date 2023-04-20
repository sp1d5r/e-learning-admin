import React, {useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";


function OrderListPage({pageContent, uploadPageContent, setPageContent, children}) {
    const [uploaded, setUploaded] = useState(false);
    const [optionQuestion, setOptionQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");


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
        }
        setUploaded(false);
        setPageContent({
            question: optionQuestion,
            correct_order: [pos === 0 ? val: optionQuestion, pos === 1 ? val: option1, pos === 2 ? val: option2, pos === 3 ? val: option3, pos === 4 ? val: option4]
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
                <Form.Label>Write the words you need to order.</Form.Label>
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
                <Form.Control type="text" placeholder={"Third Option"} onChange={
                    (e) => {
                        updateContent(e.target.value, 3);
                    }
                }/>
                <Form.Control type="text" placeholder={"Fourth Option"} onChange={
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

export default OrderListPage;