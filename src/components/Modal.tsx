import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-modal";
import "./Modal.css";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useNavigate } from "react-router";

const ModalDetails = (props: {
  isSignupForm?: boolean;
  header: string;
  isForm: boolean;
  data: any;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);
  console.log("props.isSignupForm ", props.isSignupForm);
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
  const modalStyles2 = {
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

  const onEnterOTP = () => {
    const storedOtpString: string | null = localStorage.getItem("otp");
    if (storedOtpString != null) {
      const otpSent: number = parseInt(storedOtpString, 10);
      console.log("otpSent--->", otpSent);
      if (otpSent === parseInt(otp)) {
        setVerified(true);
        setOtpError(false);
        console.log("otp--success");
      } else {
        setOtpError(true);
      }
    }
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
          {props.isSignupForm === false && (
            <h2 style={{ margin: "0 auto" }}>{props.header}</h2>
          )}
          <AiFillCloseCircle
            onClick={closeModal}
            style={{ cursor: "pointer" }}
          />
        </div>
        {props.isForm === true ? (
          <>
            {props.isSignupForm ? (
              <>
                <h4 className="formData-lable">{"Enter Verification Code"}</h4>
                <div className="formData">
                  <OtpInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                  {otpError && (
                    <span style={{ color: "red", margin: "240px" }}>
                      {" "}
                      Wrong OTP
                    </span>
                  )}
                  <br />
                  <button
                    type="button"
                    className="btn btn-primary otp-button"
                    onClick={() => onEnterOTP()}
                  >
                    Verify OTP
                  </button>
                </div>
              </>
            ) : (
              <h4 className="formDataPlain">{props.data}</h4>
            )}
          </>
        ) : (
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
        )}
      </Modal>
      <Modal isOpen={verified} style={modalStyles2}>
        <h4 style={{ textAlign: "center", paddingTop: "100px" }}>
          OTP Verified Successfully.
        </h4>
        <button
          type="button"
          className="btn btn-primary otp-button"
          onClick={() => navigate("/login")}
          style={{ fontSize: "20px", marginLeft: "150px" }}
        >
          OK
        </button>
      </Modal>
    </>
  );
};

export default ModalDetails;
