import React from "react";
import Router from "next/router";
import styles from '@/styles/Landing.module.css';
import { Button, TextField, Typography } from '@mui/material';

/* Would be nice to show the latest message that has been sent when the user hovers over 
over the chat image. I also need to detach the text for each button from the button. So
that when it is hovered the brightness of the text is not affected. 
*/
const Landing = () => {

  const chatClicked = () => {
    console.log("chat clicked");
  }

  const dataAnalyticsClicked = () => {
    console.log("Dataicked");
  }
     return (
      <div className = {styles.pageContainer}>
        <div className={styles.main}>
          <div className={styles.buttonContainer}> 
            <Button variant="contained" onClick={chatClicked} className={styles.button}>Your Chats</Button>
          </div>
          <div className={styles.buttonContainer}>
            <Button variant="contained" onClick={dataAnalyticsClicked} className={styles.button2}>Data Analytics</Button>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default Landing;