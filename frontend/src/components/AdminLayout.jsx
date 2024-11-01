// src/components/AdminLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import NavigationBar from './NavigationBar';
import TopBar from './TopBar';

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Navigation bar */}
      <div className="fixed w-1/6 bg-gray-800 text-white p-4">
        <NavigationBar />
      </div>

      {/* Right side - Main content */}
      <div className="w-5/6 p-6 ml-[16.666%]">
        <div>
            <TopBar></TopBar>
        </div>
        <div className='mt-10'>
        <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
