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
                                <Route path={"/add-lesson"} element={<AddLesson />} />
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