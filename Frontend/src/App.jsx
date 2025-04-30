import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Signup from './Components/Signup/Signup.jsx';
import Login from './Components/login/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />,
    },
    {
      path: '/admin/login',
      element: <Login />,
    },
    {
      path: '/admin/signup',
      element: <Signup />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
