import React from "react";
import Router from "next/router";
import styles from '@/styles/Header.module.css';
import Image from 'next/image';
import { Button, TextField, Typographys } from '@mui/material';

const Header = () => {


     return (
      <div className = {styles.headerContainer}>
        <div className = {styles.headerElements}>
          <div className = {styles.logoContainer}>
            <Image src="/Logo.png" width={160} height={35} alt="logo" />
          </div>   
        </div>
      </div>
      
    );
  };
  
  export default Header;    