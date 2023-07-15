import React from 'react'
import "../Styles/forgotPassword.css"
import { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sumbit, setSumbit] = useState(false);
  function handleSubmit(e) {
    e.preventDefault();
    console.log("Recovery email has been sent to " + email);
    setSumbit(true)
  }
  return (
    (!sumbit)? (
    <div className="forget-pass">
      <h1>Forgot Password?</h1>
      <form onSubmit={handleSubmit}>
        <label for="email" placeholder="enter...">Email:</label>
        <input type="email" id="email" name="email" placeholder='email: ' onChange={(e) => { setEmail(e.target.value) }} />
        <button type="submit">Reset Password</button>
      </form>
    </div>) :(
    <div>Set Password</div>
    //To-do: add form to set a new password
    )
  )
}

export default ForgotPassword