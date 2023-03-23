import React from "react";
import Router from "next/router";
import styles from '@/styles/Landing.module.css';
import chat from '../resources/chat.png';
import { Button, TextField, Typographys } from '@mui/material';
import Header from "@/components/header";
import { useRouter } from "next/router";

/* Would be nice to show the latest message that has been sent when the user hovers over 
over the chat image. I also need to detach the text for each button from the button. So
that when it is hovered the brightness of the text is not affected. 
*/
const Landing = () => {
  const router = useRouter();
  const chatClicked = () => {
    console.log("chat clicked");
  }

  const handleChatButton = () => {
    router.push("/chat");
  };

  const dataAnalyticsClicked = () => {
    console.log("DataClicked");
  }
     return (
      <div className = {styles.pageContainer}>
        <Header />
        <div className={styles.main}>
          <div className={styles.buttonContainer}> 
            <Button variant="contained" onClick={handleChatButton} className={styles.button}>Your Chats</Button>
          </div>
          <div className={styles.buttonContainer}> 
            <Button variant="contained" onClick={chatClicked} className={styles.button2}>Data Analytics</Button>
          </div>
        </div>
      </div>
      
    );
  };
  
  export default Landing;