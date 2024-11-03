import React, { useEffect } from 'react'
import { FaTimes } from 'react-icons/fa'
import { useState } from 'react';
import axios from 'axios';
const EditForm = ({onClose , student , onChange}) => {
      
    const[courseList,setCourseList] = useState([]);
    const[courses,setCourses] = useState([]);
    const formatDate = (isoDate) => {
        const date = new Date(isoDate);
        return date.toISOString().split("T")[0]; // Extracts the "yyyy-MM-dd" part
      };
    
      useEffect(() => {
        Promise.all([
            axios.get('http://localhost:3001/admin/getAllCourses'),
            axios.get(`http://localhost:3001/admin/getCourseIdForStudent/${student.id}`)
        ])
        .then(([allCoursesResponse, studentCoursesResponse]) => {
            setCourses(allCoursesResponse.data); 
            setCourseList(studentCoursesResponse.data); 
        })
        .catch((error) => {
            console.error('Error fetching courses:', error);
        });
    }, []);

    console.log("courses : " + courseList)

    const [firstName, setFirstName] = useState(student.first_name);
    const [lastName, setLastName] = useState(student.last_name);
    const [birthday, setBirthday] = useState(formatDate(student.birthday));
    const [gender, setGender] = useState(student.gender);
    const [address, setAddress] = useState(student.address);
    const [birthCertificate, setBirthCertificate] = useState(null);
    
   
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
            setProfileImage(URL.createObjectURL(file)); // Update the preview with selected image
        }
    };
        e.preventDefault();
      
        
        const studentData = {
          firstName,
          lastName,
          birthday,
          gender,
          address,
          birthCertificate: birthCertificate ,
          courseList
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
      
        console.log('Student Data:', student.id);
      
        try {
            const updateResponse = await axios.put(`http://localhost:3001/admin/updateStudent/${student.id}`, studentData);
            console.log('Student updated:', updateResponse.data);
        
            const deleteResponse = await axios.delete(`http://localhost:3001/admin/deleteStudentCourse`, {
                data: { studentId: student.id, courseList }
            });
            console.log('Deleted courses:', deleteResponse.data);
        
            const updateStudentCourseResponse = await axios.post(`http://localhost:3001/admin/createStudentCourseTable`, {
                studentId: student.id,
                courseList
            });

            console.log('updated Courses:', updateStudentCourseResponse.data);
            onChange();
            onClose();
        } catch (error) {
            console.error('Error updating Student or updating courses:', error);
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
          <h1 className="flex justify-center text-3xl">Edit Student</h1>
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
            <label>Birthday</label>
            <input
              type="date"
              className="input-field"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
            />
             {isErrorBirthday && (
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
          
          <div className='flex  gap-3 col-span-2'>
            <div className="flex flex-col gap-3">
            <label>Select Course</label>
            <select
                className="input-field"
                value=""
                onChange={(e) => {
                    if(!courseList.includes(e.target.value)){

                        setCourseList([...courseList, e.target.value])}

                    }
                }
                    
                   
            >
                <option value="">Select Course</option>
                {courses?.map((course, index) => (
                <option key={index} value={course.course_id}>
                    {course.course_id} {course.course_name}
                </option>
                ))}
            </select>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
                {courseList.map((course, index) => (
                    <button
                    type='button'
                    key={index}
                    onClick={() => {
                        setCourseList(courseList.filter((c) => c !== course)); // Filter out the clicked course
                    }}
                    className="flex items-center gap-2 border border-gray-300 rounded-lg px-2 py-1 bg-gray-100"
                    >
                    {course} <FaTimes size={14} /> 
                    </button>
                ))}
            </div>
            
           
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

export default EditForm