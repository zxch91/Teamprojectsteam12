import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from '@/styles/Data.module.css';
import UserTable from '@/components/UserTable';
import UserChart from '@/components/UserChart';
import DropDown from '@/components/DropDown'
import TeamTasksChart from '@/components/TeamTasksChart'; // Import the new component
import build from 'next/dist/build';

export default function DataAnalytics() {
  // ... rest of the code
  const [userType, setUserType] = useState('');
  const [emps, setEmps] = useState('');
  const [projects, setProjects] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [row_id, setRowInfo] = useState('');
  const [compValue, setCompValue] = useState('');
  const [unCompValue, setUnCompValue] = useState('');

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  }
  
  const fetchType = () => {
    return fetch("api/task", requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  const fetchType2 = ({project_id}) => {
    const url = new URL("api/grabEmps", window.location.href);
    url.searchParams.append("projects_id", project_id);

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  const fetchType3 = () => {
    return fetch("api/grabTeams", requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  const fetchType4 = ({user_id, comp}) => {
    const url = new URL("api/getComplete", window.location.href);
    url.searchParams.append("user_id", user_id);
    url.searchParams.append("comp", comp);

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  const fetchType5 = ({project_id, comp}) => {
    const url = new URL("api/teamCompletions", window.location.href);
    url.searchParams.append("project_id", project_id);
    url.searchParams.append("comp", comp);

    return fetch(url, requestOptions)
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

  useEffect(() => {
    fetchType3().then((res) => {
      if(res){
        setProjects(res.result);
      }
    });
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  useEffect(() => {
    console.log(emps);
  }, [emps]);

  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
    setCompValue('');
    setUnCompValue('');
  };

  const handleRowId = (rowID) => {
    setRowInfo(rowID);
  };

  useEffect(() => {
    console.log(selectedOption);
    fetchType2({project_id: selectedOption}).then((res) => {
      if(res){
        setEmps(res.result);
      }
    });
  }, [selectedOption]);

  useEffect(() => {
    if(row_id){
    
      const promise1 = fetchType4({user_id: row_id, comp: 0 }).then((res) => {
        if (res) {
          setUnCompValue(res.result[0].num);
        }
      });
    
      const promise2 = fetchType4({user_id: row_id, comp: 1}).then((res) => {
        if (res) {
          setCompValue(res.result[0].num);
        }
      });
    
      Promise.all([promise1, promise2]).catch((error) => {
        console.log('Error:', error);
      });
      
    }

  }, [row_id]);
 
  var buildVals = ({select}) => {
    if (select == 1){
      var array1 = new Array();
      for( var i = 0;i <projects.length;i++){
        fetchType5({project_id: projects[i].project_id, comp: 1 }).then((res) => {
          if (res) {
            array1.push(res.result[0].num);
          }
        });
      }
      return array1;
    }else if (select == 2){
  
      var array2 = new Array();
      for( var i = 0;i <projects.length;i++){
        fetchType5({project_id: projects[i].project_id, comp: 0 }).then((res) => {
          if (res) {
            array2.push(res.result[0].num);
          }
        });
      }
      return array2;
      }
  }

  var buildTable = () => {
      var array  =  new Array();
      for( var i = 0;i <emps.length;i++){
          var row = {id:emps[i].user_id,name:emps[i].username,email:emps[i].email};
          array.push(row);
      }
      return array;
  }

  var genOptions = () =>{
    var array = new Array();
    for( var i = 0;i <projects.length;i++){
      array.push({label: projects[i].project_name, id: projects[i].project_id});
    }
    return array;
  }

  var createLabels = () => {
    var array = new Array();
    for( var i = 0;i <projects.length;i++){
      array.push(projects[i].project_name);
    }
    return array;
  }

  if (userType == "admin"){
    return (
                //ADMIN HTML//
      <div>
        <div style={{ textAlign: 'center' }}>
          <h1>All Teams</h1>
          <DropDown onOptionSelect={handleOptionSelect} options={genOptions()}/>
          <div><UserTable rows={buildTable()} setrowInfo={handleRowId}/></div>
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
              <UserChart values={[compValue,unCompValue]}/>
            
            </div>
            <div className={styles.chartContainer}>
              <h2>Team Tasks</h2>
              <TeamTasksChart Labels={createLabels()} values1={buildVals(1)} values2={buildVals(2)}/>
            
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