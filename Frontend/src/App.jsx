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
import AdminLogin from './Components/AdminPages/Admin-login/AdminLogin.jsx';
import AdminSignup from './Components/AdminPages/Admin-signup/AdminSignup.jsx';
import AdminCourses from './Components/AdminPages/Admin-courses/AdminCourses.jsx';
import AddCoursePopup from './Components/AddCoursePopup/AddCoursePopup.jsx';

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
    },
    {
      path: '/users/signup',
      element: <Signup />
    },
    {
      path: '/admin/login',
      element: <AdminLogin />
    },
    {
      path: '/admin/signup',
      element: <AdminSignup />
    },
    {
      path: '/AdminCourses',
      element: <AdminCourses />
    },
    {
      path: '/AddCoursePopup',
      element: <AddCoursePopup />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
