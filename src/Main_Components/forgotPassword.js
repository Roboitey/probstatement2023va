import React from 'react'
import "../Styles/forgotPassword.css"

function ForgotPassword() {
  return (
    <div className="forget-pass">
    <h1>Forgot Password?</h1>
    <form>
      <label for="email" placeholder="enter...">Email:</label>
      <input type="email" id="email" name="email" placeholder='email: '/>
      <button type="submit">Reset Password</button>
    </form>
  </div>
  )
}

export default ForgotPassword