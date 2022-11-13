import NavigationBar from "./components/navbar/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./components/landing/landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CourseLanding from "./components/course-landing/course-landing";
import Minigame from "./components/minigame-landing/minigame";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/course/" element={<CourseLanding />} />
                <Route path="/minigame/Catch%20a%20Liar" element={<Minigame />} exact/>
                <Route path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
  </div>
  );
}

export default App;
