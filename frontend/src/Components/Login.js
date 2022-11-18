import React, {useState} from 'react'
import GoogleLogin from 'react-google-login';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const googleClientId = "278069779564-qfghpg04t9ha3kpoa7k05cpvhv3gi12s.apps.googleusercontent.com"

const Login = () => {
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const handleFailure = (result) => {
    alert("falure", result);
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
              <Typography>You logged in as {loginData.email}</Typography>
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