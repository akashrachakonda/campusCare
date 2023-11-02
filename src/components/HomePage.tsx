import { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";

const Home = () => {
  // const [name, setName] = useState("");
  const storedUsername = localStorage.getItem("username") || "";
  // if (storedUsername !== null) {
  //   setName(storedUsername);
  // }

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3001")
  //     .then((res) => {
  //       console.log("res---home", res);
  //       if (res.data.valid) {

  //       }
  //     })
  //     .catch((err) => console.log("Home--err--->", err));
  // }, []);

  return (
    <div className="container-fluid">
      {storedUsername && <h2> Welcome {storedUsername}</h2>}
      <h3 className="text-justify">
        CampusCare is a dynamic and user-friendly website designed to address
        and resolve student concerns effectively within our college community.
      </h3>

      <button
        type="button"
        className="btn btn-primary"
        disabled={storedUsername ? false : true}
      >
        Register a complaint
      </button>
      <br />
      {!storedUsername && (
        <small style={{ color: "red" }}>Login to register a complaint...</small>
      )}
    </div>
  );
};

export default Home;
