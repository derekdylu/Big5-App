import React from 'react'
import Navigation from '../Components/Navigation'

import theme from '../Themes/Theme';

import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';

import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import DriveFileRenameOutlineRoundedIcon from '@mui/icons-material/DriveFileRenameOutlineRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import KeyRoundedIcon from '@mui/icons-material/KeyRounded';

import DensitySmallRoundedIcon from '@mui/icons-material/DensitySmallRounded';
import RouteRoundedIcon from '@mui/icons-material/RouteRounded';
import AutoGraphRoundedIcon from '@mui/icons-material/AutoGraphRounded';

import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const Setting = () => {
  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        style={{ background: "#000", width: "100%", height: "100vh" }}
      >
        <Navigation />
        <Typography variant="h2" color={theme.palette.white.main} sx={{ fontWeight: '700', mt: 8, ml: 3, mr: 10}}>
          Settings
        </Typography>
        <Grid
          container
          direction="column"
          justifyContent="flex-start"
          alignItems="center"
          style={{ background: "#000", width: "100%", height: "auto" }}
          sx={{mt: 2}}
        >
        <Paper style={{background: "#000"}} sx={{ width: 320, maxWidth: '100%' }}>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <AccountCircleRoundedIcon style={{ color: '#fff' }}/>
              </ListItemIcon>
              <ListItemText style={{color: "#fff"}}>Change Profile Photo</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <DriveFileRenameOutlineRoundedIcon style={{ color: '#fff' }}/>
              </ListItemIcon>
              <ListItemText style={{color: "#fff"}}>Change Username</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <EmailRoundedIcon style={{ color: '#fff' }}/>
              </ListItemIcon>
              <ListItemText style={{color: "#fff"}}>Change Email</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <KeyRoundedIcon style={{ color: '#fff' }}/>
              </ListItemIcon>
              <ListItemText style={{color: "#fff"}}>Change Password</ListItemText>
            </MenuItem>
            <Divider sx={{ bgcolor: "#fff" }} />
            <MenuItem>
              <ListItemIcon>
                <DensitySmallRoundedIcon style={{ color: '#fff' }}/>
              </ListItemIcon>
              <ListItemText style={{color: "#fff"}}>All Tests</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <RouteRoundedIcon style={{ color: '#fff' }}/>
              </ListItemIcon>
              <ListItemText style={{color: "#fff"}}>My Activities</ListItemText>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <AutoGraphRoundedIcon style={{ color: '#fff' }}/>
              </ListItemIcon>
              <ListItemText style={{color: "#fff"}}>My Statistics</ListItemText>
            </MenuItem>
            <Divider sx={{ bgcolor: "#fff" }} />
            <MenuItem>
              <ListItemIcon>
                <DeleteForeverRoundedIcon style={{ color: '#ED5564' }}/>
              </ListItemIcon>
              <ListItemText style={{color: "#ED5564"}}>Delete My Account</ListItemText>
            </MenuItem>
          </MenuList>
        </Paper>
        </Grid>
      </Grid>
    </>
  )
}

export default Setting