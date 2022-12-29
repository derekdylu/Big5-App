import React from 'react'
import Navigation from '../Components/Navigation'

import theme from '../Themes/Theme';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import logo from '../Images/logo.png'

const content_a = [
  "What's 5ee you",
  "5ee you is a web-based application specially designed for mobile. Utilizing our machine learning model, It provides instant prediction of Big Five personality based on a 15 seconds clip containing the user's face. The five traits are openness to experience (O), conscientiousness (C), extraversion (E), agreeableness (A), and  neuroticism (N). Besides, 5ee you also calculate an overall score from those values."
]

const content_b = [
  "Terms of use",
  "(1) This application serves as a research preview of machine learning model, all generated predictions can not be a valid record or document on any field, including human resourcing, psychology, or medicine. (2) The accuracy of prediction may varied from different lighting conditions or device settings. It may also be invalid because user's face doesnt't fully stay in the frame or there're more than one clear face in the frame. (3) 5ee you uses video-only material, no sound will be recorded. (4) By logging in you agreeing to our terms of use and the use of cookies. (5) We may make changes to our terms of use in the future."
]

const content_c = [
  "Restrictions",
  "In this version, only developers can log in through Google SSO, the others can only log in as guest. Further update will bring more functions related to maintaining account."
]

const content_d = [
  "",
  "v0.5 (Research Preview)"
]

const About = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{ background: "#000", width: "100%", height: "auto" }}
      >
        <Navigation />
        <Typography variant="h2" color={theme.palette.white.main} sx={{ fontWeight: '700', mt: 8, ml: 3, mr: 10}}>
          About
        </Typography>
        <Grid
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 4, ml: 3}}
        >
          <Typography variant="body1" color={theme.palette.white.main} sx={{ fontWeight: '700' }}>
            {content_a[0]}
          </Typography>
          <Typography variant="body2" color={theme.palette.white.main} sx={{ fontWeight: '500', mt: 1, mr: 10}}>
            {content_a[1]}
          </Typography>
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 4, ml: 3}}
        >
          <Typography variant="body1" color={theme.palette.white.main} sx={{ fontWeight: '700' }}>
            {content_b[0]}
          </Typography>
          <Typography variant="body2" color={theme.palette.white.main} sx={{ fontWeight: '500', mt: 1, mr: 10}}>
            {content_b[1]}
          </Typography>
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 4, ml: 3}}
        >
          <Typography variant="body1" color={theme.palette.white.main} sx={{ fontWeight: '700' }}>
            {content_c[0]}
          </Typography>
          <Typography variant="body2" color={theme.palette.white.main} sx={{ fontWeight: '500', mt: 1, mr: 10}}>
            {content_c[1]}
          </Typography>
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 4, ml: 3}}
        >
          <Typography variant="body1" color={theme.palette.white.main} sx={{ fontWeight: '700' }}>
            {content_d[0]}
          </Typography>
          <Typography variant="body2" color={theme.palette.white.main} sx={{ fontWeight: '500', mt: 1, mr: 10}}>
            {content_d[1]}
          </Typography>
        </Grid>
        <Grid sx={{ml: 3, my: 4}}>
          <img src={logo} width="100" />
        </Grid>
      </Grid>
    </>
  )
}

export default About