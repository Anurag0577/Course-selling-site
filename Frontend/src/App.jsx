import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Signup from './Components/Signup/Signup.jsx';
import Login from './Components/login/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AllCourses from './Components/AllCourses/AllCourses.jsx';
import CourseDetail from './Components/CourseDetail/CourseDetail.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <CourseDetail />,
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
