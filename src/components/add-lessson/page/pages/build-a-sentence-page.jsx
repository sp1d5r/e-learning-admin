import React from 'react';
import {Alert, Button, Form} from "react-bootstrap";


function BuildASentencePage({pageContent, uploadPageContent, setPageContent, children}) {
    const updateContent = (val) => {
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
                <div className="divider-div-m"></div>
                {JSON.stringify(pageContent)}
                <div className="divider-div-m"></div>
                <Form.Group className={"lesson-upload-div"}>
                    <Button variant={"success"} onClick={() => {uploadPageContent()}}>
                        Add Page
                    </Button>
                </Form.Group>
            </Form>

        </>
    )
}

export default BuildASentencePage;