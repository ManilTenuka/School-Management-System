import React from 'react'
import { useParams } from 'react-router-dom'
const Student = () => {
    const {studentId} = useParams();
  return (
    <div>
          {studentId}
    </div>
    
  )
}

export default Student