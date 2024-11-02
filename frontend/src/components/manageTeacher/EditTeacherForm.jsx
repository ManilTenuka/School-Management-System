import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useState } from 'react';
import axios from 'axios';
const EditTeacherForm = ({onClose , teacher , onChange}) => {

    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().split("T")[0]; // Extracts the "yyyy-MM-dd" part
      };
    

    const [firstName, setFirstName] = useState(teacher.first_name);
    const [lastName, setLastName] = useState(teacher.last_name);
    const [birthday, setBirthday] = useState(formatDate(teacher.birthday));
    const [gender, setGender] = useState(teacher.gender);
    const [address, setAddress] = useState(teacher.address);
    
   
    const [isErrorFirstName, setIsErrorFirstName] = useState(false);
    const [isErrorLastName, setIsErrorLastName] = useState(false);
    const [isErrorBirthday, setIsErrorBirthday] = useState(false);
    const [isErrorGender, setIsErrorGender] = useState(false);
    const [isErrorAddress, setIsErrorAddress] = useState(false);

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
      
        
        const TeacherData = {
          firstName,
          lastName,
          birthday,
          gender,
          address,
         
        };
        if (!firstName) {
            setIsErrorFirstName(true);
         
          } else {
            setIsErrorFirstName(false);
          }
          
          if (!lastName) {
            setIsErrorLastName(true);
            
          } else {
            setIsErrorLastName(false);
          }
          
          if (!birthday) {
            setIsErrorBirthday(true);
           
          } else {
            setIsErrorBirthday(false);
          }
          
          if (!gender) {
            setIsErrorGender(true);
           
          } else {
            setIsErrorGender(false);
          }
          
          if (!address) {
            setIsErrorAddress(true);
           
          } else {
            setIsErrorAddress(false);
          }

          if(!firstName || !lastName || !birthday || !address || !gender){
            return
          }
      
       
      
        try {
            const response = await axios.put(`http://localhost:3001/admin/updateTeacher/${teacher.teacher_id}`, TeacherData);
            console.log('teacher updated:', response.data);
            onChange();
            onClose(); 
          } catch (error) {
            console.error('Error updating teacher:', error);
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
          <h1 className="flex justify-center text-3xl">Edit Teacher</h1>
        </div>
        

        <div className="grid grid-cols-2 gap-6 border border-gray-300 rounded-md p-4">
          <div className="flex flex-col gap-3">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter First Name"
              className="input-field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
             {isErrorFirstName && (
            <h1 className='text-red-600'>This field is mandatory</h1>
        )}
            
          </div>

          <div className="flex flex-col gap-3">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter Last Name"
              className="input-field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            {isErrorLastName && (
                <h1 className='text-red-600'>This field is mandatory</h1>
            )}
          </div>

          

          <div className="flex flex-col gap-3">
            <label>Gender</label>
            <select
              className="input-field"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {isErrorGender && (
            <h1 className='text-red-600'>This field is mandatory</h1>
            )}
          </div>

          <div className="flex flex-col gap-3 col-span-2">
            <label>Address</label>
            <input
              type="text"
              placeholder="Enter Address"
              className="input-field"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
             {isErrorAddress && (
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

export default EditTeacherForm