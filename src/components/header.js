import React from "react";
import Router from "next/router";
import Logo from "../../public/Logo.png";
import styles from '@/styles/Header.module.css';
import { Button, TextField, Typographys } from '@mui/material';

const Header = () => {


     return (
      <div className = {styles.headerContainer}>
        <div className = {styles.headerElements}>
            <img src="{Logo}" className = {styles.logo}></img>
        </div>
      </div>
      
    );
  };
  
  export default Header;    