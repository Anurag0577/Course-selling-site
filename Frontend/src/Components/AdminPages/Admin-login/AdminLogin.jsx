import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import "../../login/Login.css"
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  let navigate = useNavigate();
  let [username, setUsername] = useState('');
  let [password, setPassword] = useState('');

  function submitTodo(){
    try {
    fetch('http://localhost:3000/admin/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },

    // Remember whenever you are sending fetch req to backend make sure you convert this body tag into json string something like "username": "usename", "password": "password". If you dont convert it the js object will send then.
      body: JSON.stringify({
        username,
        password
      })
    })
    .then(response => {
      // and after getting responce you have to change it back to js object.
      return response.json()
    })
    .then(data => {
      console.log("Got response!")
      let token = data.token;
      localStorage.setItem('token', token)
      console.log(token)
      navigate('/AdminCourses');
    })}
    catch(error){
      console.log({
        message: 'Login failed!',
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
            <input type="text" placeholder="John" id="username-input" value={username} onChange={(e) => setUsername(e.target.value)} />
            <label htmlFor="pass-input" className="pass-label">Password</label>
            <input type="password" id="pass-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <div className='login-btn' onClick={() => submitTodo()}>Login Account</div>
            <small style={{display: 'block', textAlign: 'center', marginTop: "10px"}}>New to the website? <a style={{color: '#90C67C'}}>Create Account</a></small>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminLogin