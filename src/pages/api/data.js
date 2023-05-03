import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from '@/styles/Data.module.css';
import UserTable from '@/components/UserTable';
import UserChart from '@/components/UserChart';
import TeamTasksChart from '@/components/TeamTasksChart'; // Import the new component

export default function DataAnalytics() {
  // ... rest of the code
  const [userType, setUserType] = useState('');

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  const fetchType = () => {
    return fetch("api/task", requestOptions)
      .then(response => response.json())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  useEffect(() => {
    fetchType().then((res) => {
      if (res) {
        setUserType(res.result.user_type);
      }

    });
  }, []);

  useEffect(() => {
    console.log('user type:', { userType });
  }, [userType]);

  switch (userType) {
    case "admin":

      return (
        <div>
          <div style={{ textAlign: 'center' }}>
            <h1>All Users</h1>
            <UserTable />
          </div>
          <div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'nowrap', // change this to 'nowrap'
                alignItems: 'center',
              }}
            >
              <div className={styles.chartContainer}>
                <h2>User Tasks</h2>
                <UserChart />
              </div>
              <div className={styles.chartContainer}>
                <h2>Team Tasks</h2>
                <TeamTasksChart />
              </div>
            </div>
          </div>
        </div>
      );

    case "leader":



    case "employee":


  }
}