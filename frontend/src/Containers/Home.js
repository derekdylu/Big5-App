import React, { useEffect, useState } from 'react'
import PersonalPage from '../Components/PersonalPage/PersonalPage'
import Login from '../Components/Login'
import { Link } from "react-router-dom";

import Grid from '@mui/material/Grid';
import Fab from '@mui/material/Fab';
import Typography from '@mui/material/Typography';

import logo from '../Images/logo.gif'
import wordmark from '../Images/wordmark.png'
import FiberSmartRecordRoundedIcon from '@mui/icons-material/FiberSmartRecordRounded';

const style = {
  top: 'auto',
  bottom: 20,
  right: 20,
  margin: 0,
  position: 'fixed',
  boxShadow: '2px 2px 5px 3px rgba(0, 255, 194, 0.5), -2px -2px 5px 3px rgba(0, 209, 255, 0.5)'
};

const Home = () => {
  const [ user, setUser ] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )

  function stateChanged () {
    setUser(localStorage.getItem('user'))
    console.log("update user", user)
  }

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundColor: "black"
        }}
      >
        <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        style={{
          backgroundColor: "black"
        }}
        height={ !user && "100vh" }
        >
          {
            !user && (
              <div>
                <div>
                  <img src={logo} alt="logo" width="50%" style={{ marginBottom: "40px", display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}}/>
                </div>
                <div>
                  <img src={wordmark} alt="wordmark" width="50%" style={{ marginBottom: "100px", display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '50%'}} />
                </div>
              </div>
            )
          }
          <Login stateChanged={stateChanged} />
        </Grid>
        {
          user && (
            <>
              <Link to="/camera">
                <Fab variant="extended" style={style} color="primary" sx={{ boxShadow: 3 }}>
                  <FiberSmartRecordRoundedIcon sx={{mr: 1}} />
                  <Typography>
                    TEST
                  </Typography>
                </Fab>
              </Link>
              <PersonalPage
                userId={user._id}
              />
            </>
          )
        }
      </Grid>
    </>
  )
}

export default Home