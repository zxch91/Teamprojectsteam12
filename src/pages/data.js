import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from '@/styles/Data.module.css';
import UserTable from '@/components/UserTable';
import UserChart from '@/components/UserChart';
import Dropdown from '@/components/Dropdown'
import TeamTasksChart from '@/components/TeamTasksChart'; // Import the new component
import { SettingsEthernet } from '@mui/icons-material';

export default function DataAnalytics() {
  // ... define variable arrays
  const [userType, setUserType] = useState('');
  const [projects, setProjects] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [emps, setEmps] = useState('');
  const [row_id, setRowInfo] = useState('');
  const [compValue, setCompValue] = useState(0);
  const [unCompValue, setUnCompValue] = useState(0);
  const [currentCompValue, setCurrentCompValue] = useState(0);
  const [currentUncompValue, setCurrentUncompValue] = useState(0);
  const [teamCompleteTasks, setTeamCompleteTasks] = useState(new Array());
  const [teamUnCompleteTasks, setTeamUnCompleteTasks] = useState(new Array());


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

  const fetchType2 = () => {
    return fetch("api/grabTeams", requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  const fetchType3 = ({project_id}) => {
    const url = new URL("api/grabEmps", window.location.href);
    url.searchParams.append("projects_id", project_id);

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  const fetchType4 = ({user_id, comp}) => {
    const url = new URL("api/grabComplete", window.location.href);
    url.searchParams.append("user_id", user_id);
    url.searchParams.append("comp", comp);

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  const fetchType5 = ({selected_project_id, comp}) => {
    const url = new URL("api/grabTeamIsCompleted", window.location.href);
    url.searchParams.append("selected_project_id", selected_project_id);
    url.searchParams.append("comp", comp);

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  const fetchUserStats = ({user_id, comp}) => {
    const url = new URL("api/grabCurrentUserStats", window.location.href);
    url.searchParams.append("user_id", user_id);
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
    fetchType2().then((res) => {
      if(res){
        setProjects(res.result);
      }
    });
  }, []);

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  useEffect(() => {
    console.log(selectedOption);
    fetchType3({project_id: selectedOption}).then((res) => {
      if(res){
        setEmps(res.result);
      }
    });
  }, [selectedOption]);

  useEffect(() => {
    console.log(emps);
  }, [emps]);



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


  useEffect(() => {
    if(row_id){
    
      const promise1 = fetchUserStats({user_id: row_id, comp: 0 }).then((res) => {
        if (res) {
          setCurrentUncompValue(res.result[0].num);
        }
      });
    
      const promise2 = fetchUserStats({user_id: row_id, comp: 1}).then((res) => {
        if (res) {
          setCurrentCompValue(res.result[0].num);
        }
      });
    
      Promise.all([promise1, promise2]).catch((error) => {
        console.log('Error:', error);
      });
      
    }

  }, [row_id])

  useEffect(() => {
    const grabCompleteArrays = async () => {
      var promisses = new Array();
      var array1 = new Array();
      for(var i = 0;i<projects.length;i++){
        const promise = fetchType5({selected_project_id: projects[i].project_id, comp: 1 }).then((res) => {
            array1.push(res.result[0].num);
        });
        promisses.push(promise);
      }
      await Promise.all(promisses);
      setTeamCompleteTasks(array1);
      //console.log(teamCompleteTasks);

      promisses = new Array();
      var array2 = new Array();
      for(var i = 0;i<projects.length;i++){
        const promise = fetchType5({selected_project_id: projects[i].project_id, comp: 0 }).then((res) => {
          array2.push(res.result[0].num);
        });
        promisses.push(promise);
      }
      await Promise.all(promisses);
      setTeamUnCompleteTasks(array2);
      //console.log(teamUnCompleteTasks);
  }
  grabCompleteArrays();
  }, [projects]);



  const handleRowId = (rowID) => {
    setRowInfo(rowID);
  };

  var buildTable = () => {
    var array  =  new Array();
    for( var i = 0;i <emps.length;i++){
        var row = {id:emps[i].user_id,name:emps[i].username,email:emps[i].email};
        array.push(row);
    }
    return array;
  }



  const handleOptionSelect = (event) => {
    setSelectedOption(event.target.value);
    setCompValue(0);
    setUnCompValue(0);
  };

  var genOptions = () =>{
    var array = new Array();
    for( var i = 0;i <projects.length;i++){
      array.push({label: projects[i].project_name, id: projects[i].project_id});
    }
    return array;
  }

  

  var buildUserChartArray = () => {
    return [compValue, unCompValue];
  }

  var buildCurrentUserChart = () => {
    console.log(currentCompValue,currentUncompValue);
    return [currentCompValue, currentUncompValue];
  }


  var buildLabelsArray = () => {
    var array = new Array();
    for( var i = 0;i <projects.length;i++){
      array.push(projects[i].project_name);
    }
    return array;
  }

  var buildTeamCompleteArray = () => {
    var array =  new Array();
    for(var i = 0;i<teamCompleteTasks.length;i++){
      array.push(teamCompleteTasks[i]);
    }
    return array;
  }

  var buildTeamUnCompleteArray = () => {
    var array =  new Array();
    for(var i = 0;i<teamUnCompleteTasks.length;i++){
      array.push(teamUnCompleteTasks[i]);
    }
    return array;
  }

  if (userType == "admin"){
    return (
                //ADMIN HTML//
      <div>
        <div style={{ textAlign: 'center' }}>
          <h1>All Teams</h1>
          <Dropdown onOptionSelect={handleOptionSelect} options={genOptions()}/>
          <UserTable rows={buildTable()} setrowInfo={handleRowId}/>
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
              <UserChart values={buildUserChartArray()}/>
            
            </div>
            <div className={styles.chartContainer}>
              <h2>Team Tasks</h2>
              <TeamTasksChart Labels = {buildLabelsArray()} values1={buildTeamCompleteArray()} values2={buildTeamUnCompleteArray()}/>
            
            </div>
          </div>
        </div>
      </div>
    );
  } else if (userType == "leader"){

  } else if (userType == "emp"){
    return (
      //Employee HTML//
      <div>
        <div style={{ textAlign: 'center' }}>
          <h1>Your Progress</h1>
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

          <UserChart values={buildCurrentUserChart()}/>
        
        </div>
      </div>
      </div>
      </div>
    );

  } else {
    //redirect to login
  }

}