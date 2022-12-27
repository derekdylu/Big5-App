import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import theme from '../../Themes/Theme'
import { getInterviewsByUserId, getInterviewsByIndustry } from '../../Utils/Axios';

import Header from './Header'
import TestItem from './TestItem'
import Follow from './Follow'
import Post from './Post'

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// fake data 2.0
/*=================================================================================*/ 
// const fake_interview_id1 = "639049dfdcc8d88496be5004";
// const fake_interview_id2 = "63904a41dcc8d88496be5005";
// const fake_interview_id3 = "6390517fdcc8d88496be5006";

// const fake_user = {
//   _id: "638cc603363b3cb6e72dacbf",
//   username: "黃晨亘",
//   email: "isa20202020@gmail.com",
//   img: "https://lh3.googleusercontent.com/a/AEdFTp5a1Fhn-LGykBl5hwPCgFpi5rUaYT…",
//   interview: [
//     fake_interview_id1,
//     fake_interview_id2,
//     fake_interview_id3
//   ]
// }

// const interviews = [
//   {
//     _id: fake_interview_id1,
//     userId: "638cc603363b3cb6e72dacbf",
//     timestamp: "2022/09/04",
//     topic: "New test 11111....",
//     industry: "🎨 ART",
//     score: 111,
//     big: [33, 90, 100, 44, 76],
//     note: "This is note 1 .................",
//     link: "111"
//   },
//   {
//     _id: fake_interview_id2,
//     userId: "638cc603363b3cb6e72dacbf",
//     timestamp: "2022/10/08",
//     topic: "New test 22222....",
//     industry: "🎥 MEDIA",
//     score: 222,
//     big: [10, 48, 39, 85, 40],
//     note: "This is note 2 ....................",
//     link: "222"
//   },
//   {
//     _id: fake_interview_id3,
//     userId: "638cc603363b3cb6e72dacbf",
//     timestamp: "2022/11/19",
//     topic: "New test 33333....",
//     industry: "🏗️ CIVIL ENGINEERING",
//     score: 333,
//     big: [78, 41, 9, 30, 57],
//     note: "This is note 3 .........................",
//     link: "333"
//   },
// ]
/*=================================================================================*/ 

const descriptionBox = {
  backgroundColor: '#FFFFFF',
  borderRadius: '50px',
  width: '80%',
  marginTop: '2vh',
  marginBottom: '1vh',
  paddingTop: '2vh',
  paddingLeft: '8vw',
  paddingRight: '8vw',
};

const style = {
  backgroundColor: '#00D1FF',
  // boxShadow: '2px 2px 5px 3px rgba(0, 255, 194, 0.5), -2px -2px 5px 3px rgba(0, 209, 255, 0.5)'
};

const cap = [ 
  ['What does "OCEAN" stand for?'],
  ["How to create an interview testing?"]
]
const intro = [
  ["O - Openness", "The quality or state of being relatively free from obstruction or relatively unoccupied."],
  ["C - Conscientiousness", "Organized and mindful of details. Planning ahead, think about how one's behavior affects others, and are mindful of deadlines."],
  ["E - Extraversion", "The state of or tendency toward being predominantly concerned with and obtaining gratification from what is outside the self."],
  ["A - Agreeableness", "The state or condition of being pleasing or likeable."],
  ["N - Neuroticism", "Experiences the world as distressing, threatening, and unsafe."]  
]
const steps = [
  [
    "(1) Record your own video", 
    'By clicking the "TEST" button down this page, you will be able to start recording a 15-second video. A random question will be shown if you don\'t know what to talk about.'
  ],
  [
    "(2) Select a specific industry", 
    "After recording the video, you will be asked to select an industry. It would be used to calculate the PR-value of each personality trait among people of the same industry."
  ],
  [
    "(3) Check out the results",
    "After a while of calculation, a new interview testing will be created. Click it and you will see the following information: ",
    [
      "(a) Five scores of each personality trait and an overall score will be shown on the top",
      "(b) Boxes below are the PR-value according to the industry you selected",
      "(c) The bottom comes with an area for you to add notes"
    ]
    
  ],
  [
    "(4) Edit the interview topic and export the result",
    "After seeing the result, you can choose to export the whole result card as an image, and the image will be downloaded."

  ]
]

const PersonalPage = ({userId}) => {

  // console.log("user id", userId)
  const [data, setData] = useState()
  const [openDes, setOpenDes] = useState(false)

  useEffect(() => {
    getInterviewsByUserId(userId).then((res) => {
      const _res = res.sort((a,b) => b.timestamp - a.timestamp)
      setData(_res)
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
            justifyContent="center"
            alignItems="center"
            style={{
              background: "#000"
            }}
            paddingLeft="8vw"
            paddingRight="8vw"
          >
            <Button onClick={() => {setOpenDes(!openDes)}} style={style} color="white" size="large">
              {openDes? (<ArrowDropUpIcon style={{ color: 'white' }}/>):(<ArrowDropDownIcon style={{ color: 'white' }}/>)}
              Description  
            </Button>
            {openDes ? (
              <div style = {descriptionBox} >
                <Grid >
                  <p style = {{fontWeight: '900',marginTop: '0em', marginBottom: '1em'}}>{cap[0]}</p>
                  <p style = {{fontWeight: '700',marginTop: '0em', marginBottom: '0em'}}>{intro[0][0]}</p>
                  <p style = {{fontWeight: '500', color: 'gray'}}>{intro[0][1]}</p>
                  <p style = {{fontWeight: '700',marginTop: '0em', marginBottom: '0em'}}>{intro[1][0]}</p>
                  <p style = {{fontWeight: '500', color: 'gray'}}>{intro[1][1]}</p>
                  <p style = {{fontWeight: '700',marginTop: '0em', marginBottom: '0em'}}>{intro[2][0]}</p>
                  <p style = {{fontWeight: '500', color: 'gray'}}>{intro[2][1]}</p>
                  <p style = {{fontWeight: '700',marginTop: '0em', marginBottom: '0em'}}>{intro[3][0]}</p>
                  <p style = {{fontWeight: '500', color: 'gray'}}>{intro[3][1]}</p>
                  <p style = {{fontWeight: '700',marginTop: '0em', marginBottom: '0em'}}>{intro[4][0]}</p>
                  <p style = {{fontWeight: '500', color: 'gray'}}>{intro[4][1]}</p>
                  <p style = {{fontWeight: '900',marginTop: '0em', marginBottom: '1em'}}>{cap[1]}</p>
                  <p style = {{fontWeight: '700',marginTop: '0em', marginBottom: '0em'}}>{steps[0][0]}</p>
                  <p style = {{fontWeight: '500', color: 'gray'}}>{steps[0][1]}</p>
                  <p style = {{fontWeight: '700',marginTop: '0em', marginBottom: '0em'}}>{steps[1][0]}</p>
                  <p style = {{fontWeight: '500', color: 'gray'}}>{steps[1][1]}</p>
                  <p style = {{fontWeight: '700',marginTop: '0em', marginBottom: '0em'}}>{steps[2][0]}</p>
                  <p style = {{fontWeight: '500', color: 'gray'}}>{steps[2][1]}</p>
                  <p style = {{fontWeight: '400', color: 'gray', marginLeft: '1em'}}>{steps[2][2][0]}</p>
                  <p style = {{fontWeight: '400', color: 'gray', marginLeft: '1em'}}>{steps[2][2][1]}</p>
                  <p style = {{fontWeight: '400', color: 'gray', marginLeft: '1em'}}>{steps[2][2][2]}</p>
                  <p style = {{fontWeight: '700',marginTop: '0em', marginBottom: '0em'}}>{steps[3][0]}</p>
                  <p style = {{fontWeight: '500', color: 'gray'}}>{steps[3][1]}</p>
                </Grid>
            </div>
            ) : (<></>)}
          </Grid>
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
                    userId = {userId}
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