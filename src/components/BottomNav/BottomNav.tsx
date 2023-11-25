import { useState } from "react";
import ModalDetails from "../Modal/Modal";
import "./BottomNav.css";
import { FaGithub } from "react-icons/fa";

const BottomNav = () => {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");
  const openModal = () => {
    setShowModal(true);
    setMessage("CONTACT US");
  };

  return (
    <>
      <nav className="navbar navbar-light">
        <ul className="navbar-nav">
          <li className="navli" id="contact">
            <a className="nav-link" onClick={openModal}>
              Contact
            </a>
          </li>
        </ul>
        <ul className="navbar-nav">
          <li className="navli2">
            <a
              href="https://github.com/akashrachakonda/campusCare"
              className="nav-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </li>
        </ul>
      </nav>
      <ModalDetails
        isSignupForm={false}
        isComplaintDetails={false}
        header="CONTACT US"
        data={message}
        isForm={false}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  );
};

export default BottomNav;
