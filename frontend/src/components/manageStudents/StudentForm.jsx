import React from 'react'
import { FaTimes } from 'react-icons/fa'

const StudentForm = ({onClose}) => {

    
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">

    <div className="bg-white p-4 rounded max-h-[80vh] overflow-y-auto hide-scrollbar ml-10">
   
      <div className='relative'>
      
        <div className='absolute top-0 right-0 p-2'>
        <button
            onClick={onClose}
            aria-label="Close"
            className="p-2 bg-gray-200 text-gray-600 rounded-full hover:bg-gray-300 "
            >
            <FaTimes size={18} />
        </button>
        </div>
        <div>
            
        </div>

      </div>
     
    

  
      <form className='relative mt-12 p-3 mb-10'>
 
      <div className='flex flex-col mb-5'>
            <h1 className='flex justify-center text-3xl '>Student Registration Form</h1>

        </div>
     
      <div className="grid grid-cols-2 gap-6 border border-gray-300 rounded-md p-4">
      
        <div className="flex flex-col gap-3">
            <label>First Name</label>
            <input type="text" placeholder="Enter First Name" className="input-field" />
        </div>


        <div className="flex flex-col gap-3">
            <label>Last Name</label>
            <input type="text" placeholder="Enter Last Name" className="input-field" />
        </div>

 
        <div className="flex flex-col gap-3">
            <label>Birthday</label>
            <input type="date" placeholder=" " className="input-field" />
        </div>


        <div className="flex flex-col gap-3">
            <label>Gender</label>
            <select className="input-field">
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            </select>
        </div>


        <div className="flex flex-col gap-3 col-span-2">
            <label>Address</label>
            <input type="text" placeholder="Enter Address" className="input-field" />
        </div>
         
        <div className="flex flex-col gap-3  col-span-2">
            <label>Birth Certificate Document</label>
            <input type="file" className="input-field" />
        </div>

        <div className="flex flex-col gap-3">
            <label>Enrollment Date</label>
            <input type="date" className="input-field" />
        </div>

      </div>


     

      
        <div>
          
       

       
     

        <div className="absolute right-5 pt-3">
            <button
                type="submit"
                className="btn"
            >
                Save
            </button>
        </div>
       
        </div>
      </form>
      </div>
   
    </div>
  
  )
}

export default StudentForm