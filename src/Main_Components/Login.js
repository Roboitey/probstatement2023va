import React from "react";
import { useState } from "react";
import { LoginSystem } from "../services/LoginService";
import ErrorMessage from "../Sub_components/errorModal";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import "../Styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [UserFoundModalOpen, setUserFoundModalOpen] = useState(false);
  const [passwordType, setPasswordType] = useState(false);
  const Nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    LoginSystem(username, password).then((data) => {
      console.log(data);
      if (!data.success) {
        setUserFoundModalOpen(true);
      } else Nav("/profile");
    });
  };
  return (
    <>
      <ErrorMessage
        isOpen={UserFoundModalOpen}
        setIsOpen={setUserFoundModalOpen}
        title="User not Found"
        body={username + " is not found. Please put an existent username"}
      />
      <form onSubmit={handleSubmit} className="form-login">
        <h1 className="fl-title">Login To inBDPA</h1>
        <div className="fl-cont">
          <label htmlFor="username" className="fl-label">
            Username:
          </label>
          <input
            type="text"
            id="username"
            className="fl-input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
          />
        </div>

        <div className="fl-cont-pass">
          <label htmlFor="password" className="fl-label">
            Password:
          </label>
          <input
            type={passwordType ? "text" : "password"}
            id="password"
            className="fl-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>

        <div>
          <a type="button" className="forgot-pass" href="/forget-pass">
            Forgot Password?
          </a>
        </div>
      </form>
      {passwordType ? (
        <button className="visibility-icon">
          <VisibilityOffIcon
            className="visibility-icon"
            fontSize="medium"
            onClick={() => {
              setPasswordType(!passwordType);
            }}
          />
        </button>
      ) : (
        <button className="visibility-icon">
          <VisibilityIcon
            fontSize="medium"
            onClick={() => {
              setPasswordType(!passwordType);
            }}
          />
        </button>
      )}
    </>
  );
}
export default Login;
