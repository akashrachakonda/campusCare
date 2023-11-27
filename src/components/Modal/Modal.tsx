import { AiFillCloseCircle } from "react-icons/ai";
import Modal from "react-modal";
import "./Modal.css";
import OtpInput from "react-otp-input";
import { useState } from "react";
import { useNavigate } from "react-router";
import { IoMdMail } from "react-icons/io";
import { FaFacebook, FaTwitter, FaInstagramSquare } from "react-icons/fa";

const ModalDetails = (props: {
  isComplaintDetails?: boolean;
  isSignupForm?: boolean;
  header: string;
  isForm: boolean;
  data: any;
  showModal: boolean;
  mailId?: string;
  setShowModal: (showModal: boolean) => void;
}) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [spinner, setSpinner] = useState(false);
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
      height: props.isSignupForm ? `550px` : `300px `,
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
      height: "320px",
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
      setSpinner(true);
      setTimeout(function () {
        setSpinner(false);
        if (otpSent === parseInt(otp)) {
          setVerified(true);
          localStorage.setItem("verifiedOTP", "true");
          setOtpError(false);
        } else {
          setOtpError(true);
        }
      }, 3000);
      setTimeout(() => {
        setOtpError(false);
      }, 8000);
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
                <div className="mailIcon">
                  <IoMdMail />
                </div>
                <h4 className="formData-lable">
                  {"VERIFY YOUR EMAIL ADDRESS"}
                </h4>
                <hr />
                <p className="otpBody">
                  {" "}
                  A verification code has been sent to your email.
                </p>
                <p className="otpBody2">
                  Please check your inbox and enter the verification code below
                  to verify your email address.
                </p>
                <b></b>
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
                    Verify Code
                  </button>
                  {spinner && (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        {/* <span className="sr-only">Loading...</span> */}
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <h4 className="formDataPlain">{props.data}</h4>
            )}
          </>
        ) : props.isComplaintDetails ? (
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
        ) : (
          <>
            <div className="info-container" id="contactform">
              <h5>
                <b>campuscareuncc@gmail.com</b>
              </h5>
              <h5>
                <b>+1 (987)-654-3210</b>
              </h5>
            </div>
            <h5 className="icons">
              <FaFacebook className="icon" />
              <FaTwitter className="icon" />
              <FaInstagramSquare className="icon" />
            </h5>
          </>
        )}
      </Modal>
      <Modal isOpen={verified} style={modalStyles2}>
        <h4 style={{ textAlign: "center", paddingTop: "100px" }}>
          OTP Verified Successfully.
        </h4>
        <button
          type="button"
          className="btn btn-primary otp-button"
          onClick={() => {
            navigate("/login");
          }}
          style={{ fontSize: "20px", marginLeft: "150px" }}
        >
          OK
        </button>
      </Modal>
    </>
  );
};

export default ModalDetails;
