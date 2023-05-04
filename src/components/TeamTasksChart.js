import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function TeamTasksChart(props) {
  const chartRef = useRef(null);
  const values1 = props.values1
  const values2 = props.values2

  useEffect(() => {
    let myChart = null;
    const ctx = chartRef.current.getContext('2d');
    const chartData = {
      labels: ['Team 1', 'Team 2', 'Team 3'],
      datasets: [
        {
          label: 'Completed',
          data: values1,
          backgroundColor: '#0000FF',
        },
        {
          label: 'Not Completed',
          data: values2,
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

  useEffect(() => {
    const canvas = chartRef.current;
    const container = canvas.parentNode;
    const width = container.offsetWidth;
    const height = container.offsetHeight;
    canvas.width = width;
    canvas.height = height;
  }, []);

  return (
    <div
      style={{
        position: 'relative',
        width: '700px',
        height: '300px',
        overflow: 'auto',
        marginBottom: '20px',
      }}
    >
      <canvas id="TeamTasksChart" ref={chartRef}/>
    </div>
  );
}
