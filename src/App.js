import NavigationBar from "./components/navbar/navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from "./components/landing/landing";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <NavigationBar />
            <Routes>
                <Route path="/" element={<Landing />} />
            </Routes>
        </BrowserRouter>
  </div>
  );
}

export default App;
