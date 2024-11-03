// src/components/NavigationBar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { MdDashboard, MdSchool, MdPerson, MdClass, MdSchedule   } from 'react-icons/md';
import { IoIosLogOut } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../pages/authentication/AuthProvider';

const NavigationBar = () => {

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate('/'); 
  };

  return (
    <nav className="flex flex-col justify-between items-center h-screen p-4 bg-gray-800 text-white">
    <div className="flex flex-col gap-10 items-center mt-20">
      <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 hover:text-gray-200 transition-all duration-200 ease-in-out">
        <MdDashboard size={20} />
        <Link to="adminDashboard">Admin Dashboard</Link>
      </div>
      
      <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 hover:text-gray-200 transition-all duration-200 ease-in-out">
        <MdSchool size={20} />
        <Link to="manageStudents">Manage Students</Link>
      </div>
      
      <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 hover:text-gray-200 transition-all duration-200 ease-in-out">
        <MdPerson size={20} />
        <Link to="manageTeachers">Manage Teachers</Link>
      </div>
      
      <div className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 hover:text-gray-200 transition-all duration-200 ease-in-out">
        <MdClass size={20} />
        <Link to="manageCourses">Manage Courses</Link>
      </div>
      
      
      
    </div>
     
    <div className="flex items-center gap-2 cursor-pointer mb-8">
        <IoIosLogOut size={20} />
        <Link  onClick={handleLogout}>Logout</Link>
    </div>
  </nav>
  
  );
};

export default NavigationBar;
