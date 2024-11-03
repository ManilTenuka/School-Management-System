import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const EnrollmentChart = ({ type = [], s, width = '100%', height = '300px' }) => {
    
  const [chartData, setChartData] = useState({});
  
  useEffect(() => {
    if (type && type.length > 0) {
      const enrollmentCounts = Array(12).fill(0);
      const currentDate = new Date();

      type.forEach((student) => {
        const enrollmentDate = new Date(student.enrollment_date);
        const monthsAgo =
          currentDate.getMonth() -
          enrollmentDate.getMonth() +
          12 * (currentDate.getFullYear() - enrollmentDate.getFullYear());

        if (monthsAgo >= 0 && monthsAgo < 12) {
          enrollmentCounts[11 - monthsAgo] += 1;
        }
      });

      const labels = Array.from({ length: 12 }, (_, i) => {
        const monthDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 11 + i);
        return monthDate.toLocaleString('default', { month: 'short' });
      });

      setChartData({
        labels,
        datasets: [
          {
            label: 'Enrollments',
            data: enrollmentCounts,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
            tension: 0.3,
          },
        ],
      });
    }
  }, [type]);

  return (
    <div
  className="p-4 bg-white border border-gray-300 shadow-lg rounded-lg flex flex-col items-center"
  style={{ width, height }}
>
  <h2 className="text-md font-semibold text-gray-800 mb-2 text-center">
    Enrollments of {s === 's' ? 'Students' : 'Teachers'} in the Last 12 Months
  </h2>
  {chartData.labels ? (
    <Line
      data={chartData}
      options={{
        maintainAspectRatio: false,
        elements: {
          line: {
            borderWidth: 1.5, 
          },
          point: {
            radius: 2, 
          },
        },
        plugins: {
          legend: {
            labels: {
              font: {
                size: 10, 
              },
            },
          },
        },
      }}
      height={200} 
    />
  ) : (
    <p className="text-sm">Loading chart...</p>
  )}
</div>

  );
};

export default EnrollmentChart;
