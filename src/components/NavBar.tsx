import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import styled from "styled-components";
import { useEffect, useState } from "react";

const CustomNavBar = styled.nav`
  color: white;
`;

const NavBar = () => {
  const [username, setUsername] = useState("");
  let value = localStorage.getItem("username");

  console.log("value-->", value);
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(value || "");
    console.log("username", username);
  }, [value, username]);

  //let storedUsername = localStorage.getItem("username") || "";
  const handleLogout = () => {
    // console.log("handleLogout---->");
    localStorage.clear();
    // console.log(
    //   "localStorage.getItem('username')",
    //   localStorage.getItem("username")
    // );
    setUsername(value || "");
    navigate("/");
    location.reload();
  };
  return (
    <CustomNavBar
      className="navbar navbar-expand-lg"
      style={{ backgroundColor: "#004525" }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          CampusCare
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link active" aria-current="page">
                Home
              </Link>
            </li>
            {!username && (
              <>
                <li className="nav-item float-list-item">
                  <Link to="/login" className="nav-link active">
                    Login
                  </Link>
                </li>
                <li className="nav-item float-list-item">
                  <Link to="/signup" className="nav-link active">
                    Signup
                  </Link>
                </li>
              </>
            )}
            {username && (
              <li className="nav-item float-list-item">
                <Link to="/" className="nav-link active" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </CustomNavBar>
  );
};

export default NavBar;
