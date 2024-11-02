import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaCopy, FaTrash , FaPlus , FaPen , FaEye} from 'react-icons/fa';
import Search from '../components/Search';
import { useNavigate } from 'react-router-dom';
import EditForm from '../components/manageStudents/EditForm';
import TeacherForm from '../components/manageTeacher/TeacherForm';
import EditTeacherForm from '../components/manageTeacher/EditTeacherForm';

const ManageTeachers = () => {
    const navigate = useNavigate();
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState(null);

    const [isModalOpen, setModelOpen] = useState(false);
    const [isEditFormOpen , setEditFormOpen] = useState([false,null]);
    const [changed, setChanged] = useState(false);
    useEffect(() => {
      
      axios.get('http://localhost:3001/admin/getAllTeachers')
        .then((response) => {
          setTeachers(response.data); 
          
        })
        .catch((error) => {
          console.error('Error fetching teachers:', error);
          setError('Failed to fetch teachers');
        });

        

        setChanged(false)
    }, [changed]);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
    
    //to substract the birthday from current date
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

   

    const handleDelete = async(teacherId)=>{

      try {
        const response = await axios.delete(`http://localhost:3001/admin/deleteTeacher/${teacherId}`);
        console.log(response.data.message); 
      
      } catch (error) {
          console.error('Error deleting Teacher:', error);
      }


    }
  return (
   
    <div className="flex flex-col justify-center py-4 items-center gap-5">
        <div>
        <div className='mt-10 flex gap-12'>
        <button className="flex flex-col items-center justify-center w-32 h-32  bg-blue-900 text-white rounded-md hover:bg-blue-700 transition duration-200" onClick={()=>{

                 setModelOpen(isModalOpen==false?true:false)
        }
        }>
            <FaPen size={24} /> 
            <span className="mt-2 text-lg">Add Teacher</span>
        </button>
        <div className='flex items-center'>
          <Search></Search>
        </div>
        </div>
        
        </div>
        {isModalOpen && (
            <TeacherForm onClose={() => setModelOpen(false)} onChange = {()=>{setChanged(true)}} />
          )}
        {isEditFormOpen[0] && (
          <EditTeacherForm onClose={() => setEditFormOpen([false,null])} teacher = {isEditFormOpen[1]} onChange = {()=>(setChanged(true))} />
        )}

         
        <div>
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                
                <th className="py-2 px-4 border-b">Teacher ID</th>
                <th className="py-2 px-4 border-b"> Name</th>
                <th className="py-2 px-4 border-b">Age</th>
              
                <th className="py-2 px-4 border-b">Gender</th>
               
                <th className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {teachers.map((teacher,index)=>(
                    <tr key={index} className="border-b hover:bg-gray-100">
                        <td className="flex py-2 px-4 justify-center">{teacher.teacher_id}</td>
                        <td className="py-2 px-4">{teacher.first_name} {teacher.last_name}</td>
                        
                        <td className="flex justify-center py-2 px-4">{calculateAge(teacher.birthday)}</td>
                       
                        <td className="py-2 px-4">{teacher.gender}</td>
                      
                        
                        <td className="py-2 px-4 text-blue-500 flex gap-2">
                            <button onClick={()=>{
                              setEditFormOpen([isEditFormOpen[0] == true ? false : true,teacher]);
                            }}>  
                            <FaEdit size={18} title="Edit" />
                            </button>
                            <button>
                            <FaEye size={18} title="View" onClick={()=>{
                               navigate(`/admin/teacher/${teacher.id}`)         
                             }}/>
                            </button>
                            <button onClick={() => {
                                    const confirmation = window.confirm("Do you really want to delete teacher ID: " + teacher.teacher_id + "?");
                                    if (confirmation) {
                                        handleDelete(teacher.teacher_id); 
                                    }
                                    setChanged(true)
                            }}>

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

export default ManageTeachers;
