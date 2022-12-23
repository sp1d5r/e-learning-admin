import React, {useEffect, useState} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import NavigationBar from "./components/navbar/navbar";
import CourseLanding from "./components/course-landing/course-landing";
import AddCourse from "./components/add-course/add-course";
import AddLesson from "./components/add-lessson/add-lesson";
import DeceptionDetection from "./components/deception-detection/deception-detection";
import Landing from "./components/landing/landing";
import Login from "./components/login/login";
import {useAuth} from "./cloud-infrastructure/auth";
import AddDeceptionDetection from "./components/add-deception-detection/add-deception-detection";
import NewAddLesson from "./components/add-lessson/new-add-lesson";

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
                                <Route path={"/add-lesson"} element={<NewAddLesson />} />
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