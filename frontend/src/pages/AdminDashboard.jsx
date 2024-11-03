import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EnrollmentChart from '../components/chart.js/EnrollmentChart';
import PieChart from '../components/chart.js/PieChart';

const AdminDashboard = () => {

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [students, setStudents] = useState([])
  const [teachers, setTeachers] = useState([])
  useEffect(() => {
    const getAllCounts = async () => {
      try {
        const [studentsResponse, teachersResponse, coursesResponse] = await Promise.all([
          axios.get('http://localhost:3001/admin/getAllStudents'),
          axios.get('http://localhost:3001/admin/getAllTeachers'),
          axios.get('http://localhost:3001/admin/getAllCourses'),
        ]);

        setTotalStudents(studentsResponse.data.length);
        setTotalTeachers(teachersResponse.data.length);
        setTotalCourses(coursesResponse.data.length);
        setStudents(studentsResponse.data)
        setTeachers(teachersResponse.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getAllCounts();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8 text-center ">Admin Dashboard</h1>
      
      <div className="flex justify-evenly gap-4">
        <div className="w-48 h-48 p-6 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold text-gray-800">Total Students</h2>
          <p className="mt-4 text-3xl font-bold text-blue-600">{totalStudents}</p>
        </div>

        <div className="w-48 h-48 p-6 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold text-gray-800">Total Teachers</h2>
          <p className="mt-4 text-3xl font-bold text-blue-600">{totalTeachers}</p>
        </div>

      
        <div className="w-48 h-48 p-6 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
          <h2 className="text-xl font-semibold text-gray-800">Total Courses</h2>
          <p className="mt-4 text-3xl font-bold text-blue-600">{totalCourses}</p>
        </div>
      </div>

      <div className="flex justify-center gap-6 pt-8">
        <EnrollmentChart type={students} s="s" />
        <EnrollmentChart type={teachers} s="t" />
      </div>
      <div className='flex justify-center gap-6 pt-10'>
      <PieChart students={students} width="20rem" height="25rem" />
      </div>

    </div>
  );
}

export default AdminDashboard;
