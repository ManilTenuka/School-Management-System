import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {FaEye , FaChevronLeft , FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Teacher = () => {
  const { teacherId } = useParams();
  const [teacher, setTeacher] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage , setCurrentPage] = useState(0);
  const navigate = useNavigate();
  console.log("teacherId:" + teacherId);
  useEffect(() => {
    const getTeacherDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/admin/getTeacherById/${teacherId}`);
        console.log("successful");
        return response.data;
      } catch (error) {
        console.error("Error fetching teacher details:", error);
        setError('Failed to load teacher details');
      }
    };

    console.log("teacherId:" + teacherId
      
    );

    const getCourseByTeacherID = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/admin/getCoursesByteacherId/${teacherId}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching courses for the teacher:", error);
        setError('Failed to load courses');
      }
    };

    Promise.all([getTeacherDetails(), getCourseByTeacherID()])
      .then(([teacherData, coursesData]) => {
        setTeacher(teacherData);
        setCourses(coursesData);
        setLoading(false);
      })
      .catch(error => {
        setLoading(false);
        setError('Failed to load data');
      });
  }, [teacherId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const calculateAge = (birthday) => {
    const birthDate = new Date(birthday);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

  return (
    <div>
      
      <div className='flex justify-center gap-3'>
       
      <div className="flex justify-center gap-4">
  
      <div className="w-60 h-60 p-6 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col justify-center text-center space-y-3">
        <div className="text-sm text-gray-700">
          <span className="font-medium text-gray-600">Name: </span>
          {teacher?.first_name} {teacher?.last_name}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium text-gray-600">Address: </span>
          {teacher?.address || 'N/A'}
        </div>
        <div className="text-sm text-gray-700">
          <span className="font-medium text-gray-600">Age: </span>
          {calculateAge(teacher?.birthday)}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium text-gray-600">Gender: </span>
          {teacher?.gender || 'N/A'}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium text-gray-600">Enrollment Date: </span>
          {teacher?.enrollment_date ? teacher.enrollment_date.split('T')[0] : 'N/A'}
        </div>
      </div>

      <div className="w-60 h-60 p-6 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold text-gray-800">Total Courses Enrolled</h2>
        <p className="mt-4 text-3xl font-bold text-blue-600">{courses?.length || 0}</p>
      </div>
      </div>
 
    </div>
    <h2 className="text-xl font-semibold mb-2 mt-5 flex justify-center">Courses Enrolled By Student :</h2>
    {courses?.length>0 && (

      <div className='flex gap-4 justify-center'>
      {currentPage - 4>=0 && (

          <button  className="text-gray-500 hover:text-gray-700" onClick={()=> setCurrentPage(currentPage-4)}>
          <FaChevronLeft size={24} />
          </button>

      )}

      {courses.slice(currentPage, currentPage+4).map((course) => (
          <div className="w-64 h-64 p-4 bg-white border border-gray-300 rounded-lg flex flex-col items-center justify-center text-center mt-5 gap-2 ring-1 ring-blue-300 ring-offset-2 ring-offset-white">

          <div className="flex-grow mt-1">
            <p className="text-gray-900 text-lg font-bold">{course.course_name || 'N/A'}</p>
          </div>
        
          <div className="flex-grow mt-3">
            <p className="text-gray-700 text-sm font-medium px-2 text-center">{course?.course_description || 'No description available'}</p>
          </div>
        
          <div className='mt-auto'> 
            <button onClick={() => navigate(`/admin/course/${course.course_id}`)} className="text-blue-500 hover:text-blue-700">
              <FaEye size={18} title="View" />
            </button>
          </div>
        
        </div>
        
        ))}
        {currentPage+3<courses?.length && (
          <button  className="text-gray-500 hover:text-gray-700" onClick={()=> setCurrentPage(currentPage+4)}>
            <FaChevronRight size={24} />
          </button>

        )}
          

        </div>
    )}
   
    </div>
  );
};

export default Teacher;
