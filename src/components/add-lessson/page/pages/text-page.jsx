import React from "react";
import {Button, Form} from "react-bootstrap";

function TextPage({uploadPageContent, pageContent, setPageContent, children}) {

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
                            setPageContent(e.target.value)
                        }
                    }
                }/>
            </>

            <Form.Group className={"lesson-upload-div"}>
                <Button variant={"success"} onClick={() => {uploadPageContent()}}>
                    Add Page
                </Button>
            </Form.Group>
        </Form>
    </>)
}

export default TextPage;