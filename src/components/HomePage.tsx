import { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import { useNavigate } from "react-router";

const Home = () => {
  const storedUsername = localStorage.getItem("username") || "";
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(storedUsername || "");
    console.log("username---->Homepage", username);
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/complaint");
  };

  return (
    <div className="container-fluid">
      {username && <h2 style={{ marginTop: "20px" }}> Welcome {username}</h2>}
      <br />
      <h3 className="text-justify">
        CampusCare is a dynamic and user-friendly website designed to address
        and resolve student concerns effectively within our college community.
      </h3>

      <button
        type="button"
        className="btn btn-primary"
        disabled={username ? false : true}
        onClick={handleClick}
      >
        Register a complaint
      </button>
      <br />
      {!username && (
        <small style={{ color: "red" }}>Login to register a complaint...</small>
      )}
    </div>
  );
};

export default Home;
