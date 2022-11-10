import React, { useState, useRef, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ScoreBar from './ScoreBar';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from 'react-router-dom';

const EntireResult = () => {

    const date = "2022/11/07"
    const scores = [87, 23, 50, 41, 72]
    const OCEAN = ["OPENESS", "CONSCIENTIOUS", "EXTRAVERSION", "AGREEABLENESS","NEUROTICISM"];
    const biggerFontStyle = {
        fontSize: 24,
    }

    const navigate = useNavigate();

    return(
        <>
            <Box 
                display="flex" 
                justifyContent="space-around"
            >
                <IconButton 
                    aria-label="back"
                    size='large'
                    onClick = {() => navigate('/profile')}
                >
                    <ArrowBackIosIcon style={{ color: '#E5E7E9' }}/>
                </IconButton>
                <IconButton 
                    aria-label="delete"
                    size='large'
                >
                    <DeleteIcon style={{ color: 'red' }}/>
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
                    scores.map((s, id) => 
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
                            <p> {s} <span style = {biggerFontStyle}>{scores[id]}</span></p>
                        )
                    }
                </Grid>
                
                <Box display="flex" justifyContent="space-around">
                    <Button>ADD NOTE</Button>
                    <Button>EXPORT AS IMAGE</Button>
                </Box> 
            </Box>
        </>  
    )
}

export default EntireResult