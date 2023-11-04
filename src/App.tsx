import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/LoginPage";
import Home from "./components/HomePage";
import Signup from "./components/SignupPage";
import Complaint from "./components/complaintPage";
import AllComplaints from "./components/AllComplaints";

function App() {
  return (
    <Router>
      <div>
        <NavBar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/previousComplaint" element={<AllComplaints />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
