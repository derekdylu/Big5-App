import React, { useState, useRef, useCallback, useEffect } from 'react'
// import theme from '../Themes/Theme';
// import { ThemeProvider } from '@mui/material/styles';
import Header from './Header'
import TestItem from './TestItem'
import Follow from './Follow'
import Post from './Post'
import Grid from '@mui/material/Grid';

// import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';

const PersonalPage = ({username, img}) => {

  const dates_fake = ["2022/09/04", "2022/10/08", "2022/11/19"];
  const bigs_fake = [
        [33, 90, 12, 44, 76], 
        [10, 48, 39, 85, 40],
        [78, 41, 9, 30, 57]
  ];

  return (
    <>
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
          <Grid
            container
            direction="column"
            justifyContent="start"
            alignItems="start"
            style={{
              background: "#000"
            }}
          >
            <p style = {{ color: 'white' }}>TEST HISTORY</p>
            {
              dates_fake.map((d, i) => 
                <>
                  <TestItem
                    date = {d}
                    big =  {bigs_fake[i]}
                  />
                </>
              )
            }
          </Grid>
          {/* <Follow/> */}
          {/* <Post/> */}
      </Grid>
    </>
  )
}
export default PersonalPage