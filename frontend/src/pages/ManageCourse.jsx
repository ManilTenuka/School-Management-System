import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaCopy, FaTrash , FaPlus , FaPen , FaEye} from 'react-icons/fa';
import Search from '../components/Search';
import { useNavigate } from 'react-router-dom';
import CourseForm from '../components/manageCourses/CourseForm';
import EditCourseForm from '../components/manageCourses/EditCourseForm';

const ManageCourse = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    const [isModalOpen, setModelOpen] = useState(false);
    const [isEditFormOpen , setEditFormOpen] = useState([false,null]);
    const [changed, setChanged] = useState(false);
    useEffect(() => {
      
      axios.get('http://localhost:3001/admin/getAllCourses')
        .then((response) => {
          setCourses(response.data); 
          
        })
        .catch((error) => {
          console.error('Error fetching courses:', error);
          setError('Failed to fetch courses');
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

   

    const handleDelete = async(courseId)=>{

      try {
        const response = await axios.delete(`http://localhost:3001/admin/deleteCourse/${courseId}`);
        console.log(response.data.message); 
      
      } catch (error) {
          console.error('Error deleting Course:', error);
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
            <span className="mt-2 text-lg">Add Course</span>
        </button>
        <div className='flex items-center'>
          <Search></Search>
        </div>
        </div>
        
        </div>
        {isModalOpen && (
            <CourseForm onClose={() => setModelOpen(false)} onChange={()=> setChanged(true)}/>
          )}
        {isEditFormOpen[0] && (
          <EditCourseForm onClose={() => setEditFormOpen([false,null])} course = {isEditFormOpen[1]} onChange={()=>setChanged(true)} />
        )}

         
        <div>
        <table className="min-w-full bg-white border border-gray-300">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                
                <th className="py-2 px-4 border-b">Course ID</th>
                <th className="py-2 px-4 border-b">Course Name</th>
                <th className="py-2 px-4 border-b">Course Description</th>
                <th className="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {courses.map((course,index)=>(
                    <tr key={index} className="border-b hover:bg-gray-100 text-center">
                        <td className="py-2 px-4 text-center ">{course.course_id}</td>
                        <td className="py-2 px-4 text-center">{course.course_name}</td>
                        
                        <td className=" py-2 px-4 max-w-xs break-words text-center">{course.course_description}</td>
                        
                        <td className="py-2 px-4 text-blue-500 flex gap-2 text-center">
                            <button onClick={()=>{
                              setEditFormOpen([isEditFormOpen[0] == true ? false : true,course]);
                            }}>  
                            <FaEdit size={18} title="Edit" />
                            </button>
                            <button>
                            <FaEye size={18} title="View" onClick={()=>{
                               navigate(`/admin/course/${course.id}`)         
                             }}/>
                            </button>
                            <button onClick={() => {
                                    const confirmation = window.confirm("Do you really want to delete course ID: " + course.course_id + "?");
                                    if (confirmation) {
                                        handleDelete(course.course_id); 
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

export default ManageCourse;
