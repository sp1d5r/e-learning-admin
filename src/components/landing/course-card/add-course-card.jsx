import React from "react";

function AddCourseCard() {


    return <>
        <div className={"academy-content-course-add"} onClick={(_) => { document.location.href="/add-course"}}>
            <p className={"course-plus"}>
                +
            </p>
            <p>
                add course
            </p>
        </div>
    </>
}

export default AddCourseCard;