import { Button, TextField, Typography, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import styles from "@/styles/Login.module.css";
import Image from "next/image";
import React, { useState } from 'react';
import Cookies from "js-cookie";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState({
    password: "",
    showPassword: false,
  });
  const router = useRouter();

  const handleShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword }); // creates ability to toggle password visibility
  };

  const url = "/api/login"; 
  const handleLogin = () => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password: password.password }),
    })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        // Login failed, display error message
        console.log("Login failed");
        throw new Error('Login failed');
      }
    })
    .then((data) => {
      //save user ID to cookie
      Cookies.set("user_id", data.user_id);

      // Login successful, redirect to landing page
      router.push({
        pathname: '/landing',
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
  };

  return (
    <div className={styles.container}>
      <Image src="/Logo.png" width={425} height={100} alt="logo" />
      <form onSubmit={handleLogin} className={styles.form}>
        <TextField
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.input}
        />
        <br />
        <TextField
          label="Password"
          type={password.showPassword ? "text" : "password"}
          variant="outlined"
          value={password.password}
          onChange={(e) =>
            setPassword({ ...password, password: e.target.value })
          }
          className={styles.input}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleShowPassword}>
                {password.showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
        <br />
        <Button
          variant="contained"
          onClick={handleLogin}
          className={styles.button}
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default Login;

