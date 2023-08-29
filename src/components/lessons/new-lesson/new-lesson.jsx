import React, {useState} from "react";
import "../lesson.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import LessonMetadataComponent from "../lesson-metadata/lesson-metadata";
import {Alert, Button} from "react-bootstrap";
import LessonFromGpt from "../lesson-from-gpt/lesson-from-gpt";
import LessonFromUi from "../lesson-from-ui/lesson-from-ui";
import NewLessonPage from "../../add-lessson/lesson/lesson-page";


function LessonPage({}){
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

export default LessonPage;