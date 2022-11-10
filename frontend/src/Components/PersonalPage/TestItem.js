import React, { useState, useRef, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import ScoreBar from '../EntireResult/ScoreBar';
import PureBar from '../EntireResult/PureBar'

const TestItem = ({date, big}) => {
    const c = ['#33B3FC', '#C856FD', '#FCCA37', '#4ED333', '#F14581']
    const itemObj = {
        backgroundColor: 'white',
        borderRadius: '50px',
        width: '95%',
        paddingLeft: '25px',
        marginBottom: '15px',
    };

    const Transition = React.forwardRef(
        function Transition(props, ref) {
            return <Slide direction="up" ref={ref} {...props} />;
    });
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        console.log('div clicked');
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const OCEAN = ["OPENESS", "CONSCIENTIOUS", "EXTRAVERSION", "AGREEABLENESS","NEUROTICISM"];
    const biggerFontStyle = {
        fontSize: 24,
    }

    return(
        <>
            <div style = {itemObj} onClick = {handleClickOpen}>
                <Grid 
                    container spacing={2}
                >
                    <Grid item xs={8}>
                        <p style = {{fontWeight: '700'}}>Interview testing</p>
                        <p style = {{color: 'gray', fontWeight: '500'}}>{date}</p>
                    </Grid>
                    <Grid 
                        item xs={4}
                        container
                        direction="column"
                        justifyContent="center"
                    >
                        {
                            big.map((b, id) => 
                                <PureBar pro = {b} color = {c[id]} h = {7}/>
                            )
                        }
                    </Grid>
                </Grid>
            </div>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
                TransitionComponent={Transition}
            >
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
                        
                        <Box display="flex" justifyContent="space-around">
                            <Button>ADD NOTE</Button>
                            <Button>EXPORT AS IMAGE</Button>
                        </Box> 
                    </Box>
                </>  
            </Dialog>
        </>
            
    )
}
export default TestItem