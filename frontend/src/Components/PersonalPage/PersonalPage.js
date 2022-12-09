import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import theme from '../../Themes/Theme'
import { getInterviewsByUserId, getInterviewsByIndustry } from '../../Utils/Axios';

import Header from './Header'
import TestItem from './TestItem'
import Follow from './Follow'
import Post from './Post'

import Grid from '@mui/material/Grid';

// fake data 2.0
const fake_interview_id1 = "639049dfdcc8d88496be5004";
const fake_interview_id2 = "63904a41dcc8d88496be5005";
const fake_interview_id3 = "6390517fdcc8d88496be5006";

const fake_user = {
  _id: "638cc603363b3cb6e72dacbf",
  username: "黃晨亘",
  email: "isa20202020@gmail.com",
  img: "https://lh3.googleusercontent.com/a/AEdFTp5a1Fhn-LGykBl5hwPCgFpi5rUaYT…",
  interview: [
    fake_interview_id1,
    fake_interview_id2,
    fake_interview_id3
  ]
}

const interviews = [
  {
    _id: fake_interview_id1,
    userId: "638cc603363b3cb6e72dacbf",
    timestamp: "2022/09/04",
    topic: "New test 11111....",
    industry: "🎨 ART",
    score: 111,
    big: [33, 90, 100, 44, 76],
    note: "This is note 1 .................",
    link: "111"
  },
  {
    _id: fake_interview_id2,
    userId: "638cc603363b3cb6e72dacbf",
    timestamp: "2022/10/08",
    topic: "New test 22222....",
    industry: "🎥 MEDIA",
    score: 222,
    big: [10, 48, 39, 85, 40],
    note: "This is note 2 ....................",
    link: "222"
  },
  {
    _id: fake_interview_id3,
    userId: "638cc603363b3cb6e72dacbf",
    timestamp: "2022/11/19",
    topic: "New test 33333....",
    industry: "🏗️ CIVIL ENGINEERING",
    score: 333,
    big: [78, 41, 9, 30, 57],
    note: "This is note 3 .........................",
    link: "333"
  },
]
/*=================================================================================*/ 

const PersonalPage = ({userId}) => {

  console.log("user id", userId)
  const [data, setData] = useState()

  useEffect(() => {
    getInterviewsByUserId(userId).then((res) => {
      setData(res)
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })
  }, [])

  const navigate = useNavigate()

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
              data?.map((interview, i) => 
                <>
                  <TestItem
                    interview={interview}
                    interviews = {data}
                    setInterviews = {setData}
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