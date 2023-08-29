import React, {useState} from "react";
import {Button, Form} from "react-bootstrap";

function LessonFromGpt({setPages}) {
    const [pagesString, setPagesString] = useState({});

    return <div>
        <Form.Label>Lesson Time </Form.Label>
        <div style={{display: "flex"}}>
            <Form.Control type="text" placeholder={"Upload lesson stringfied content here"}  onChange={(e) => {
                if (e.target.value !== null){
                    setPagesString(JSON.parse(e.target.value))
                    setPages(JSON.parse(e.target.value));
                }
            }
            }/>
            <Button variant={"primary"} onClick={() => {console.log(pagesString)}}>
                Convert
            </Button>
        </div>
        <div className={"divider-div-m"}></div>
        <p>{JSON.stringify(pagesString)}</p>
    </div>
}

export default LessonFromGpt;