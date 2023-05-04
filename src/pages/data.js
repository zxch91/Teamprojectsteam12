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
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  useEffect(() => {
    fetchType().then((res) => {
      if (res) {
        setUserType(res.result[0].user_type);
      }
      
    });
  }, []);

  useEffect(() => {
    console.log(userType);
  }, [userType]);

  /*switch (userType) {
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
                <Greeting select={1} />
                
              </div>
              <div className={styles.chartContainer}>
                <h2>Team Tasks</h2>
                <script>const root = ReactDOM.createRoot(document.getElementById('root'));
                  root.render(<Greeting select={2} />);
                </script>
              </div>
            </div>
          </div>
        </div>
      );
    case "leader":

      break;

    case "employee":

      break;
  }*/

  if (userType == "admin"){
    return (
                //ADMIN HTML//
      <div>
        <div style={{ textAlign: 'center' }}>
          <h1>All Teams</h1>
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
              <h2>Team Progress</h2>
              <UserChart values={["6","9"]}/>
            
            </div>
            <div className={styles.chartContainer}>
              <h2>Team Tasks</h2>
              <TeamTasksChart values1={["3","4","5"]} values2={["7","8","9"]}/>
            
            </div>
          </div>
        </div>
      </div>
    );
  } else if (userType == "leader"){

  } else if (userType == "emp"){

  } else {
    //redirect to login
  }

}