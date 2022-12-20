import NavigationBar from "./components/navbar/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./components/landing/landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseLanding from "./components/course-landing/course-landing";
import AddCourse from "./components/add-course/add-course";
import AddLesson from "./components/add-lessson/add-lesson";
import DeceptionDetection from "./components/deception-detection/deception-detection";
import AuthProvider, {useAuth} from "./cloud-infrastructure/auth";
import auth from "./cloud-infrastructure/firebase";
import Login from "./components/login/login";
import {useEffect, useState} from "react";
import PageRoutes from "./PageRoutes";


function App() {

    return (
      <AuthProvider>
          <PageRoutes />
      </AuthProvider>
  );
}

export default App;
