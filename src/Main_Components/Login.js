import React from "react";
import { useState } from "react";
import { LoginSystem } from "../services/LoginService";
import "../Styles/Login.css"

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaImgVIsibility, setCaptchaImgVisibility] = useState(false);
  const captchaImage = "images/Captcha.png"; // Replace with the actual captcha image URL

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isCaptchaValid) {
      // Perform login logic here
      console.log("Correct captcha");
      LoginSystem(username, password);
    } else {
      console.log("Invalid captcha");
    }
  };

  const handleCaptchaChange = (event) => {
    setCaptcha(event.target.value);
  };

  const handleCaptchaBlur = () => {
    // Simulate captcha validation (e.g., make an API call)
    const isCaptchaValid = captcha === "ja5tyi02"; // Replace '1234' with the correct captcha value
    setIsCaptchaValid(isCaptchaValid);
  };

  return (
    <form onSubmit={handleSubmit} className="form-login">
      <h1 className="fl-title">Login Form</h1>
      <div className="fl-username">
        <label htmlFor="username" className="fl-username-label">
          Username:
        </label>
        <input
          type="text"
          id="username"
          className="fl-username-input"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />
      </div>

      <div className="fl-password">
        <label htmlFor="password" className="fl-password-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="fl-password-input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
      </div>

      <div className="fl-captcha">
        <label htmlFor="captcha" className="fl-captcha-label">
          Captcha:
        </label>
        <input
          type="text"
          id="captcha"
          className="fl-captcha-input"
          value={captcha}
          onChange={handleCaptchaChange}
          onBlur={handleCaptchaBlur}
          placeholder="Captcha"
        />
      </div>

      <div className="captcha-btn">
        <button
          type="button"
          onClick={() => {
            setCaptchaImgVisibility(!captchaImgVIsibility);
          }}
        >
          Show Captcha
        </button>
      </div>

      {captchaImgVIsibility && (
        <div className="captcha-img">
          <img src={captchaImage} alt="Captcha" />
        </div>
      )}

      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
}
export default Login;
