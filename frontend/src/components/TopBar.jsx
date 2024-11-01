import { Input } from 'postcss'
import React from 'react'
import Search from './Search'
import logo from '../assests/1.avif'
const TopBar = () => {
  return (
    <div className='relative flex justify-center'>
        <div>
        <Search/>
        </div>
     
        <div className="absolute right-10">
        <img
            src={logo}
            alt="User Avatar"
            className="w-12 h-12 rounded-full border border-gray-200"
        />
        </div>

    </div>
  )
}

export default TopBar