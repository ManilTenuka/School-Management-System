import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useState } from 'react';
import axios from 'axios';
const CourseForm = ({onClose , onChange}) => {

    const getTodayDate = () => { 
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
      };
    

    const [courseName, setCourseName] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
 
    
   
    const [isErrorCourseName, setIsErrorCourseName] = useState(false);
    const [isErrorCourseDescription, setIsErrorCourseDescription] = useState(false);
   
    const [profileImage, setProfileImage] = useState(null); 

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); 
        }
    };


    const handleSubmit = async (e) => {
       

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(URL.createObjectURL(file)); 
        }
    };
        e.preventDefault();
      
        
        const courseData = {
          courseName,
          courseDescription
        };
        if (!courseName) {
            setIsErrorCourseName(true);
         
          } else {
            setIsErrorCourseName(false);
          }
          
          if (!courseDescription) {
            setIsErrorCourseDescription(true);
            
          } else {
            setIsErrorCourseDescription(false);
          }
          
         
          
          

          if(!courseName|| !courseDescription){
            return
          }
      
        console.log('Student Data:', courseData);
      
        try {
          const response = await axios.post('http://localhost:3001/admin/createCourse', courseData);
          console.log('Student created:', response.data);
          onChange();
          onClose();
        } catch (error) {
          console.error('Error creating student:', error);
        }
        
      };

  
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
    <div className="bg-white p-4 rounded max-h-[80vh]  ml-10 overflow-y-auto">
      <div className="relative">
        <div className="absolute top-0 right-0 p-2">
          <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300"
          >
            <FaTimes size={18} />
          </button>
        </div>
       
      </div>

      <form onSubmit={handleSubmit} className="relative mt-12 p-3 mb-10  hide-scrollbar">
        <div className="flex flex-col mb-5">
          <h1 className="flex justify-center text-3xl">Course Registration Form</h1>
        </div>
        

        <div className="grid grid-cols-2 gap-6 border border-gray-300 rounded-md p-4">
          <div className="flex flex-col gap-3 col-span-2">
            <label>Course Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="input-field"
              value={courseName}
              onChange={(e) => setCourseName(e.target.value)}
            />
             {isErrorCourseName && (
            <h1 className='text-red-600'>This field is mandatory</h1>
        )}
            
          </div>

          <div className="flex flex-col gap-3 col-span-2">
            <label>Course Description</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="input-field"
              value={courseDescription}
              onChange={(e) => setCourseDescription(e.target.value)}
            />

            {isErrorCourseDescription && (
                <h1 className='text-red-600'>This field is mandatory</h1>
            )}
          </div>

        </div>

        <div className="absolute right-5 pt-3">
          <button type="submit" className="btn">
            Save
          </button>
        </div>
      </form>
    </div>
  </div>
);
}

export default CourseForm