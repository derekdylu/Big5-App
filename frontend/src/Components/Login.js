import React, { useState, useEffect } from 'react'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


const Login = () => {
  const googleClientId = "278069779564-qfghpg04t9ha3kpoa7k05cpvhv3gi12s.apps.googleusercontent.com"
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  useEffect(() => {
    const initClient = () => {
        gapi.auth2.init({
        clientId: googleClientId,
        scope: ''
      });
    };
    gapi.load('client:auth2', initClient);
  });

  const handleFailure = (result) => {
    alert("falure: ", result);
  };

  const handleLogin = async (googleData) => {
    const res = await fetch('http://127.0.0.1:8000/login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log("response", res)

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        style={{
          background: "#000"
        }}
      >
        <div>
          {loginData ? (
            <div>
              <Typography color="primary">You logged in as {loginData.email}</Typography>
              <img src={loginData.imageUrl} alt="user image" />
              <h3 style = {{ color: 'white'}}>User Logged in</h3>
              <p style = {{ color: 'white'}}>Name: {loginData.name}</p>
              <p style = {{ color: 'white'}}>Email Address: {loginData.email}</p>
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          ) : (
            <GoogleLogin
              clientId={googleClientId}
              buttonText="Log in with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            ></GoogleLogin>
          )}
        </div>
      </Grid>
    </>
  );
}

export default Login