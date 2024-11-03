import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const PieChart = ({ students = [] }) => { 
  const [ageData, setAgeData] = useState({});
  const [genderData, setGenderData] = useState({});

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

  useEffect(() => {
    if (students && students.length > 0) { 
        const ageGroups = { '5-7': 0, '8-10': 0, '11-13': 0, '14-16': 0, '17+': 0 };
        const genderCounts = { Male: 0, Female: 0, Other: 0 };
        
        students.forEach((student) => {
          const age = calculateAge(student.birthday);
          if (age >= 5 && age <= 7) ageGroups['5-7'] += 1;
          else if (age >= 8 && age <= 10) ageGroups['8-10'] += 1;
          else if (age >= 11 && age <= 13) ageGroups['11-13'] += 1;
          else if (age >= 14 && age <= 16) ageGroups['14-16'] += 1;
          else if (age >= 17 ) ageGroups['17+'] += 1;
        
          if (student.gender === 'male') genderCounts.Male += 1;
          else if (student.gender === 'female') genderCounts.Female += 1;
          else genderCounts.Other += 1;
        });
        

      setAgeData({
        labels: Object.keys(ageGroups),
        datasets: [
          {
            data: Object.values(ageGroups),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          },
        ],
      });

      setGenderData({
        labels: Object.keys(genderCounts),
        datasets: [
          {
            data: Object.values(genderCounts),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          },
        ],
      });
    }
  }, [students]);

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center justify-center">
      <div className="w-80 h-80 p-6 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Age Distribution</h2>
        {ageData.labels ? <Pie data={ageData} options={{ maintainAspectRatio: false }} /> : <p>Loading chart...</p>}
      </div>

      <div className="w-80 h-80 p-6 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center justify-center text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Student Gender Distribution</h2>
        {genderData.labels ? <Pie data={genderData} options={{ maintainAspectRatio: false }} /> : <p>Loading chart...</p>}
      </div>
    </div>
  );
};

export default PieChart;
