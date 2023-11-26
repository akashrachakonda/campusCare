import { useEffect, useState } from "react";
import "./HomePage.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillMinusCircle } from "react-icons/ai";
import ModalDetails from "../Modal/Modal";

const Home = () => {
  const storedUsername = localStorage.getItem("username") || "";
  const password = localStorage.getItem("password") || "";
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");
  const [allComplaints, setAllComplaints] = useState([]);
  const [isForm, setIsForm] = useState(false);
  useEffect(() => {
    setUsername(storedUsername || "");
    setPass(password || "");

    axios
      .get("http://localhost:3001/allcomplaintsList")
      .then((res) => {
        setAllComplaints(res.data.complaintsData);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/complaint");
  };

  const addressComplaint = (
    complaintId: number,
    email: string,
    name: string,
    description: string
  ) => {
    axios
      .put("http://localhost:3001/update", {
        complaintId: complaintId,
        email: email,
        name: name,
        description: description,
      })
      .then((res) => {
        setAllComplaints(res.data.complaintsData);
      })
      .catch((err) => console.log(err));
    alert("Complaint Addressed. Thank you.");
    location.reload();
  };
  const [data, setData] = useState({
    name: "",
    complaintId: "",
    description: "",
    email: "",
    id: "",
    phone: "",
    status: "",
  });
  const [showModal, setShowModal] = useState(false);

  const openModal = (data: any) => {
    setData(data);
    setShowModal(true);
  };

  return (
    <div className="container-fluid">
      {username && (
        <h2 style={{ marginTop: "20px", textAlign: "center" }}>
          Welcome {username}
        </h2>
      )}
      <br />
      {username != "Admin" && pass != "Unccadmin2023" && (
        <div className="containerHome">
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
            Register a Complaint / Feedback
          </button>

          <br />
          {!username && (
            <small style={{ color: "red", paddingLeft: "25px" }}>
              Login to register a complaint / feedback...
            </small>
          )}
        </div>
      )}
      {username === "Admin" && pass === "Unccadmin2023" && (
        <>
          {allComplaints ? (
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
                  <tr
                    key={index}
                    onClick={() => openModal(data)}
                    style={{ cursor: "pointer" }}
                  >
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
                          <> | </>
                          <GoCheckCircleFill
                            style={{ color: "green" }}
                            onClick={() =>
                              addressComplaint(
                                data.complaintId,
                                data.email,
                                data.name,
                                data.description
                              )
                            }
                          />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="emptydiv"> The Complaint box is empty...</div>
          )}
          <ModalDetails
            isSignupForm={false}
            isComplaintDetails={true}
            header="Complaint / Feedback Details"
            data={data}
            isForm={isForm}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </>
      )}
    </div>
  );
};

export default Home;
