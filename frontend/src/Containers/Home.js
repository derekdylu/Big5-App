import React, { useEffect, useState } from 'react'
import PersonalPage from '../Components/PersonalPage/PersonalPage'
import Login from '../Components/Login'

import Grid from '@mui/material/Grid';

const Home = () => {
  const [ user, setUser ] = useState(
    localStorage.getItem('user')
      ? JSON.parse(localStorage.getItem('user'))
      : null
  )

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
      </Grid>
    </>
  )
}

export default Home