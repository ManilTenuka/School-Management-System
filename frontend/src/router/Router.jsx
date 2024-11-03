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
import Login from '../pages/Login';
import ProtectedRoute from '../pages/authentication/ProtectedRoute';

const Router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ), // Protect the entire AdminLayout
    children: [
      {
        path: 'adminDashboard',
        element: (
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: 'manageStudents',
        element: (
          <ProtectedRoute>
            <ManageStudents />
          </ProtectedRoute>
        ),
      },
      {
        path: 'student/:studentId',
        element: (
          <ProtectedRoute>
            <Student />
          </ProtectedRoute>
        ),
      },
      {
        path: 'manageTeachers',
        element: (
          <ProtectedRoute>
            <ManageTeachers />
          </ProtectedRoute>
        ),
      },
      {
        path: 'teacher/:teacherId',
        element: (
          <ProtectedRoute>
            <Teacher />
          </ProtectedRoute>
        ),
      },
      {
        path: 'manageCourses',
        element: (
          <ProtectedRoute>
            <ManageCourse />
          </ProtectedRoute>
        ),
      },
      {
        path: 'course/:courseId',
        element: (
          <ProtectedRoute>
            <Course />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default Router;
