import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import "./page.css";

function Page({index, page, pages, setPages, updateRefresh}) {
    const [pageType, setPageType] = useState("text");
    const [pageContent, setPageContent] = useState({data: ""})
    const [localRefersh, setLocalRefresh] = useState(false);

    useEffect(() => {
        if (Object.keys(page).length !== 0) {
            setPageType(page["type"]);
            setPageContent(page["content"])
        }
    }, [])

    const addTextPageContent = (data) => {
        setPageContent({data: data});
    }

    // element = question, data = "Given XYZ what's the best option"
    const addElementPageContent = (element, data) => {
        const _pageContent = {... pageContent};
        _pageContent[element] = data;
        setPageContent(_pageContent);
        setLocalRefresh(!localRefersh);
        console.log(_pageContent)
    }

    const switchPageType = () => {
        if (pageType === "text") {
            setPageType("question");
            setPageContent({
                question: "",
                questions: [],
                answer: 0,
                explanation: ""
            })
        } else {
            setPageType("text")
            setPageContent({data: ""})
        }
    }

    const uploadPageContent = () => {
        const _pages = [...pages];
        _pages[index] = {
            type: pageType,
            ...pageContent
        }
        setPages(_pages);
        updateRefresh();
    }

    const setQuestionOptions = (numberOfOptions) => {
        const _options = [];
        for (let i=0; i<numberOfOptions; i++) {
            _options.push("");
        }
        addElementPageContent("questions", _options);
        setLocalRefresh(!localRefersh);
    }

    const updateQuestionOption = (option, index) => {
        const _options = pageContent.questions;
        _options[index] = option;
        addElementPageContent("questions", _options);
        setLocalRefresh(!localRefersh);
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


    if (pageType === "text"){
        return (<>
            <Form style={{
                margin: "2%", padding: "5%", width: "80%", border: "1px solid black",
                borderRadius: 5
            }}>
                <p>Select a Page Type</p>
                <span>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={pageType}
                        onChange={(e) => {switchPageType()}}
                    />
                </span>
                <>
                    <Form.Label>Page Text</Form.Label>
                    <Form.Control type="text" placeholder={pageContent.data} onChange={
                        (e) => {
                            if (e.target.value !==""){
                                addTextPageContent(e.target.value)
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
    } else {
        return (<>
            <Form style={{
                margin: "2%", padding: "5%", width: "80%", border: "1px solid black",
                borderRadius: 5
            }}>
                <p>Select a Page Type</p>
                <span>
                    <Form.Check
                        type="switch"
                        id="custom-switch"
                        label={pageType}
                        onChange={(e) => {switchPageType()}}
                    />
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

                <Form.Group className={"lesson-upload-div"}>
                    <Button variant={"success"} onClick={() => {uploadPageContent()}}>
                        Add Page
                    </Button>
                </Form.Group>
            </Form>
        </>)
    }
}

export default Page;