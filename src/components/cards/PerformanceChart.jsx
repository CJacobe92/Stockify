import React, { useEffect } from 'react'
import Chart from 'chart.js/auto';

const PerformanceChart = () => {
  useEffect(() => {
    // Create a new Chart instance
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line', // Replace with the desired chart type
      data: {
        labels: ['Sun','Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [
          {
            label: 'Account Performance',
            data: [900, 901, 905, 903, 903, 940, 1000],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true, // Set responsive to true
        maintainAspectRatio: false, // Optionally, set maintainAspectRatio to false
      },
    });

    // Clean up the chart instance when the component is unmounted
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className='w-full'>
      <p className='mb-2 font-semibold bg-gray-900'>Performance</p>
      <div className='w-full bg-white rounded-sm h-80'>
        <canvas id="myChart" className='w-full bg-white'></canvas>
      </div>
    </div>
    
    
  );
}

export default PerformanceChart