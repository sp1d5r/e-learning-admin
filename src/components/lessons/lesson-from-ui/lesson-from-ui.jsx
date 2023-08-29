import React from "react";
import Page from "./page.jsx";
import {Button, Form} from "react-bootstrap";

function LessonFromUi({pages, setPages, refreshPage}) {

    const addPage = () => {
        setPages(prevPages => [...prevPages, {type: "unknown"}]);
        console.log([...pages, {type: "unknown"}]);
        refreshPage();
    }

    return <>
        <div style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            {
                pages.map((page, index) => {
                    console.log(page);
                    return <Page
                        index={index}
                        pages={pages}
                        setPages={setPages}
                        updateRefresh={refreshPage}
                    />
                })
            }
        </div>

        <Form.Group className={"lesson-upload-div"}>
            <Button variant={"primary"} onClick={() => {addPage()}}>
                New Page
            </Button>
        </Form.Group>
    </>
}

export default LessonFromUi;