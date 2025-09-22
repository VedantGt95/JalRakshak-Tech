import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import MapComponent from "./components/MapComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<MapComponent />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
