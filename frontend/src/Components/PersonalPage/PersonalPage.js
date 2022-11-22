import React, { useState, useRef, useCallback, useEffect } from 'react'
// import theme from '../Themes/Theme';
// import { ThemeProvider } from '@mui/material/styles';

import Header from './Header'
import TestItem from './TestItem'
import Follow from './Follow'
import Post from './Post'

import Grid from '@mui/material/Grid';

const PersonalPage = ({userId}) => {

  const dates_fake = ["2022/09/04", "2022/10/08", "2022/10/30", "2022/11/19"];
  const bigs_fake = [
    [33, 90, 100, 44, 76], 
    [10, 48, 39, 85, 40],
    [78, 41, 9, 30, 57],
    [50, 12, 99, 2, 60]
  ];

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="start"
        alignItems="center"
        height="100vh"
        width="100vw"
        style={{
          background: "#000"
        }}
        sx={{
          pt: 2
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="start"
          alignItems="start"
          style={{
            background: "#000"
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="start"
            alignItems="start"
            style={{
              background: "#000"
            }}
            paddingLeft="8vw"
            paddingRight="8vw"
          >
            <p style = {{ color: 'white'}}>INTERVIEW HISTORY</p>
            {
              dates_fake.map((d, i) => 
                <>
                  <TestItem
                    id = {i}
                    date = {d}
                    big =  {bigs_fake[i]}
                    dates = {dates_fake}
                    bigs = {bigs_fake}
                  />
                </>
              )
            }
          </Grid>
          <Follow/>
          <Post/>
        </Grid>
      </Grid>
    </>
  )
}
export default PersonalPage