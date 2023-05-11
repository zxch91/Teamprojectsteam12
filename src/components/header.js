import React from "react";
import Router from "next/router";
import { useRouter } from 'next/router';
import styles from '@/styles/Header.module.css';
import Landing from "@/pages/landing";
import Image from 'next/image';
import { Button, TextField, Typographys } from '@mui/material';

const Header = () => {

    const router = useRouter();

    const HomePressed = () => {
      router.push("/landing");
    }
     return (
      <div className = {styles.headerContainer}>
        <div className = {styles.headerElements}>
          <div className = {styles.logoContainer}>
            <a onClick={HomePressed}>
              <Image src="/Logo.png" width={160} height={35} alt="logo" />
            </a>
          </div>   
        </div>
        <div className = {styles.loggedInContainer}>
          
          <Button>Someone</Button>
        </div>
      </div>
      
    );
  };
  
  export default Header; 