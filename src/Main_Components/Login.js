import React from "react";
import { useState } from "react";
import { LoginSystem } from "../services/LoginService";
import { SignUpSystem } from "../services/LoginService";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../Styles/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState(false);
  const Nav = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    LoginSystem(username, password)
  };
  return (
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
        {passwordType ? (
          <VisibilityOffIcon
            className="visibility-icon"
            fontSize="medium"
            onClick={() => {
              setPasswordType(!passwordType);
            }}
          />
        ) : (
          <VisibilityIcon
            className="visibility-icon"
            fontSize="medium"
            onClick={() => {
              setPasswordType(!passwordType);
            }}
          />
        )}
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
  );
}
export default Login;
