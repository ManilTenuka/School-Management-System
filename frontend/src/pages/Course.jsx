import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaEdit, FaCopy, FaTrash, FaPlus, FaPen, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';


const Course = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [courses, setCourseInfo] = useState([]); // State to store course details
  const [teachers, setTeachers] = useState([]);
  const { courseId } = useParams();

  const getStudentInfoByCourseId = async () => {
    return axios.get(`http://localhost:3001/admin/getStudentInfo/${courseId}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching students for the course:", error);
        throw error;
      });
  };

  const getCourseInfoById = async () => {
    return axios.get(`http://localhost:3001/admin/getCourseById/${courseId}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching course details:", error);
        throw error;
      });
  };

  const getTeacherInfoById = async () => {
    return axios.get(`http://localhost:3001/admin/getTeacherInfo/${courseId}`)
      .then(response => response.data)
      .catch(error => {
        console.error("Error fetching course details:", error);
        throw error;
      });
  };

  useEffect(() => {
    Promise.all([getStudentInfoByCourseId(), getCourseInfoById() , getTeacherInfoById()])
      .then(([studentsData, courseData, teacherData]) => {
        setStudents(studentsData); 
        setCourseInfo(courseData);
        setTeachers(teacherData);
      })
      .catch(error => {
        console.error("Error fetching course or student data:", error);
      });
  }, [courseId]);
   console.log(teachers)
  return ( 
    <div>
    
      <div className='flex justify-center gap-3'>
      <div className="min-w-[20rem] min-h-[20rem] max-w-48 p-6 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
        <div className="mt-2">
        <p className="text-gray-900 text-2xl font-bold mt-1">Course Name : </p>
          <p className="text-gray-900 text-2xl font-bold mt-1">{courses?.course_name || 'N/A'}</p>
        </div>

        <div className="mt-4">
          <p className="text-gray-700 text-md font-medium mt-1 px-2 text-center">{courses?.course_description || 'No description available'}</p>
        </div>
      </div>


      <div className="min-w-[20rem] min-h-[20rem] max-w-48 p-6 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold text-gray-800">Total Students Enrolled : </h2>
        <p className="mt-4 text-3xl font-bold text-blue-600">{students.length}</p>

        <h2 className="text-xl font-semibold text-gray-800 mt-10">Total Teachers Enrolled : </h2>
        <p className="mt-4 text-3xl font-bold text-blue-600">{teachers.length}</p>
      </div>

      
      </div>

     

      <div className="mt-10 flex flex-col items-center">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enrolled Students</h2>
  <table className="w-full max-w-2xl bg-white border border-gray-300 shadow-lg rounded-lg">
    <thead>
      <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
        <th className="py-2 px-4 border-b">Student ID</th>
        <th className="py-2 px-4 border-b">Name</th>
        <th className="py-2 px-4 border-b">Actions</th>
      </tr>
    </thead>
    <tbody className="text-gray-700 text-sm">
      {students.map((student, index) => (
        <tr key={index} className="border-b hover:bg-gray-100">
          <td className="py-2 px-4 text-center">{student.id}</td>
          <td className="py-2 px-4 text-center">{student.first_name} {student.last_name}</td>
          <td className="py-2 px-4 text-center flex gap-2 justify-center">
            <button onClick={() => navigate(`/admin/student/${student.id}`)} className="text-blue-500 hover:text-blue-700">
              <FaEye size={18} title="View" />
            </button>
            
          </td>
        </tr>
      ))}
    </tbody>
  </table>
      </div>

      <div className="mt-10 flex flex-col items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enrolled Teachers</h2>
          <table className="w-full max-w-2xl bg-white border border-gray-300 shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-2 px-4 border-b">Student ID</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {teachers.map((teacher, index) => (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="py-2 px-4 text-center">{teacher.teacher_id}</td>
                  <td className="py-2 px-4 text-center">{teacher.first_name} {teacher.last_name}</td>
                  <td className="py-2 px-4 text-center flex gap-2 justify-center">
                    <button onClick={() => navigate(`/admin/teacher/${teacher.teacher_id}`)} className="text-blue-500 hover:text-blue-700">
                      <FaEye size={18} title="View" />
                    </button>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>

      



     
    </div>
  );
};

export default Course;
