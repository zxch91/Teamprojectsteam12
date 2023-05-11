import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import styles from '@/styles/Data.module.css';
import UserTable from '@/components/UserTable';
import UserChart from '@/components/UserChart';
import Dropdown from '@/components/Dropdown';
import Percentage from '@/components/Percentage';
import TeamTasksChart from '@/components/TeamTasksChart'; // Import the new component
import { SettingsEthernet } from '@mui/icons-material';
import Cookies from 'js-cookie';

export default function DataAnalytics() {
  
  //RETRIEVE COOKIES
  const retrievedUserId = Cookies.get("user_id");

  //DEFINE VARIABLES
  const [userType, setUserType] = useState('');
  const [userID, setUserID] = useState(0);
  const [projects, setProjects] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [emps, setEmps] = useState('');
  const [row_id, setRowInfo] = useState('');
  const [compValue, setCompValue] = useState(0);
  const [unCompValue, setUnCompValue] = useState(0);
  const [userCompValue, setUserCompValue] = useState(0);
  const [userUnCompValue, setUserUnCompValue] = useState(0);
  const [teamCompleteTasks, setTeamCompleteTasks] = useState(new Array());
  const [teamUnCompleteTasks, setTeamUnCompleteTasks] = useState(new Array());
  const [showChart, setShowChart] = useState(true);
  const [percentage, setPercentage] = useState(0);
  

  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };


  //CURRENT USER
  const fetchType = () => {
    return fetch(`/api/task?user_id=${retrievedUserId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  //GRAB TEAMS FOR DROPDOWN
  const fetchType2 = () => {
    return fetch("api/grabTeams", requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  //GRAB USERS FOR SELECTED TEAM
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

  const fetchType6 = ({user_id}) => {
    const url = new URL("api/grabTeamsLeader", window.location.href);
    url.searchParams.append("user_id", user_id);

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  const fetchType7 = ({user_id, comp}) => {
    const url = new URL("api/grabCurrentUserStats", window.location.href);
    url.searchParams.append("user_id", retrievedUserId);
    url.searchParams.append("comp", comp);

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }

  const fetchType8 = ({user_id, comp, project_id}) => {
    const url = new URL("api/grabTeamUserTasks", window.location.href);
    url.searchParams.append("user_id", user_id);
    url.searchParams.append("comp", comp);
    url.searchParams.append("project_id", project_id);

    return fetch(url, requestOptions)
      .then((response) => response.json())
      .then((result) => result)
      .catch((error)=> console.log('error', error));
  }


  useEffect(() => {
    fetchType().then((res) => {
      if (res) {
        res.json().then((data) => {
          console.log("Response data:", data); // Log the response data
          setUserType(data.result[0].user_type);
        });
      }
    });
  }, []);

  useEffect(() => {
    console.log(userType);
    console.log(userID);
  }, [userType]);

  useEffect(() => {
    if (userType == "admin"){
      fetchType2().then((res) => {
        if(res){
          setProjects(res.result);
        }
      });
    }else if(userType == "leader"){
      fetchType6({user_id: userID}).then((res) => {
        if(res){
          setProjects(res.result);
        }
      });
    }
  }, [userType]);

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
    var findPercentage = async () => {
      if (selectedOption){
        let totalTasks = 0;
        let completeTasks = 0;
        const promise1 = fetchType5({selected_project_id: selectedOption, comp: 1}).then((res) => {
          totalTasks += res.result[0].num;
          completeTasks += res.result[0].num;
        });
        const promise2 = fetchType5({selected_project_id: selectedOption, comp: 0}).then((res) => {
          totalTasks += res.result[0].num;
        });
        await Promise.all([promise1, promise2]).catch((error) => {
          console.log('Error:', error);
        });

        let percentage = (completeTasks/totalTasks) * 100;
        setPercentage(percentage); 
      }
    }
    findPercentage();
    console.log(percentage);
  }, [selectedOption]);

  useEffect(() => {
    console.log(emps);
  }, [emps]);

  useEffect(() => {
      if(row_id){
        var getComp = async (row_id) => {
          const promise1 = fetchType8({user_id: row_id, comp: 0 , project_id: selectedOption}).then((res) => {
            if (res) {
              setUnCompValue(res.result[0].num);
            }
          });
        
          const promise2 = fetchType8({user_id: row_id, comp: 1, project_id: selectedOption}).then((res) => {
            if (res) {
              setCompValue(res.result[0].num);
            }
          });

          const promise3 = fetchType4({user_id: row_id, comp: 0}).then((res) => {
            if (res) {
              setUserUnCompValue(res.result[0].num);
            }
          });
        
          const promise4 = fetchType4({user_id: row_id, comp: 1}).then((res) => {
            if (res) {
              setUserCompValue(res.result[0].num);
            }
          });
        
          await Promise.all([promise1, promise2, promise3, promise4]).catch((error) => {
            console.log('Error:', error);
          });
        }
        getComp(row_id);
      }

  }, [row_id]);

  useEffect(() => {
    if (userType == "emp"){
      var getComp = async () => {
        const promise1 = fetchType7({user_id: userID, comp: 0 }).then((res) => {
          if (res) {
            setUnCompValue(res.result[0].num);
          }
        });
      
        const promise2 = fetchType7({user_id: userID, comp: 1}).then((res) => {
          if (res) {
            setCompValue(res.result[0].num);
          }
        });
      
        await Promise.all([promise1, promise2]).catch((error) => {
          console.log('Error:', error);
        });
      }
      getComp();
    }
  }, [userType]);

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
    setShowChart(true);
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
    setShowChart(false);
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

  var buildUserChartArray2 = () => {
    return [userCompValue, userUnCompValue];
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
          <div style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'nowrap', // change this to 'nowrap'
              alignItems: 'center',
              marginBottom: "30px"
            }}>
          <div style={{marginRight: "20px"}}><Dropdown onOptionSelect={handleOptionSelect} options={genOptions()}/></div>
          <div><Percentage percentage={percentage}/></div>
          </div>
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
              <h2>User Progress</h2>
              <UserChart values={buildUserChartArray()} showChart={showChart}/>
            
            </div>
            <div className={styles.chartContainer}>
              <h2>Overall User Progress</h2>
              <UserChart values={buildUserChartArray2()} showChart={showChart}/>
            
            </div>
          </div>
          
          <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'nowrap',
          alignItems: 'center',
        }}
        className={styles.chartContainer}
      >
        <div
          style={{
            textAlign: 'center',
            position: 'absolute',
            marginTop:'30%',
          }}
        >
          <h2>Team Tasks</h2>
          <TeamTasksChart
            Labels={buildLabelsArray()}
            values1={buildTeamCompleteArray()}
            values2={buildTeamUnCompleteArray()}
          />
            
            </div>
          </div>
        </div>
      </div>
    );
  } else if (userType == "leader"){
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
          <h2>User Progress</h2>
          <UserChart values={buildUserChartArray()} showChart={showChart}/>
        
        </div>
        <div className={styles.chartContainer}>
          <h2>Team Tasks</h2>
          <TeamTasksChart Labels = {buildLabelsArray()} values1={buildTeamCompleteArray()} values2={buildTeamUnCompleteArray()}/>
        
        </div>
      </div>
      </div>
      </div>
      );
  } else if (userType == "emp"){

    return(<div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'nowrap', // change this to 'nowrap'
          alignItems: 'center',
        }}
      >
        <div className={styles.chartContainer}>
        <h2>User Progress</h2>
        <UserChart values={buildUserChartArray()} showChart={showChart}/>
        
        </div>

      </div>);

  } else {
    //redirect to login
  }

}