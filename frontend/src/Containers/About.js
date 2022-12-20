import React from 'react'
import Navigation from '../Components/Navigation'

import theme from '../Themes/Theme';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import logo from '../Images/logo.png'

const who = [
  "Who we are",
  "At 5ee you, we are committed to maintaining the trust and confidence of all visitors to our web site. In particular, we want you to know that [5ee you] is not in the business of selling, renting or trading email lists with other companies and businesses for marketing purposes. In this Privacy Policy, we’ve provided detailed information on when and why we collect personal information, how we use it, the limited conditions under which we may disclose it to others, and how we keep it secure. We take your privacy seriously and take measures to provide all visitors and users of 5ee you with a safe and secure environment."
]

const data = [
  "Data usage",
  "We won't exploit your personal information related data. According to ..."
]

const account = [
  "Account",
  "In beta version, only developers can log in through Google SSO, the rest common users can only log in as guest. Further update will bring more functions."
]

const change = [
  "Changes to our policy",
  "We may make changes to our Privacy Policy in the future, however, the most current version of the policy will govern our processing of your personal data and will always be available to you. If we make a change to this policy that, in our sole discretion, is material, we will notify you by an update or email, where possible. By continuing to access or use our services, you agree to be bound to the terms of our Privacy Policy."
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
        <Typography variant="h2" color={theme.palette.white.main} sx={{ fontWeight: '500', mt: 8, ml: 3, mr: 10}}>
          Pricacy Policy
        </Typography>
        <Grid
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 4, ml: 3}}
        >
          <Typography variant="body1" color={theme.palette.white.main} sx={{ fontWeight: '500' }}>
            {who[0]}
          </Typography>
          <Typography variant="body2" color={theme.palette.white.main} sx={{ fontWeight: '500', mt: 1, mr: 10}}>
            {who[1]}
          </Typography>
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 4, ml: 3}}
        >
          <Typography variant="body1" color={theme.palette.white.main} sx={{ fontWeight: '500' }}>
            {data[0]}
          </Typography>
          <Typography variant="body2" color={theme.palette.white.main} sx={{ fontWeight: '500', mt: 1, mr: 10}}>
            {data[1]}
          </Typography>
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 4, ml: 3}}
        >
          <Typography variant="body1" color={theme.palette.white.main} sx={{ fontWeight: '500' }}>
            {account[0]}
          </Typography>
          <Typography variant="body2" color={theme.palette.white.main} sx={{ fontWeight: '500', mt: 1, mr: 10}}>
            {account[1]}
          </Typography>
        </Grid>
        <Grid
          item
          direction="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          sx={{ mt: 4, ml: 3}}
        >
          <Typography variant="body1" color={theme.palette.white.main} sx={{ fontWeight: '500' }}>
            {change[0]}
          </Typography>
          <Typography variant="body2" color={theme.palette.white.main} sx={{ fontWeight: '500', mt: 1, mr: 10}}>
            {change[1]}
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