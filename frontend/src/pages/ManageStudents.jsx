// src/pages/ManageStudents.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaCopy, FaTrash , FaPlus , FaPen , FaEye} from 'react-icons/fa';
import Search from '../components/Search';
import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/manageStudents/StudentForm';
import EditForm from '../components/manageStudents/EditForm';

const ManageStudents = () => {
    const navigate = useNavigate();
    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    const [isModalOpen, setModelOpen] = useState(false);
    const [isEditFormOpen , setEditFormOpen] = useState([false,null]);
    const [changed, setChanged] = useState(false);
    useEffect(() => {
      
      axios.get('http://localhost:3001/admin/getAllStudents')
        .then((response) => {
          setStudents(response.data); 
          
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
          setError('Failed to fetch students');
        });

        setChanged(false)
    }, [changed]);
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    console.log("students : " + students.student_id);

    const handleDelete = async(studentId)=>{

      try {
        const response = await axios.delete(`http://localhost:3001/admin/deleteStudent/${studentId}`);
        console.log(response.data.message); 
      
      } catch (error) {
          console.error('Error deleting student:', error);
      }


    }

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
   
    <div className="flex flex-col justify-center py-4 items-center gap-5">
        <div>
        <div className='mt-10 flex gap-12'>
        <button className="flex flex-col items-center justify-center w-32 h-32  bg-blue-900 text-white rounded-md hover:bg-blue-700 transition duration-200" onClick={()=>{

                 setModelOpen(isModalOpen==false?true:false)
        }
        }>
            <FaPen size={24} /> 
            <span className="mt-2 text-lg">Add Student</span>
        </button>
        <div className='flex items-center'>
          <Search></Search>
        </div>
        </div>
        
        </div>
        {isModalOpen && (
            <StudentForm onClose={() => setModelOpen(false)} onChange = {()=> {setChanged(true)}} />
          )}
        {isEditFormOpen[0] && (
          <EditForm onClose={() => setEditFormOpen([false,null])} student = {isEditFormOpen[1]} />
        )}

         
        <div>
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal ">
                
                <th className="py-2 px-4 border-b">Student ID</th>
                <th className="py-2 px-4 border-b"> Name</th>
                <th className="py-2 px-4 border-b">Age</th>
              
                <th className="py-2 px-4 border-b">Gender</th>
               
                <th className="py-2 px-4 border-b">Enrollment Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
            {students.map((student, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-2 px-4 text-center">{student.id}</td>
                <td className="py-2 px-4 text-center">{student.first_name} {student.last_name}</td>
                <td className="py-2 px-4 text-center">{calculateAge(student.birthday)}</td>
                <td className="py-2 px-4 text-center">{student.gender}</td>
                <td className="py-2 px-4 text-center">{student.enrollment_date.split('T')[0]}</td>
                <td className="py-2 px-4 text-center text-blue-500 flex gap-2 justify-center">
                  <button onClick={() => setEditFormOpen([isEditFormOpen[0] === true ? false : true, student])}>
                    <FaEdit size={18} title="Edit" />
                  </button>
                  <button onClick={() => navigate(`/admin/student/${student.id}`)}>
                    <FaEye size={18} title="View" />
                  </button>
                  <button onClick={() => {
                    const confirmation = window.confirm("Do you really want to delete student ID: " + student.id + "?");
                    if (confirmation) {
                      handleDelete(student.id);
                    }
                    setChanged(true);
                  }}>
                    <FaTrash size={18} title="Delete" />
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

export default ManageStudents;
