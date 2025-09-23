import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";

import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import UserDashboard from "./components/UserDashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<UserDashboard />} />
        <Route path="*" element={<Login />} />
        <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        
      </Routes>
    </Router>
  );
}

export default App;
