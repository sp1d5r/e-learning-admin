import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

function SelectionTextPage({pageContent, setPageContent, uploadPageContent, children}) {
    const [uploaded, setUploaded] = useState(false);

    const addContentQuestion = (question) => {
        setUploaded(false);
        const _pageContent = {...pageContent};
        _pageContent["question"] = question;
        setPageContent(_pageContent);
    }

    const addContentOptions = (options) => {
        setUploaded(false);
        const _options = options.split(",");
        const _pageContent = {...pageContent};
        _pageContent["questions"] = _options;
        setPageContent(_pageContent);
    }

    const addContentAnswer = (answer) => {
        setUploaded(false);
        const _pageContent = {...pageContent};
        _pageContent["answer"] = answer;
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
                <Form.Label>Write the question here</Form.Label>
                <Form.Control type="text" placeholder={"Objections to the sale should be"} onChange={
                    (e) => {
                        addContentQuestion(e.target.value);
                    }
                }/>
                <div className="divider-div-m"></div>
                <Form.Label>Write the options here seperated with commas</Form.Label>
                <Form.Control type="text" placeholder={"encouraged, advised, result, something"} onChange={
                    (e) => {
                        addContentOptions(e.target.value);
                    }
                }/>
                <div className="divider-div-m"></div>
                <Form.Label>Correct Option</Form.Label>
                <Form.Control type="number" placeholder={pageContent.answer} onChange={
                    (e) => {
                        if (e.target.value)
                            addContentAnswer(parseInt(e.target.value))
                    }
                }/>
                <Form.Text id="passwordHelpBlock" muted>
                    Options aren't zero indexed so select number corresponding to correct option
                </Form.Text>

                <div className={"divider-div-m"}/>
                {JSON.stringify(pageContent)}
                <div className={"divider-div-m"}/>
                {
                    uploaded ?
                        <div style={{borderRadius: 5, padding: 5, background: "#cbffb6", margin: 10}}> Course Uploaded </div> :
                        <div style={{borderRadius: 5, padding: 5, background: "#ffb6b6", margin: 10}}> Course Not Uploaded Yet</div>
                }
                <Form.Group className={"lesson-upload-div"}>
                    <Button variant={"success"} onClick={() => {uploadPageContent(); setUploaded(true);}}>
                        Add Page
                    </Button>
                </Form.Group>
            </Form>

        </>
    )
}

export default SelectionTextPage;