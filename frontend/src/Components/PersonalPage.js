import React, { useState, useRef, useCallback, useEffect } from 'react'
// import theme from '../Themes/Theme';
// import { ThemeProvider } from '@mui/material/styles';
import Header from './PersonalPage/Header'
import TestHistory from './PersonalPage/TestHistory'
import Follow from './PersonalPage/Follow'
import Post from './PersonalPage/Post'
import Grid from '@mui/material/Grid';

// import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';

const PersonalPage = ({username, img}) => {

  // const name_fake = "Isabelle"
  // const picURL_fake = "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"

  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="start"
        height="100vh"
        width="100vw"
        style={{
          background: "#000"
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="start"
          alignItems="center"
          height="90vh"
          width="90vw"
          style={{
            background: "#000"
          }}
        >
          <Header
            name = {username}
            picURL = {img}
          />
         <TestHistory
            
          />
          <Follow
            
          />
          <Post
            
          />
        </Grid>
      </Grid>
    </>
  )
}
export default PersonalPage