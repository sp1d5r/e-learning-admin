import React, {useEffect, useState} from "react";
import {Button, Form} from "react-bootstrap";
import "./page.css";
import TextPage from "./pages/text-page";
import QuestionPage from "./pages/question-page";
import SelectionImagePage from "./pages/selection-image-page";
import BuildASentencePage from "./pages/build-a-sentence-page";
import SingleWordPage from "./pages/single-word-page";
import SelectionTextPage from "./pages/selection-text-page";
import MatchCardsPage from "./pages/match-cards-page";
import FlipMatchCardsPage from "./pages/flip-match-cards-page";
import CaseStudyPage from "./pages/case-study-page";

function Page({index, page, pages, setPages, updateRefresh}) {
    const [pageType, setPageType] = useState("text");
    const [pageContent, setPageContent] = useState({data: ""})
    const [localRefersh, setLocalRefresh] = useState(false);
    const options = ['text', 'question', 'Three', 'Four', 'Five'];
    const onOptionChangeHandler = (event) => {
        setPageType("question");
        switchPageType();
    }

    useEffect(() => {
        if (Object.keys(page).length !== 0) {
            setPageType(page["type"]);
            setPageContent(page["content"])
        }
    }, [])

    const addTextPageContent = (data) => {
        setPageContent({data: data});
    }

    const refreshContent = () => {
        setLocalRefresh(!localRefersh);
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
        } else if (pageType === "") {
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
        console.log(_pages)
        setPages(_pages);
        updateRefresh();
    }

    const PageSwitcher = () => {
        return <span>
<Form.Select aria-label="Default select example" onChange={(event) => {
    if (event.target.value === "text"){
        setPageContent({data: ""})
    } else if (event.target.value === "question"){
        setPageContent({
            question: "",
            questions: [],
            answer: 0,
            explanation: ""
        })
    } else if (event.target.value === "selection_image") {
        setPageContent({
            question: "",
            questions: [],
            answer: 0,
        })
    } else if (event.target.value === "build_sentence") {
        setPageContent({data: ""})
    } else if (event.target.value === "single_word") {
        setPageContent({
            sentence: "Objections to the sale should be ",
            word: "encouraged",
        })
    } else if (event.target.value === "selection_text") {
        setPageContent({
            question: "How should you address objections?",
            questions: ["Asking Questions", "Directly", "Indirectly", "Creatively"],
            answer: 1,
        })
    } else if (event.target.value === "match_cards") {
        setPageContent({
            mapping: {
                "Not all exceptions are": "valid",
                "Objections to the sale should be": "encouraged",
                "Objections to a sale are ": "good",
                "Discover exceptions by": "asking questions",
            },
        })
    } else if (event.target.value === "flip_and_select") {
        setPageContent({
            mapping: {
                "Not all exceptions are": "valid",
                "Objections to the sale should be": "encouraged",
                "Objections to a sale are ": "good",
                "Discover exceptions by": "asking questions",
            },
        })
    } else if (event.target.value === "case_study") {
        setPageContent({
            title: "",
            story: ""
        })
    }

    setPageType(event.target.value);
}}>
                    <option>Open this select menu</option>
                    <option value={"text"}>Text</option>
                    <option value={"question"}>Question</option>
                    <option value={"selection_image"}>Image Select</option>
                    <option value={"build_sentence"}>Build a Sentence</option>
                    <option value={"single_word"}>Fill in Blank</option>
                    <option value={"selection_text"}>Sentence Select</option>
                    <option value={"match_cards"}>Card Matching</option>
                    <option value={"flip_and_select"}>Blind Card Matching</option>
                </Form.Select>
        </span>
    }


    if (pageType === "text"){
        return (<TextPage setPageContent={setPageContent} pageContent={pageContent}  uploadPageContent={uploadPageContent}>
            <div>
                Switch Page
                {PageSwitcher()}
            </div>
        </TextPage>)
    } else if (pageType === "question") {
        return (
            <QuestionPage
                setPageContent={setPageContent}
                pageContent={pageContent}
                uploadPageContent={uploadPageContent}
                refreshContent={refreshContent}
            >
                <div>
                    Switch Page
                    {PageSwitcher()}
                </div>
            </QuestionPage>
        )
    } else if (pageType === "selection_image") {
        return (
            <SelectionImagePage
                pageContent={pageContent}
                setPageContent={setPageContent}
                uploadPageContent={uploadPageContent}
            >
                {PageSwitcher()}
            </SelectionImagePage>
        )
    } else if (pageType === "build_sentence") {
        return (
            <BuildASentencePage
                pageContent={pageContent}
                setPageContent={setPageContent}
                uploadPageContent={uploadPageContent}
                >
                {PageSwitcher()}
            </BuildASentencePage>
        )
    } else if (pageType === "single_word") {
        return (
            <SingleWordPage
                pageContent={pageContent}
                setPageContent={setPageContent}
                uploadPageContent={uploadPageContent}
                >
                {PageSwitcher()}
            </SingleWordPage>
        )
    } else if (pageType === "selection_text") {
        return (
            <SelectionTextPage
                pageContent={pageContent}
                setPageContent={setPageContent}
                uploadPageContent={uploadPageContent}
            >
                {PageSwitcher()}
            </SelectionTextPage>
        )
    } else if (pageType === "match_cards"){
        return (
            <MatchCardsPage
                pageContent={pageContent}
                uploadPageContent={uploadPageContent}
                setPageContent={setPageContent}>
                {PageSwitcher()}
            </MatchCardsPage>
        )
    } else if (pageType === "flip_and_select"){
        return (
            <FlipMatchCardsPage
                pageContent={pageContent}
                uploadPageContent={uploadPageContent}
                setPageContent={setPageContent}>
                {PageSwitcher()}
            </FlipMatchCardsPage>
        )
    } else if (pageType === "case_study") {
        return (
            <CaseStudyPage
                pageContent={pageContent}
                uploadPageContent={uploadPageContent}
                setPageContent={setPageContent}
            >
                {PageSwitcher()}
            </CaseStudyPage>
        )
    }
}

export default Page;