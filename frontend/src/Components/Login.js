import React, { useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode';

import theme from '../Themes/Theme';

import { getUserbyEmail, postUser } from '../Utils/Axios';

import Navigation from '../Components/Navigation'
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import profileImage from '../Images/profile.png'

const Login = ({stateChanged}) => {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
  const [devlogclicked, setDevlogclicked] = useState(false)
  const [loading, setLoading] = useState(false)
  
  // localStorage.removeItem("user")
  const [ user, setUser ] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )
  // const [ user, setUser ] = useState(null)

  function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  function guestLogin() {
    setLoading(true)
    document.getElementById("signInDiv").hidden = true
    const guestUser = {
      "username": "guest_" + makeid(9),
      "email": makeid(9) + "@email",
      "img": profileImage,
      "interview": [],
    }
    postUser(guestUser.username, guestUser.email, guestUser.img, guestUser.interview).then((res) => {
      setUser(guestUser)
      getUserbyEmail(guestUser.email).then((res) => {
        localStorage.setItem("user", JSON.stringify(res))
        stateChanged()
        setLoading(false)
      })
    }).catch((err) => {
      console.log(err)
    })
  }

  function handleCallbackResponse(response) {
    setLoading(true)
    var userObject = jwt_decode(response.credential)

    // check if user's regisered in db
    getUserbyEmail(userObject.email).then((res) => {
      setUser(res)
      localStorage.setItem("user", JSON.stringify(res))
      stateChanged()
    }).catch((err) => {
      const newUser = {
        "username": userObject.name,
        "email": userObject.email,
        "img": userObject.picture,
        "interview": [],
      }
      postUser(userObject.name, userObject.email, userObject.picture, []).then((res) => {
        setUser(newUser)
        getUserbyEmail(newUser.email).then((res) => {
          localStorage.setItem("user", JSON.stringify(res))
          stateChanged()
        })
      }).catch((err) => {
        console.log(err)
      })
    })
    setLoading(false)
    document.getElementById("signInDiv").hidden = true
  }

  useEffect(() => {
    if (!googleClientId || !window.google?.accounts?.id) {
      return
    }

    window.google.accounts.id.initialize({
      client_id: googleClientId,
      callback: handleCallbackResponse
    })

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      { theme: "outline", size: "large" }
    )
    document.getElementById("signInDiv").style.marginBottom = "2px"
    document.getElementById("signInDiv").style.marginTop = "4px"
    document.getElementById("signInDiv").hidden = true

    if (localStorage.getItem('user')) {
      document.getElementById("signInDiv").hidden = true
    }
  }, [])

  function handleLogout(e) {
    document.getElementById("signInDiv").hidden = true
    setUser(null)
    localStorage.removeItem('user');
    setDevlogclicked(false)
    stateChanged()
  };

  function clickDev(e) {
    e.preventDefault()
    if (!googleClientId || !window.google?.accounts?.id) {
      return
    }
    document.getElementById("signInDiv").hidden = false
    setDevlogclicked(true)
  }

  return (
    <>
      <div id="signInDiv"></div>
      {user ? (
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
      ) :
      (
        <>
          <>
            {
                !devlogclicked && googleClientId && <Button variant="secondary2" sx={{mt:2}} style={{width: "240px"}} onClick={clickDev}>Developer Login</Button>
            }
          </>
          <Button variant="secondary2" sx={{mt:2}} style={{width: "240px"}} onClick={guestLogin} disabled={loading}>
          {
            loading ?
            (
              <CircularProgress
                size={24}
                sx={{
                  color: theme.palette.primary[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-12px',
                  marginLeft: '-12px',
                }}
              />
            ) : (
              <>Guest Login</>
            )
          }
          </Button>
          <Typography color={theme.palette.white.main} variant="caption" sx={{mt: 2, px: 8}} align="center">By logging in you agreeing to our terms of use and the use of cookies.</Typography>
        </>
      )
      }
    </>
  );
}

export default Login
