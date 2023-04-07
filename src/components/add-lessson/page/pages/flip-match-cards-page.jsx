import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

function FlipMatchCardsPage({pageContent, setPageContent, uploadPageContent, children}) {
    const [uploaded, setUploaded] = useState(false);

    const addToMapping = (isKey, value, pos) => {
        setUploaded(false);
        let _pageContent = {... pageContent};
        const keys = Object.keys(_pageContent["mapping"]);
        const values = Object.values(_pageContent["mapping"]);

        if (isKey) {
            keys.splice(pos, 1, value);
        } else {
            values.splice(pos, 1, value)
        }

        const _newMapping = {}
        for (var i=0; i<values.length; i++ ){
            _newMapping[keys[i]] = values[i];
        }
        _pageContent = {"mapping": _newMapping}
        setPageContent(_pageContent);
    }

    return(
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
                <Form.Label>Write pairs</Form.Label>
                <div style={{display: "flex"}}>
                    <Form.Control type="text" placeholder={"Something should be written "} onChange={
                        (e) => {
                            addToMapping(true, e.target.value, 0)
                        }
                    }/>
                    <Form.Control type="text" placeholder={"here"} onChange={
                        (e) => {
                            addToMapping(false, e.target.value, 0)
                        }
                    }/>
                </div>

                <div style={{display: "flex"}}>
                    <Form.Control type="text" placeholder={"Something should be written"} onChange={
                        (e) => {
                            addToMapping(true, e.target.value, 1)
                        }
                    }/>
                    <Form.Control type="text" placeholder={"here"} onChange={
                        (e) => {
                            addToMapping(false, e.target.value, 1)
                        }
                    }/>
                </div>

                <div style={{display: "flex"}}>
                    <Form.Control type="text" placeholder={"Something should be written"} onChange={
                        (e) => {
                            addToMapping(true, e.target.value, 2)
                        }
                    }/>
                    <Form.Control type="text" placeholder={"here"} onChange={
                        (e) => {
                            addToMapping(false, e.target.value, 2)
                        }
                    }/>
                </div>

                <div style={{display: "flex"}}>
                    <Form.Control type="text" placeholder={"Something should be written"} onChange={
                        (e) => {
                            addToMapping(true, e.target.value, 3)
                        }
                    }/>
                    <Form.Control type="text" placeholder={"here"} onChange={
                        (e) => {
                            addToMapping(false, e.target.value, 3)
                        }
                    }/>
                </div>

                <div className="divider-div-m"></div>
                <Form.Label>Write the sentence here</Form.Label>
                <Form.Control type="text" placeholder={"encouraged"} onChange={
                    (e) => {

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

export default FlipMatchCardsPage;