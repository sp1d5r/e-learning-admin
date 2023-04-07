import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";
import page from "../page";

function SingleWordPage({pageContent, setPageContent, uploadPageContent, children}) {

    const addContentSentence = (sentence) => {
        const _pageContent = {... pageContent};
        _pageContent["sentence"] = sentence;
        setPageContent(_pageContent);
    }

    const addContentWord = (word) => {
        const _pageContent = {... pageContent};
        _pageContent["word"] = word;
        setPageContent(_pageContent);
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
                <Form.Control type="text" placeholder={"Objections to the sale should be"} onChange={
                    (e) => {
                        addContentSentence(e.target.value);
                    }
                }/>
                <div className="divider-div-m"></div>
                <Form.Label>Write the sentence here</Form.Label>
                <Form.Control type="text" placeholder={"encouraged"} onChange={
                    (e) => {
                        addContentWord(e.target.value);
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

export default SingleWordPage;