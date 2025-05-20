import React from 'react'
import {useState} from 'react'
import './Signup.css'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';

function Signup(){

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  let navigate = useNavigate();

  function createAccount(){
    fetch('http://localhost:3000/users/signup', {
      method: "POST",
      headers: {
        "Content-type" : "application/json"
      },
      body: JSON.stringify({
        username,
        password,
        email
      })
    })
    .then(response => {
      return response.json()
    })
    .then(data => {
      console.log(data);
      let token = data.token;
      localStorage.setItem('token', token)
    })
    .catch((error) => {
      console.log( {
        message: "Signup failed!",
        Error: error
      } )
    })
  }
    return <>
    <div className="signup-page">
        <div className="signup-form">
          <div className="heading-container">
            <div className="signup-heading">Create an account</div>
            <small className="signup-description">Enter your credentials to signup to your account</small>
          </div>
          <div className="form-container">
            <label htmlFor="username-input" className="username-label">Username</label>

            <input type="text" placeholder="John" id="username-input" value = {username} onChange={(e) => setUsername(e.target.value)} />

            <label htmlFor="email-input" className="email-label">Email</label>

            <input type="text" placeholder="John@example.com" id="email-input" value = {email} onChange={(e) => setEmail(e.target.value)} />

            <label htmlFor="pass-input" className="pass-label">Password</label>

            <input type="password" id="pass-input" value = {password} onChange={(e) => setPassword(e.target.value)} />
            <div className='signup-btn' onClick={() => createAccount()}>Create Account</div>
            <small style={{display: 'block', textAlign: 'center'}}>Already have an account? <a onClick={()=> navigate('/users/login')} style={{color: '#90C67C', cursor: 'pointer'}} >Login</a></small>
          </div>
        </div>
      </div>
    </>
}

export default Signup