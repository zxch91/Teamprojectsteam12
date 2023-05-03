import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TeamTasksChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart = null;
    const ctx = chartRef.current.getContext('2d');
    const chartData = {
      labels: ['Team 1', 'Team 2', 'Team 3'],
      datasets: [
        {
          label: 'Completed',
          data: [5, 7, 3],
          backgroundColor: '#0000FF',
        },
        {
          label: 'Not Completed',
          data: [2, 4, 6],
          backgroundColor: '#FF0000',
        },
      ],
    };

    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return <canvas id="TeamTasksChart" ref={chartRef} width="50" height="50" />;
}
