import { useState } from "react";
import "./AllComplaints.css";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-modal";
import ModalDetails from "../Modal/Modal";

const AllComplaints = () => {
  const location = useLocation();
  const prevCompData = location.state?.data;
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
  const [isForm, setIsForm] = useState(false);

  const openModal = (data: any) => {
    setData(data);
    setShowModal(true);
    setIsForm(false);
  };

  const appRootElement = document.getElementById("root");

  if (appRootElement) {
    Modal.setAppElement(appRootElement);
  }
  const modalStyles = {
    content: {
      width: "600px",
      height: "300px",
      margin: "auto",
      borderRadius: "8px",
      border: "none",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 1000,
    },
  };

  return (
    <>
      <Link type="button" className="btn btn-primary btn-sm " to={"/complaint"}>
        Back
      </Link>
      <h3 className="tableLabel">Previous Complaints / Feedbacks list</h3>
      <table className="table table-hover">
        <thead className="thead-dark">
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
          {prevCompData.map((data: any, index: number) => (
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
                {data.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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
  );
};

export default AllComplaints;
