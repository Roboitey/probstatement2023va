import React from "react";
import { useState } from "react";
import { SignUpSystem } from "../services/LoginService";
import { SignInSystem } from "../services/LoginService";
import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "../Styles/SignUp.css";
import ErrorMessage from "../Sub_components/errorModal";

function SignUp() {
  /*Password strength must be indicated as well.
  // Weak passwords will be rejected. 
  //A weak password is ≤10 characters. 
  //A moderate password is 11-17 characters. 
  A strong password is above 17 characters. */
  const [username, setUsername] = useState("");
  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captcha, setCaptcha] = useState("");
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);
  const [captchaImgVIsibility, setCaptchaImgVisibility] = useState(false);
  const [strength, setStrength] = useState();
  const [st, setSt] = useState("Weak");
  const [passwordType, setPasswordType] = useState(false);
  const [isPasswordModalOpen, setPasswordIsModalOpen] = useState(false);
  const [isUsernameModalOpen, setUsernameIsModalOpen] = useState(false);
  const [isCaptchaModalOpen, setCaptchaIsModalOpen] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");
  const captchaImage = "images/Captcha.png";

  const Nav = useNavigate();
  const password_func = (e) => {
    const pass = e.target.value;
    setPassword(pass);
    console.log(pass.length + 1);
    if (pass.length <= 11) {
      setStrength(false);
      setSt("Weak");
    }
    if (11 < pass.length && pass.length < 17) {
      setStrength(true);
      setSt("Moderate");
    }
    if (pass.length >= 17) {
      setStrength(true);
      setSt("Strong");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (strength) {
      if (isCaptchaValid) {
        // Perform Sign up logic here
        console.log("Correct captcha");
        SignUpSystem(username, Email, password).then((data) => {
          if (data.success) {
            SignInSystem(data.user);
            Nav("/profile/" + data.user.user_id);
          } else {
            console.log(data.error);
            setUsernameErrorMessage(data.error);
            setUsernameIsModalOpen(true);
          }
        });
      } else {
        console.log("Invalid captcha");
        setCaptchaIsModalOpen(true);
      }
    } else {
      console.log("password too short");
      setPasswordIsModalOpen(true);
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
    <>
      <ErrorMessage
        isOpen={isPasswordModalOpen}
        setIsOpen={setPasswordIsModalOpen}
        title="Password too short"
        body={
          password +
          " is too short. It must be above 11 character to be accepted."
        }
      />
      <ErrorMessage
        isOpen={isUsernameModalOpen}
        setIsOpen={setUsernameIsModalOpen}
        title="Invalid username"
        body={"" + usernameErrorMessage}
      />
      <ErrorMessage
        isOpen={isCaptchaModalOpen}
        setIsOpen={setCaptchaIsModalOpen}
        title="Invalid Captcha"
        body={captcha + "is not a valid. Please make it identical to the captcha Image."}
      />
      <form onSubmit={handleSubmit} className="form-signUp ">
        <h1 className="fl-title">Sign Up to our Site!</h1>
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
            type="email"
            id="Email"
            className="fl-input"
            value={Email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
          />
        </div>
        <div className="fl-cont ">
          <label htmlFor="password" className="fl-label">
            Password:
          </label>
          <input
            type={passwordType ? "text" : "password"}
            id="password"
            className="fl-input"
            value={password}
            onChange={password_func}
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
          <div className="password-strength">
            <p className={st}>
              {st} <span>&#183;</span> {password.length} characters
            </p>
          </div>
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

        <button type="submit" className="submit-btn">
          Sign Up
        </button>
      </form>
    </>
  );
}
export default SignUp;
