import React, { useState, useRef, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ScoreBar from './ScoreBar';
import Graph from './Graph';
// import {useNavigate} from 'react-router-dom';

const EntireResult = ({handleClose, date, big}) => {

    const OCEAN = ["OPENESS", "CONSCIENTIOUS", "EXTRAVERSION", "AGREEABLENESS","NEUROTICISM"];
    const biggerFontStyle = {
        fontSize: 24,
    }

    return(
        <>
            <Box 
                display="flex" 
                justifyContent="space-around"
            >
                <IconButton 
                    aria-label="back"
                    size='large'
                    onClick = {handleClose}
                >
                    <ArrowBackIosIcon style={{ color: '#E5E7E9' }}/>
                </IconButton>
                <IconButton 
                    aria-label="delete"
                    size='large'
                    onClick = {handleClose}
                >
                    <ArrowForwardIosIcon style={{ color: '#E5E7E9' }}/>
                </IconButton>
            </Box>
            <Box
                sx={{
                    mx: 10,
                    backgroundColor: '#E5E7E9', 
                    '&:hover': {
                        backgroundColor: '#F2F3F4',
                        opacity: [0.9, 0.8, 0.7],
                    },
                    borderRadius: '30px',
                    padding: '20px',
                    fontWeight: 'bold',
                }}
            >
                <p style = {biggerFontStyle}>Interview testing</p>
                <p style = {{color: "gray"}}>{date}</p>
                {
                    big.map((s, id) => 
                        <ScoreBar score = {s} id = {id}/>
                    )
                }
                <Grid 
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    {
                        OCEAN.map((s, id) => 
                            <p> {s} <span style = {biggerFontStyle}>{big[id]}</span></p>
                        )
                    }
                </Grid>
                <p style = {{color: "gray"}}>{date}</p>
                <p style = {{color: "gray"}}>{date}</p>
                <p style = {{color: "gray"}}>{date}</p>
                <Box display="flex" justifyContent="space-around">
                    <Button>ADD NOTE</Button>
                    <Button>EXPORT AS IMAGE</Button>
                </Box> 
            </Box>
        </>  
    )
}

export default EntireResult