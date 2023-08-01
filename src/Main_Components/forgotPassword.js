import React from "react";
import "../Styles/forgotPassword.css";
import { useState } from "react";
import { ChangePassword } from "../services/LoginService";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    if (submit) {
      if (password !== confirmPassword) {
        setError("password does not match");
      } else {
        console.log("Password changed");
        setError("");
        ChangePassword(username, password);
      }
    } else {
      console.log("Recovery email has been sent to " + email);
      setSubmit(true);
    }
  }
  return !submit ? (
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  ) : (
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="reset-password-form-cont">
          <label for="confirmPassword" placeholder="enter...">
            ConfirmPassword:
          </label>
          <input
            type="confirmPassword"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm Password "
            onChange={(e) => {
              setconfirmPassword(e.target.value);
            }}
          />
        </div>
        {error}
        <div className="reset-password-form-btn">
          <button type="submit">Reset Password</button>
        </div>
      </form>
    </div>
  );
}

export default ForgotPassword;
