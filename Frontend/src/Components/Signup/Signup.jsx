import React from 'react'
import './Signup.css'

function Signup(){

    return <>
    <div className="signup-page">
        <div className="signup-form">
          <div className="heading-container">
            <div className="signup-heading">Create an account</div>
            <small className="signup-description">Enter your credentials to signup to your account</small>
          </div>
          <div className="form-container">
            <label htmlFor="username-input" className="username-label">Username</label>

            <input type="text" placeholder="John" id="username-input" />

            <label htmlFor="pass-input" className="pass-label">Password</label>

            <input type="password" id="pass-input" />
            <div className='signup-btn'>Create account</div>
          </div>
        </div>
      </div>
    </>
}

export default Signup;