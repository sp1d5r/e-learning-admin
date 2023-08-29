import React, {useEffect, useState} from "react";
import "../lesson.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LessonMetadataComponent from "../lesson-metadata/lesson-metadata";
import {Alert, Button} from "react-bootstrap";
import LessonFromGpt from "../lesson-from-gpt/lesson-from-gpt";
import LessonFromUi from "../lesson-from-ui/lesson-from-ui";
import NewLessonPage from "../../add-lessson/lesson/lesson-page";
import {useSearchParams} from "react-router-dom";
import {getLessonFromID, getPageFromID} from "../../../cloud-infrastructure/firebase";


const convertPageFromRetrievedFormat = (pageData) => {
    let data;

    if (pageData.type === "text") {
        data = {
            type: pageData.type,
            data: pageData.content
        }
    } else if (pageData.type === "question") {
        data = {
            type: pageData.type,
            question: pageData.content.question,
            questions: pageData.content.questions,
            answer: pageData.content.answer,
            explanation: pageData.content.explanation
        };
    } else if (pageData.type === "selection_image") {
        data = {
            type: pageData.type,
            question: pageData.content.question,
            questions: pageData.content.questions,
            answer: pageData.content.answer
        };
    } else if (pageData.type === "build_sentence") {
        data = {
            type: pageData.type,
            data: pageData.content
        };

    } else if (pageData.type === "single_word") {
        data = {
            type: pageData.type,
            sentence: pageData.content.sentence,
            word: pageData.content.word,
        };
    } else if (pageData.type === "selection_text") {
        data = {
            type: pageData.type,
            question: pageData.content.question,
            questions: pageData.content.questions,
            answer: pageData.content.answer
        };
    } else if (pageData.type === "selection_image") {
        data = {
            type: pageData.type,
            question: pageData.question,
            questions: pageData.questions,
            answer: parseInt(pageData.answer),
        }

    } else if (pageData.type === "match_cards") {
        data = {
            type: pageData.type,
            mapping: {... pageData.content.mapping},
        };
    } else if (pageData.type === "flip_and_select") {
        data = {
            type: pageData.type,
            mapping: {... pageData.content.mapping},
        };
    } else if (pageData.type === "case_study") {
        data = {
            type: pageData.type,
            story: pageData.story,
            title: pageData.title,
        };
    } else if (pageData.type === "order_list") {
        data = {
            type: pageData.type,
            question: pageData.content.question,
            correct_order: pageData.content.correct_order
        };
    } else if (pageData.type === "binary_classifier") {
        data = {
            type: pageData.type,
            mapping: {
                [pageData.content.category_one]: pageData.content.category_one_options,
                [pageData.content.category_two]: pageData.content.category_two_options,
            },
        };
    }

    return data;
}

function EditLessonPage({}){
    const searchParams = useSearchParams()[0];
    const lesson_id = searchParams.get("lesson_id");

    const [key, setKey] = useState('home');

    /* Lesson Metadata */
    const [lessonMetadata, setLessonMetadata] = useState({
        title: '',
        description: '',
        thumbnail: '',
        url: '',
        difficulty: 0,
        time: 0
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        const _lessonMetadata = {...lessonMetadata};
        if (name === " thumbnail") {
            _lessonMetadata[name] = value;
            _lessonMetadata['url'] = value;
        } else {
            _lessonMetadata[name] = value;
        }
        setLessonMetadata(_lessonMetadata);
        console.log(_lessonMetadata);
    };

    /* Lesson Pages */
    const [lessonPages, setLessonPages] = useState([]);

    useEffect(() => {
        console.log('getting lesson information')
            getLessonFromID(lesson_id).then((res) => {
                const _lessonMetadata = {...lessonMetadata};
                _lessonMetadata['title'] = res.title;
                _lessonMetadata['description'] = res.description;
                _lessonMetadata['thumbnail'] = res.thumbnail;
                _lessonMetadata['url'] = res.thumbnail;
                _lessonMetadata['difficulty'] = parseInt(res.difficulty);
                _lessonMetadata['time'] = parseInt(res.time);
                setLessonMetadata(_lessonMetadata);

                console.log(res.pages);
                Promise.all(
                    res.pages.map((page) => {return getPageFromID(page)}))
                    .then((unformattedPages) => {
                        setLessonPages(unformattedPages.map((unformattedPage) => {return convertPageFromRetrievedFormat(unformattedPage)}));
                    })
            }).catch((err) => {
                setErrors([err])
            });
    }, [])


    const [errors, setErrors] = useState([])
    const [success, setSuccess] = useState("");
    const [refresh, setRefresh] = useState(false);

    const successful_image_upload = (url) => {
        const _lessonMetadata = {...lessonMetadata};
        _lessonMetadata['url'] = url;
        setLessonMetadata(_lessonMetadata);
    }

    const failed_image_upload = (errors) => {
        setErrors([errors]);
        setRefresh(!refresh);
    }

    const refreshPage = () => {
        setRefresh(!refresh);
    }

    return <div className={"lesson-main"}>
        {
            success ?
                <Alert variant={"primary"}>
                    Lesson Upload Complete <a>{success}</a>
                </Alert> :
                <></>
        }

        {
            lessonMetadata.url ?
                <Alert variant={"primary"}>
                    Image uploaded Successfully! You can upload this course now: <a>{lessonMetadata.url}</a>
                </Alert> :
                <></>
        }

        {
            errors.length > 0 && <Alert variant={"danger"}>
                <b>There are a few errors on your forum</b>
                <ul>
                    {errors.length > 0 && errors.map((error) => {
                        return <li>{error}</li>
                    })}
                </ul>
            </Alert>
        }

        <div className="divider"><p className="divider-text">new lesson</p>
            <div></div>
        </div>
        <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
        >
            <Tab eventKey="home" title="Lesson Metadata" className={"lesson-content"}>
                <LessonMetadataComponent
                    lessonMetadata={lessonMetadata}
                    onChange={onChange}
                    successful_image_upload={successful_image_upload}
                    failed_image_upload={failed_image_upload}
                    refreshPage={refreshPage}
                />
            </Tab>
            <Tab eventKey="lesson-pages-gpt" title="Lesson Pages (GPT)" className={"lesson-content"}>
                Add Lesson Pages from GPT (This is a JSON)
                <LessonFromGpt
                    setPages={setLessonPages}
                />
            </Tab>
            <Tab eventKey="lesson-pages-ui" title="Lesson Content (UI)" className={"lesson-content"}>
                Add Lesson Pages from the UI.
                <LessonFromUi
                    setPages={setLessonPages}
                    refreshPage={refreshPage}
                    pages={lessonPages}
                />
            </Tab>
            <Tab eventKey="contact" title="Preview and Confirm" className={"lesson-content"}>
                <NewLessonPage
                    lessonMetadata={lessonMetadata}
                    lessonPages={lessonPages}
                />
                <div style={{padding: 50, display: 'flex', width: '100%', justifyContent: 'center'}}>
                    <Button variant={"success"}>Submit Lesson</Button>
                </div>
            </Tab>
        </Tabs>
    </div>
}

export default EditLessonPage;