import React, { useEffect, useState } from 'react'
import PersonalPage from '../Components/PersonalPage/PersonalPage'
import Login from '../Components/Login'

import Grid from '@mui/material/Grid';

import logo from '../Images/logo.gif'
import wordmark from '../Images/wordmark.png'

const Home = () => {
  const [ user, setUser ] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )

  function stateChanged () {
    setUser(localStorage.getItem('user'))
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