import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

function TextPage({uploadPageContent, pageContent, setPageContent, children}) {
    const [uploaded, setUploaded] = useState(false);

    const updateContent = (val) => {
        setUploaded(false);
        setPageContent({data: val})
    }

    return (<>
        <Form style={{
            margin: "2%", padding: "5%", width: "80%", border: "1px solid black",
            borderRadius: 5
        }}>
            <p>Select a Page Type</p>
            <span>
                    { children}
            </span>
            <>
                <Form.Label>Page Text</Form.Label>
                <Form.Control type="text" placeholder={pageContent.data} onChange={
                    (e) => {
                        if (e.target.value !==""){
                            updateContent(e.target.value)
                        }
                    }
                }/>
            </>
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
    </>)
}

export default TextPage;