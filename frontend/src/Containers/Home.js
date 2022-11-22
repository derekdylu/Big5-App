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

<<<<<<< HEAD
=======
  function stateChanged () {
    setUser(localStorage.getItem('user'))
    console.log("state changed", user)
  }

>>>>>>> a36d3b60bee6eff17e35300897d6cf1cec8d8f98
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
<<<<<<< HEAD
      {
        user && (
          <>
            <Login />
            <PersonalPage
              username = {user.name}
              img = {user.picture}
            />
          </>
        )
      }
        {/* <PersonalPage
          username = {user.name}
          img = {user.picture}
        /> */}
=======
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
>>>>>>> a36d3b60bee6eff17e35300897d6cf1cec8d8f98
      </Grid>
    </>
  )
}

export default Home