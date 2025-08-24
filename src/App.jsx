import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/HomePage.jsx";
import { AdminLogin } from "./components/AdminLogin.jsx";
import AdminHome from "./components/AdminHome.jsx";
import UserProfile from "./components/UserProfile.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import AdminFullProfile from "./components/AdminFullProfile.jsx";
import Update from "./components/Update.jsx";


import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route path="/cbaddda" element={<AdminHome />} />
        {/* Regular user profile */}
        <Route path="/profile/:id" element={<UserProfile />} />
        <Route path="/update/:id" element={<Update />} /> {/* 🔹 Added */}
        {/* Admin full profile */}
        <Route path="/cbaddda/user/:id" element={<AdminFullProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
