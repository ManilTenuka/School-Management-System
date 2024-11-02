// src/pages/ManageStudents.jsx
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaCopy, FaTrash , FaPlus , FaPen} from 'react-icons/fa';
import Search from '../components/Search';
import StudentForm from '../components/manageStudents/StudentForm';

const ManageStudents = () => {

    const [students, setStudents] = useState([]);
    const [error, setError] = useState(null);

    const [isModalOpen, setModelOpen] = useState(false);
  
    useEffect(() => {
      // Fetch students data from the backend
      axios.get('http://localhost:3001/admin/getAllStudents')
        .then((response) => {
          setStudents(response.data); 
          
        })
        .catch((error) => {
          console.error('Error fetching students:', error);
          setError('Failed to fetch students');
        });
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }

    console.log("students : " + students.student_id);
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
        { isModalOpen && (
          <StudentForm onClose={() => setModelOpen(false)}/>
        )
        }
        <div>
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                
                <th className="py-2 px-4 border-b">Student ID</th>
                <th className="py-2 px-4 border-b">First Name</th>
                <th className="py-2 px-4 border-b">Last Name</th>
                <th className="py-2 px-4 border-b">Age</th>
              
                <th className="py-2 px-4 border-b">Gender</th>
               
                <th className="py-2 px-4 border-b">Enrollment Date</th>
                <th className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {students.map((student,index)=>(
                    <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="py-2 px-4">{student.student_id}</td>
                        <td className="py-2 px-4">{student.first_name}</td>
                        <td className="py-2 px-4">{student.last_name}</td>
                        <td className="py-2 px-4">{student.age}</td>
                       
                        <td className="py-2 px-4">{student.gender}</td>
                      
                        <td className="py-2 px-4">{student.enrollment_date}</td>
                        <td className="py-2 px-4 text-blue-500 flex gap-2">
                            <button>  
                            <FaEdit size={18} title="Edit" />
                            </button>
                            <button>
                            <FaCopy size={18} title="Copy" />
                            </button>
                            <button>
                            <FaTrash size={18} title="Delete" />
                            </button>
                        </td>
                        </tr>
                
              )

                
              )}
             
            
            </tbody>
        </table>
        </div>
       

    </div>
  );
};

export default ManageStudents;
