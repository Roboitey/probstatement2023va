import React from "react";
import "../Styles/forgotPassword.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChangePassword } from "../services/LoginService";
import ErrorMessage from "../Sub_components/errorModal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SuccessMessage = ({ isOpen, setIsOpen, title, body }) => {
  const Nav = useNavigate();
  if (!isOpen) return null;
  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            setIsOpen(false);
            Nav("/login");
          }}
        >
          Ok, Go back to profile page
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const RecoveryMessage = ({ isOpen, setIsOpen, title, closeFunction }) => {
  if (!isOpen) return null;
  return (
    <Modal show={isOpen} onHide={closeFunction}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button variant="primary" onClick={closeFunction}>
          Ok!
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
const EmailErrorMessage = ({ isOpen, setIsOpen, title, body }) => {
  if (!isOpen) return null;
  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Understood
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isPasswordModalOpen, setPasswordIsModalOpen] = useState(false);
  const [isPassword2ModalOpen, setPassword2IsModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessIsModalOpen] = useState(false);
  const [isRecoveryModalOpen, setRecoveryIsModalOpen] = useState(false);
  const [isEmailErrorModalOpen, setEmailErrorIsModalOpen] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [strength, setStrength] = useState();
  const [st, setSt] = useState("Weak");

  const password_func = (e) => {
    const pass = e.target.value;
    setPassword(pass);
    if (pass.length < 11) {
      setStrength(false);
      setSt("Weak");
    }
    if (11 <= pass.length && pass.length < 17) {
      setStrength(true);
      setSt("Moderate");
    }
    if (pass.length >= 17) {
      setStrength(true);
      setSt("Strong");
    }
  };
  function handleSubmit(e) {
    e.preventDefault();
    if (submit) {
      if (strength) {
        if (password !== confirmPassword) {
          setError("password does not match");
          setPassword2IsModalOpen(true);
        } else {
          console.log("Password changed");
          setError("");
          ChangePassword(username, password);
          setSuccessIsModalOpen(true);
        }
      } else {
        setPasswordIsModalOpen(true);
      }
    } else {
      if (email.length !== 0) {
        console.log("Recovery email has been sent to " + email);
        setRecoveryIsModalOpen(true);
      } else {
        setEmailErrorIsModalOpen(true);
      }
    }
  }
  return !submit ? (
    <>
      <RecoveryMessage
        isOpen={isRecoveryModalOpen}
        setIsOpen={setRecoveryIsModalOpen}
        title={"Recovery email has been sent to " + email}
        closeFunction={() => {
          setSubmit(true);
        }}
      />
      <EmailErrorMessage
        isOpen={isEmailErrorModalOpen}
        setIsOpen={setEmailErrorIsModalOpen}
        title="Invalid Email"
        body="Please enter your recovery email."
      />

      <div className="forget-pass">
        <div className="forge-pass-title">
          <h1>Forgot Password?</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <label for="email" placeholder="enter...">
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email: "
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </>
  ) : (
    <>
      <ErrorMessage
        isOpen={isPassword2ModalOpen}
        setIsOpen={setPassword2IsModalOpen}
        title="Invalid Password"
        body="Passwords do not match. Please change it to make it valid."
      />
      <SuccessMessage
        isOpen={isSuccessModalOpen}
        setIsOpen={setSuccessIsModalOpen}
        title="Your password has been successfully changed"
        body=""
      />
      <ErrorMessage
        isOpen={isPasswordModalOpen}
        setIsOpen={setPasswordIsModalOpen}
        title="Password is too short"
        body={
          password +
          " is too short. Please make the password above 11 characters."
        }
      />
      <div className="reset-password">
        <h1>Set New Password</h1>
        <form onSubmit={handleSubmit} className="reset-password-form">
          <div className="reset-password-form-cont">
            <label>Username: </label>
            <input
              type="text"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
          <div className="reset-password-form-cont">
            <label for="password" placeholder="enter...">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={password_func}
            />
            <p
              style={{
                color:
                  st === "Weak"
                    ? "red"
                    : st === "Moderate"
                    ? "#cfbf39"
                    : st === "Strong"
                    ? "#1ecb34  "
                    : "black",
              }}
            >
              {st} <span>&#183;</span> {password.length} characters
            </p>
          </div>
          <div
            className="reset-password-form-cont"
            style={{ marginTop: "15px" }}
          >
            <label for="confirmPassword" placeholder="enter...">
              ConfirmPassword:
            </label>
            <input
              type="password  "
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password "
              onChange={(e) => {
                setconfirmPassword(e.target.value);
              }}
            />
          </div>
          <div className="reset-password-form-btn">
            <button type="submit">Reset Password</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
