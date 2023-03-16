import React from "react";
import Router from "next/router";
import styles from '@/styles/Landing.module.css';
import { Button, TextField, Typography } from '@mui/material';


const Landing = () => {

  const chatClicked = () => {
    console.log("chat clicked");
  }

  const dataAnalyticsClicked = () => {
    console.log("Dataicked");
  }
     return (
      <div className={styles.main}>
      <div className={styles.buttonContainer}> 
      <Button variant="contained" onClick={chatClicked} className={styles.button}>Your Chats</Button>
      </div>
      <div className={styles.buttonContainer}>
      <Button variant="contained" onClick={dataAnalyticsClicked} className={styles.button}>Data Analytics</Button>
      </div>
      </div>
    );
  };
  
  export default Landing;