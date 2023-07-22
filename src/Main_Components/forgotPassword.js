import React from 'react'
import "../Styles/forgotPassword.css"
import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [submit, setSubmit] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    if(submit){
      if(password !== confirmPassword){
        setError("password does not match")
      } else{
        console.log('Password changed');
        setError("")
      }
    } else {
      console.log("Recovery email has been sent to " + email);
      setSubmit(true)
    }
  }
  return (
    (!submit) ? (
      <div className="forget-pass">
        <h1>Forgot Password?</h1>
        <form onSubmit={handleSubmit}>
          <label for="email" placeholder="enter...">Email:</label>
          <input type="email" id="email" name="email" placeholder='email: ' onChange={(e) => { setEmail(e.target.value) }} />
          <button type="submit">Reset Password</button>
        </form>
      </div>
    ) : (
      <div className="forget-pass">
        <h1>Set New Password</h1>
        <form onSubmit={handleSubmit}>
          <label for="password" placeholder="enter...">Password:</label>
          <input type="password" id="password" name="password" placeholder='password: ' onChange={(e) => { setPassword(e.target.value) }} />
          <label for="confirmPassword" placeholder="enter...">ConfirmPassword:</label>
          <input type="confirmPassword" id="confirmPassword" name="confirmPassword" placeholder='confirmPassword: ' onChange={(e) => { setconfirmPassword(e.target.value) }} />
          {error}
          
          <button type="submit">Reset Password</button>
        </form>
      </div>
    )
  )
}

export default ForgotPassword