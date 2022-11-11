import React, { useState, useRef, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ScoreBar from '../EntireResult/ScoreBar';
// import {useNavigate} from 'react-router-dom';

const EntireResult = ({handleClose, date, big}) => {

    const OCEAN = ["OPENESS", "CONSCIENTIOUS", "EXTRAVERSION", "AGREEABLENESS","NEUROTICISM"];

    return(
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
        >
            <Grid 
                display="flex" 
                width="90vw"
                justifyContent="space-around"
                alignItems="stretch"
            >
                <IconButton 
                    aria-label="back"
                    size='large'
                >
                    <ArrowBackIosIcon style={{ color: '#E5E7E9' }}/>
                </IconButton>
                <IconButton 
                    aria-label="back"
                    size='large'
                    onClick = {handleClose}
                >
                    <DeleteIcon style={{ color: '#ED5564' }}/>
                </IconButton>
                <IconButton 
                    aria-label="delete"
                    size='large'
                >
                    <ArrowForwardIosIcon style={{ color: '#E5E7E9' }}/>
                </IconButton>
            </Grid>
            <Grid
                sx={{
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '30px',
                    fontWeight: 'bold',
                }}
                container
                direction="column"
                justifyContent="start"
                alignItems="center"
                width='80vw'
            >
                <p 
                    style = {{ fontSize: 20, marginBlockEnd: '0em' }}
                >Interview testing</p>
                <p 
                    style = {{ color: "#5C5C5C", marginBlockStart: '0em'}}
                >{date}</p>
                {
                    big.map((s, id) => 
                        <ScoreBar score = {s} id = {id}/>
                    )
                }
                <Grid 
                    display="flex" 
                    justifyContent="space-around"
                >
                    <Button>ADD NOTE</Button>
                    <Button>EXPORT AS IMAGE</Button>
                </Grid> 
            </Grid>
        </Grid>  
    )
}

export default EntireResult