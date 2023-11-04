import { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillMinusCircle } from "react-icons/ai";

const Home = () => {
  const storedUsername = localStorage.getItem("username") || "";
  const password = localStorage.getItem("password") || "";
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [allComplaints, setAllComplaints] = useState([]);
  useEffect(() => {
    setUsername(storedUsername || "");
    setPass(password || "");
    console.log("username---->Homepage", username, "--", password);

    axios
      .get("http://localhost:3001/allcomplaintsList")
      .then((res) => {
        console.log(
          "res---> All ComplaintsList --admin",
          res.data.complaintsData
        );
        setAllComplaints(res.data.complaintsData);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/complaint");
  };

  const addressComplaint = (complaintId: number) => {
    axios
      .put("http://localhost:3001/update", {
        complaintId: complaintId,
      })
      .then((res) => {
        console.log("Update --admin", res);
        setAllComplaints(res.data.complaintsData);
      })
      .catch((err) => console.log(err));
    alert("Complaint Addressed. Thank you.");
    location.reload();
  };
  return (
    <div className="container-fluid">
      {username && <h2 style={{ marginTop: "20px" }}> Welcome {username}</h2>}
      <br />
      {username != "Admin" && pass != "Unccadmin2023" && (
        <>
          <h3 className="text-justify">
            CampusCare is a dynamic and user-friendly website designed to
            address and resolve student concerns effectively within our college
            community.
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
            <small style={{ color: "red" }}>
              Login to register a complaint...
            </small>
          )}
        </>
      )}
      {username === "Admin" && pass === "Unccadmin2023" && (
        <>
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Description</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {allComplaints?.map((data: any, index: number) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.name}</td>
                  <td>{data.email}</td>
                  <td>{data.phone}</td>
                  <td className="text-truncate">{data.description}</td>
                  <td
                    style={{
                      color: data?.status === "Pending" ? "orange" : "green",
                    }}
                  >
                    {data.status === "Pending" ? (
                      <AiFillMinusCircle />
                    ) : (
                      data.status
                    )}
                    {data.status === "Pending" && (
                      <>
                        <>|</>
                        <GoCheckCircleFill
                          style={{ color: "green" }}
                          onClick={() => addressComplaint(data.complaintId)}
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Home;
