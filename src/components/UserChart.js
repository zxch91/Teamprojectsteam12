import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function UserChart(props) {
  const chartRef = useRef(null);
  const values = props.values

  useEffect(() => {
    let myChart = null;
    const ctx = chartRef.current.getContext('2d');
    const chartData = {
      labels: ['Completed', 'Not Completed'],
      datasets: [
        {
          data: values,
          backgroundColor: ['#0000FF', '#FF0000'],
        },
      ],
    };

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
  }, [values]);

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
      <canvas id="UserChart" ref={chartRef}/>
    </div>
  );
}


