import NavBar from "./components/NavBar/NavBar";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Login from "./components/LoginPage/LoginPage";
import Home from "./components/HomePage/HomePage";
import Signup from "./components/SignupPage/SignupPage";
import Complaint from "./components/ComplaintPage/ComplaintPage";
import AllComplaints from "./components/AllComplaints/AllComplaints";
import BottomNav from "./components/BottomNav/BottomNav";

function App() {
  return (
    <>
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
        <BottomNav />
      </Router>
    </>
  );
}

export default App;
