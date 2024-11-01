// src/pages/ManageStudents.jsx
import React from 'react';

const ManageStudents = () => {
  return (
    <div className="flex flex-col justify-center py-4 items-center gap-5">
        <div>
        <h1 className="text-2xl font-semibold text-gray-800">Manage Students</h1>

        </div>
        <div>
        <table class="min-w-full bg-white border border-gray-300">
            <thead>
                <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                
                <th class="py-2 px-4 border-b">Student ID</th>
                <th class="py-2 px-4 border-b">First Name</th>
                <th class="py-2 px-4 border-b">Last Name</th>
                <th class="py-2 px-4 border-b">Age</th>
                <th class="py-2 px-4 border-b">Address</th>
                <th class="py-2 px-4 border-b">Gender</th>
                <th class="py-2 px-4 border-b">Birth Certificate</th>
                <th class="py-2 px-4 border-b">Enrollment Date</th>
                <th class="py-2 px-4 border-b">Actions</th>
                </tr>
            </thead>
            <tbody class="text-gray-700 text-sm">
            
                <tr class="border-b hover:bg-gray-100">
               
                <td class="py-2 px-4">STU1001</td>
                <td class="py-2 px-4">Alice</td>
                <td class="py-2 px-4">Johnson</td>
                <td class="py-2 px-4">19</td>
                <td class="py-2 px-4">123 Apple St, Springfield</td>
                <td class="py-2 px-4">Female</td>
                <td class="py-2 px-4">
                    <a href="/docs/birth_certificates/Alice_Johnson.pdf" class="text-blue-500 underline">View Document</a>
                </td>
                <td class="py-2 px-4">2024-11-01</td>
                </tr>
                <td class="py-2 px-4 text-blue-500 flex gap-2">
                    <button>Edit</button>
                    <button>Copy</button>
                    <button>Delete</button>
                </td>
            
            </tbody>
        </table>
        </div>
       

    </div>
  );
};

export default ManageStudents;
