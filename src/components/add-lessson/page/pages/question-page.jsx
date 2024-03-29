import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

function QuestionPage({ pageContent, uploadPageContent, setPageContent, refreshContent, children}) {
    const [uploaded, setUploaded] = useState(false);

    const addElementPageContent = (element, data) => {
        setUploaded(false);
        const _pageContent = {... pageContent};
        _pageContent[element] = data;
        setPageContent(_pageContent);
        refreshContent();
        console.log(_pageContent)
    }

    const updateQuestionOption = (option, index) => {
        setUploaded(false);
        const _options = pageContent.questions;
        _options[index] = option;
        addElementPageContent("questions", _options);
        refreshContent();
    }

    const setQuestionOptions = (numberOfOptions) => {
        setUploaded(false);
        const _options = [];
        for (let i=0; i<numberOfOptions; i++) {
            _options.push("");
        }
        addElementPageContent("questions", _options);
        refreshContent();
    }

    const questionOptionsTag = () => {
        return pageContent.questions.map((question, index) => {
            return <>
                <Form.Label className={"text-muted"}>Option {index + 1}:</Form.Label>
                <Form.Control type="text" placeholder={question} onChange={
                    (e) => {
                        updateQuestionOption(e.target.value, index)
                    }
                }/>
            </>
        })
    }

    return (
        <Form style={{
            margin: "2%", padding: "5%", width: "80%", border: "1px solid black",
            borderRadius: 5
        }}>
            <p>Select a Page Type</p>
            <span>
                    { children}
            </span>
            <div className="divider-div-m"></div>
            <>
                <Form.Label>Page Question</Form.Label>
                <Form.Control type="text" placeholder={pageContent.question} onChange={
                    (e) => {
                        if (e.target.value !==""){
                            addElementPageContent("question", e.target.value)
                        }
                    }
                }/>
                <div className="divider-div-m"></div>

                <Form.Label>Number of Options</Form.Label>
                <Form.Control type="number" placeholder={0} onChange={
                    (e) => {
                        setQuestionOptions(e.target.value)
                    }
                }/>
                <div className="divider-div-m"></div>

                <Form.Label>Options</Form.Label>
                <br/>
                {questionOptionsTag()}
                <br/>
                <div className="divider-div-m"></div>

                <Form.Label>Correct Option</Form.Label>
                <Form.Control type="number" placeholder={pageContent.answer} onChange={
                    (e) => {
                        if (e.target.value)
                            addElementPageContent("answer",e.target.value)
                    }
                }/>
                <Form.Text id="passwordHelpBlock" muted>
                    Options aren't zero indexed so select number corresponding to correct option
                </Form.Text>
                <br/>
                <Form.Label>Explanation</Form.Label>
                <Form.Control type="text" placeholder={pageContent.explanation} onChange={
                    (e) => {
                        if (e.target.value)
                            addElementPageContent("explanation",e.target.value)
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
                <Button variant={"success"} onClick={() => {uploadPageContent(); setUploaded(true);}}>
                    Add Page
                </Button>
            </Form.Group>
        </Form>
    )
}

export default QuestionPage;