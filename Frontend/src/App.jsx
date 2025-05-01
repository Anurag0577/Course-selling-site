import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Signup from './Components/Signup/Signup.jsx';
import Login from './Components/login/Login.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AllCourses from './Components/AllCourses/AllCourses.jsx';
import CourseDetail from './Components/CourseDetail/CourseDetail.jsx';
import HomePage from './Components/HomePage/HomePage.jsx';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/courses',
      element: <AllCourses />,
    },
    {
      path: '/courses/:id',
      element: <Signup />,
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
