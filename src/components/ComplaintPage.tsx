import { useEffect, useState } from "react";
import "./ComplaintPage.css";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import ModalDetails from "./Modal";

const Complaint = () => {
  const [newComplaint, setNewComplaint] = useState(false);
  const [preComplaints, setPreComplaints] = useState(false);
  const [prevCompData, setPrevCompData] = useState([]);
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [details, setDetails] = useState({
    id: "",
    complaintId: "",
    name: "",
    email: "",
    phone: "",
    description: "",
    status: "Pending",
  });
  const [isForm, setIsForm] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const params = {
      userId: localStorage.getItem("id") || "",
    };

    axios
      .post("http://localhost:3001/complaintsList", params)
      .then((res) => {
        console.log("res---> ComplaintsList", res);
        setPreComplaints(res.data.previousComplaints);
        setPrevCompData(res.data.complaints);
      })
      .catch((err) => console.log(err));
  }, [newComplaint]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    details["id"] = localStorage.getItem("id") || "";
    details["complaintId"] = Math.floor(Math.random() * 10000).toString();

    console.log("details-->", details);
    axios
      .post("http://localhost:3001/complaints", details)
      .then((res) => {
        console.log("res", res);
        setMessage("Your response has been submitted successfully. Thank you.");
        setShowModal(true);
        setIsForm(true);
        setNewComplaint(true);
        // navigate("/");
      })
      .catch((err) => console.log(err));

    // return alert("Your response has been submitted successfully. Thank you.");
  };

  const handleInput = (e: any) => {
    e.persist();
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handlePrevComplaints = () => {
    navigate(`/previousComplaint/${JSON.stringify(prevCompData)}`);
  };

  return (
    <>
      <div style={{ float: "right", marginRight: "20px", marginTop: "20px" }}>
        {preComplaints && (
          <Link
            type="button"
            className={`btn btn-primary btn-sm ${
              preComplaints ? "" : "disabled"
            }`}
            // disabled={!preComplaints}
            onClick={handlePrevComplaints}
            style={{ pointerEvents: preComplaints ? "auto" : "none" }}
            to={"/previousComplaint"}
            state={{ data: prevCompData }}
          >
            Previous Complaints
          </Link>
        )}
      </div>
      <div className="complaintPage">
        <h3 style={{ textAlign: "center" }}>Register a Complaint</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="name">
              Name
            </label>
            <input
              name="name"
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter Name"
              required
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="email">
              Email
            </label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              required
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="phone">
              Contact Number
            </label>
            <input
              name="phone"
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter Phone Number"
              required
              onChange={handleInput}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="description">
              Description
            </label>
            <textarea
              name="description"
              className="form-control"
              id="description"
              rows={10}
              placeholder="Enter Description"
              required
              onChange={handleInput}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit Complaint
          </button>
        </form>
        <ModalDetails
          header="Complaint Form"
          data={message}
          isForm={isForm}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
    </>
  );
};

export default Complaint;
