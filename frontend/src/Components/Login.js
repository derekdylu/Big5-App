import React, { useState, useEffect } from 'react'
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import jwt_decode from 'jwt-decode';

import { getUserbyEmail, postUser } from '../Utils/Axios';

import Navigation from '../Components/Navigation'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

const Login = ({stateChanged}) => {
  const googleClientId = "278069779564-qfghpg04t9ha3kpoa7k05cpvhv3gi12s.apps.googleusercontent.com"
  
  // localStorage.removeItem("user")
  const [ user, setUser ] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )
  // const [ user, setUser ] = useState(null)

  function handleCallbackResponse(response) {
    var userObject = jwt_decode(response.credential)
    console.log("user object", userObject)

    // check if user's regisered in db
    getUserbyEmail(userObject.email).then((res) => {
      setUser(res)
      localStorage.setItem("user", JSON.stringify(res))
      console.log("a registered account has been found in DB", res)
      stateChanged()
    }).catch((err) => {
      const newUser = {
        "username": userObject.name,
        "email": userObject.email,
        "img": userObject.picture,
        "interview": [],
      }
      console.log("new user", newUser)
      postUser(userObject.name, userObject.email, userObject.picture, []).then((res) => {
        console.log(res)
        setUser(newUser)
        stateChanged()
        getUserbyEmail(newUser.email).then((res) => {
          localStorage.setItem("user", JSON.stringify(res))
          console.log("new account has been created", res)
        })
      }).catch((err) => {
        console.log(err)
      })
    })

    document.getElementById("signInDiv").hidden = true
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCallbackResponse
    })

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )

    if (localStorage.getItem('user')) {
      document.getElementById("signInDiv").hidden = true
    }
  }, [])

  function handleLogout(e) {
    document.getElementById("signInDiv").hidden = false
    setUser(null)
    localStorage.removeItem('user');
    stateChanged()
  };

  return (
    <>
      <div id="signInDiv"></div>
      {user && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            pt: 6
          }}
        >
          <Navigation logout={handleLogout} />
          <Avatar
            alt="avatar"
            src={user.img}
            sx={{ width: 100, height: 100 }}
          />
          <Typography variant="body1" color="#fff" sx={{mt: 1.5}}>{user.username}</Typography>
        </Grid>
      )}
    </>
  );
}

export default Login