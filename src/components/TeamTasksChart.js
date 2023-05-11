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
      labels: props.Labels,
      datasets: [
        {
          label: 'Completed',
          data: props.values1,
          backgroundColor: '#0000FF',
        },
        {
          label: 'Not Completed',
          data: props.values2,
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
  }, [props]);

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
        backgroundColor: '#f8f9fa', // sets background color to light grey
        border: '2px solid #007bff', // sets border color to #007bff
        borderRadius: '15px', // makes the corners rounded
        boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)', // adds a layered shadow effect
        padding: '10px', // internal spacing for a better visual balance
      }}
    >
      <canvas id="TeamTasksChart" ref={chartRef}/>
    </div>
  );
  
}
