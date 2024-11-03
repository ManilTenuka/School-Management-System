import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight , FaEye } from 'react-icons/fa';
import axios from 'axios';

const Student = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [currentPage , setCurrentPage] = useState(0);

  const navigate = useNavigate();
  
  // Fetch both student details and courses on component mount
  useEffect(() => {
    const getStudentDetails = async () => {
      return axios.get(`http://localhost:3001/admin/viewStudent/${studentId}`)
        .then(response => response.data)
        .catch(error => {
          console.error("Error fetching student details:", error);
          throw error;
        });
    };

    const getCourseByStudentId = async () => {
      return axios.get(`http://localhost:3001/admin/getCourseByStudentId/${studentId}`)
        .then(response => response.data)
        .catch(error => {
          console.error("Error fetching courses for the student:", error);
          throw error;
        });
    };

    Promise.all([getStudentDetails(), getCourseByStudentId()])
      .then(([studentData, coursesData]) => {
        setStudent(studentData); 
        setCourses(coursesData); 
      })
      .catch(error => {
        console.error("Error fetching student or course data:", error);
      });
  }, [studentId]);

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
          {student?.first_name} {student?.last_name}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium text-gray-600">Age: </span>
          {calculateAge(student?.birthday)}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium text-gray-600">Address: </span>
          {student?.address || 'N/A'}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium text-gray-600">Gender: </span>
          {student?.gender || 'N/A'}
        </div>

        <div className="text-sm text-gray-700">
          <span className="font-medium text-gray-600">Enrollment Date: </span>
          {student?.enrollment_date ? student.enrollment_date.split('T')[0] : 'N/A'}
        </div>
      </div>

      {/* Courses Enrolled Box */}
      <div className="w-60 h-60 p-6 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
        <h2 className="text-xl font-semibold text-gray-800">Total Courses Enrolled</h2>
        <p className="mt-4 text-3xl font-bold text-blue-600">{courses?.length || 0}</p>
      </div>
      </div>
 
    </div>
    <h2 className="text-xl font-semibold mb-2 mt-5 flex justify-center">Courses Enrolled By Student : </h2>
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
    </div>
  );
};

export default Student;
