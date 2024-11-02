// src/router/Router.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ManageStudents from '../pages/ManageStudents';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLayout from '../components/AdminLayout';
import Student from '../pages/Student';

const Router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout/>, // Admin layout with NavigationBar and nested routes
    children: [
      {
        path: "adminDashboard", // Maps to /admin/adminDashboard
        element: <AdminDashboard />
      },
      {
        path: "manageStudents", // Maps to /admin/manageStudents
        element: <ManageStudents />
      },
      {
        path: "student/:studentId", // Maps to /admin/viewStudent/:studentId
        element: <Student/>// Component that displays the student's details
      }
    ]
  }
]);

export default Router;
