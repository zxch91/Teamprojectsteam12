import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import styles from '@/styles/Login.module.css';
import Image from 'next/image';
import { useRouter } from "next/router";



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    // Handle login logic here
    console.log(`Username: ${username}, Password: ${password}`);
    router.push('/landing');
  };

  return (
    <div className={styles.container}>
      <Image src="/Logo.png" width={425} height={100} alt="logo" />
      <form onSubmit={handleLogin} className={styles.form}>
        <TextField label="Username" variant="outlined" value={username} onChange={(e) => setUsername(e.target.value)} className={styles.input} />
        <br />
        <TextField label="Password" type="password" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} className={styles.input} />
        <br />
        <Button variant="contained" onClick={handleLogin} className={styles.button}>Login</Button>
      </form>
    </div>
  );
};

export default Login;