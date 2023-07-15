import { Email } from "@mui/icons-material";
import React from "react";
import { useState } from "react";
import "../Styles/Login.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaImgVIsibility, setCaptchaImgVisibility] = useState(false);
  const captchaImage = "images/Captcha.png"; // Replace with the actual captcha image URL

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isCaptchaValid) {
      // Perform Sign up logic here
      console.log("Correct captcha");
    //   SignUpSystem(username, Email, password);
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
      <h1 className="fl-title">Sign Up Form</h1>
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

      <div className="fl-cont">
        <label htmlFor="Email" className="fl-label">
          Email:
        </label>
        <input
          type="Email"
          id="Email"
          className="fl-input"
          value={Email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"

        />
      </div>
      <div className="fl-cont">
        <label htmlFor="password" className="fl-label">
          Password:
        </label>
        <input
          type="password"
          id="password"
          className="fl-input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
      </div>

      <div className="fl-cont">
        <label htmlFor="captcha" className="fl-label">
          Captcha:
        </label>
        <input
          type="text"
          id="captcha"
          className="fl-input"
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
        Sign Up
      </button>
    </form>
  );
}
export default SignUp;
