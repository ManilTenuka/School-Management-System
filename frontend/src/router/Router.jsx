// src/router/Router.jsx
import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import ManageStudents from '../pages/ManageStudents';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLayout from '../components/AdminLayout';
import Student from '../pages/Student';
import ManageTeachers from '../pages/ManageTeachers';
import Teacher from '../pages/Teacher';
import ManageCourse from '../pages/ManageCourse';
import Course from '../pages/Course';


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
      },
      {
        path:"manageCourses",
        element:<ManageCourse/>
      },
      {
        path:"course/:courseId",
        element:<Course/>
      }
    ]
  }
]);

export default Router;
