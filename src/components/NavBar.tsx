import { Link } from "react-router-dom";
import "./NavBar.css";
import styled from "styled-components";

const CustomNavBar = styled.nav`
  color: white;
`;

const NavBar = () => {
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
          </ul>
        </div>
      </div>
    </CustomNavBar>
  );
};

export default NavBar;
