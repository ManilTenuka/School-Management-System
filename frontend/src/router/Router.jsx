// src/router/Router.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ManageStudents from '../pages/ManageStudents';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLayout from '../components/AdminLayout';

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
      }
    ]
  }
]);

export default Router;
