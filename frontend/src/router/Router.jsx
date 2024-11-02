// src/router/Router.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ManageStudents from '../pages/ManageStudents';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLayout from '../components/AdminLayout';
import Student from '../pages/Student';
import ManageTeachers from '../pages/ManageTeachers';
import Teacher from '../pages/Teacher';

const Router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminLayout/>, 
    children: [
      {
        path: "adminDashboard", 
        element: <AdminDashboard />
      },
      {
        path: "manageStudents", 
        element: <ManageStudents />
      },
      {
        path: "student/:studentId", 
        element: <Student/>
      },
      {
        path: "manageTeachers", 
        element: <ManageTeachers/>
      },
      {
        path: "teacher/:teacherId", 
        element: <Teacher/>
      }
    ]
  }
]);

export default Router;
