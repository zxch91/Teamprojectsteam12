import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function UserChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    let myChart = null;
    const ctx = chartRef.current.getContext('2d');
    const chartData = {
      labels: ['Completed', 'Not Completed'],
      datasets: [
        {
          data: [2, 8],
          backgroundColor: ['#0000FF', '#FF0000'],
        },
      ],
    };

    if (myChart) {
      myChart.destroy();
    }

    myChart = new Chart(ctx, {
      type: 'pie',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return <canvas id="UserChart" ref={chartRef} width="50" height="50" />;


}


