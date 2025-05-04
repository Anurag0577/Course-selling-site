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
import PurchasedCourses from './Components/PurchasedCourses/PurchasedCourses.jsx';
import PurchaseButton from './Components/PurchaseButton/PurchaseButton.jsx'

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
      element: <CourseDetail />,
    },
    {
      path: '/users/purchasedCourses',
      element: <PurchasedCourses />
    },
    {
      path: '/users/login',
      element: <Login />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
