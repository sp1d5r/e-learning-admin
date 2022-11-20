import NavigationBar from "./components/navbar/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./components/landing/landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseLanding from "./components/course-landing/course-landing";
import AddCourse from "./components/add-course/add-course";
import AddLesson from "./components/add-lessson/add-lesson";
import DeceptionDetection from "./components/deception-detection/deception-detection";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/course/" element={<CourseLanding />} />
                <Route path={"/add-course"} element={<AddCourse />} />
                <Route path={"/add-lesson"} element={<AddLesson />} />
                <Route path={"/deception-detection"} element={<DeceptionDetection />} />
                <Route path="/minigame/Catch%20a%20Liar" element={<DeceptionDetection />} />
                <Route path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
  </div>
  );
}

export default App;
