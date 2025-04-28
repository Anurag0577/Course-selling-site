import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Signup from './Components/Signup/Signup.jsx'
import Login from './Components/Login/Login.jsx';

function App() {

  return (
    <>
      <Signup />
      <Login />
    </>
  )
}

export default App
