import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing.jsx";
import FunctionExplorer from "./pages/funcExplore.jsx";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/explorer" element={<FunctionExplorer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
