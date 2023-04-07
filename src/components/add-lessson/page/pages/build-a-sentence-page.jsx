import React, {useState} from 'react';
import {Alert, Button, Form} from "react-bootstrap";


function BuildASentencePage({pageContent, uploadPageContent, setPageContent, children}) {
    const [uploaded, setUploaded] = useState(false);

    const updateContent = (val) => {
        setUploaded(false);
        setPageContent({data: val})
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
                <Form.Label>Write the sentence here</Form.Label>
                <Form.Control type="text" placeholder={"Objections to the sale should be ______."} onChange={
                    (e) => {
                        updateContent(e.target.value);
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

export default BuildASentencePage;