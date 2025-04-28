import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './Login.css'
function Login() {

  let {username, setUsername} = useState('');
  let {password, setPassword} = useState('');

  function submitTodo(){
    try {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: {
        username,
        password
      }
    })
    .then(response => {
      console.log()
      let token = response.token;
      localStorage.setItem('token', token)
    })}
    catch(error){
      console.log({
        message: 'Fetching failed!',
        error: error
      });
    }
  }

  return (
    <>
      <div className="login-page">
        <div className="login-form">
          <div className="heading-container">
            <div className="login-heading">Login to your account</div>
            <small className="login-description">Enter your credentials to login to your account</small>
          </div>
          <div className="form-container">
            <label htmlFor="username-input" className="username-label">Username</label>
            <input type="text" placeholder="John" id="username-input" value={username} onChange={(e) => setUsername(e.value)} />
            <label htmlFor="pass-input" className="pass-label">Password</label>
            <input type="password" id="pass-input" value={password} onChange={(e) => setPassword(e.value)}/>
            <div className='login-btn' onClick={() => submitTodo}>Login account</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;