import React, { useEffect, useState } from 'react'
import PersonalPage from '../Components/PersonalPage/PersonalPage'
import Login from '../Components/Login'

import Grid from '@mui/material/Grid';

import landingLogo from '../Images/landing_logo.png'

const Home = () => {
  const [ user, setUser ] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )

  function stateChanged () {
    setUser(localStorage.getItem('user'))
    console.log("state changed", user)
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
              <img src={landingLogo} alt="landing" width="67%" style={{ marginBottom: "100px" }}/>
            )
          }
          <Login stateChanged={stateChanged} />
        </Grid>
        {
          user && (
            <>
              <PersonalPage
                userId={0}
              />
            </>
          )
        }
      </Grid>
    </>
  )
}

export default Home