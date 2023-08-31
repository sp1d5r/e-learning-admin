import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/navbar/navbar";
import CourseLanding from "./components/course-landing/course-landing";
import AddCourse from "./components/add-course/add-course";
import DeceptionDetection from "./components/deception-detection/deception-detection";
import Landing from "./components/landing/landing";
import Login from "./components/login/login";
import {useAuth} from "./cloud-infrastructure/auth";
import AddDeceptionDetection from "./components/add-deception-detection/add-deception-detection";
import NewAddLesson from "./components/add-lessson/new-add-lesson";
import LessonPage from "./components/lessons/new-lesson/new-lesson";
import EditLesson from "./components/lessons/edit-lesson/edit-lesson";

function PageRoutes() {
    const {current_user} = useAuth();

    return (
        <div className="App">
            <BrowserRouter>
                <NavigationBar />
                <Routes>
                    {
                        current_user ?
                            <>
                                <Route path="/course/" element={<CourseLanding />} />
                                <Route path={"/add-course"} element={<AddCourse />} />
                                <Route path={"/add-lesson"} element={<LessonPage />} />
                                <Route path={"/lesson"} element={<EditLesson />} />
                                <Route path={"/new-lesson"} element={<LessonPage />} />
                                <Route path={"/add-deception-detection"} element={<AddDeceptionDetection />} />
                                <Route path={"/deception-detection"} element={<DeceptionDetection />} />
                                <Route path="/minigame/Catch%20a%20Liar" element={<DeceptionDetection />} />
                                <Route path="/" element={<Landing />} />
                            </>
                            :
                            <Route path="/" element={<Login />} />
                    }

                </Routes>
            </BrowserRouter>
        </div>

    )
}

export default PageRoutes;