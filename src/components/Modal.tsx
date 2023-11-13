import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-modal";

const ModalDetails = (props: {
  data: any;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) => {
  const closeModal = () => {
    props.setShowModal(false);
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
      <Modal isOpen={props.showModal} style={modalStyles}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h2>Complaint Details</h2>
          <AiFillCloseCircle
            onClick={closeModal}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="info-container">
          <h5 className="info-item">Name: {props.data.name}</h5>
          <h5 className="info-item">Email: {props.data.email}</h5>
          <h5 className="info-item">Phone: {props.data.phone}</h5>
          <h5 className="info-item">Description: {props.data.description}</h5>
          <h5
            className={`info-item ${
              props.data.status === "Addressed"
                ? "highlightGreen"
                : "highlightRed"
            }`}
          >
            Status: {props.data.status}
          </h5>
        </div>
      </Modal>
    </>
  );
};

export default ModalDetails;
