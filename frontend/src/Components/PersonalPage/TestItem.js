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
import EntireResult from '../TestResultCard/EntireResult';

const Transition = React.forwardRef(
    function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
});

const TestItem = ({date, big}) => {
    const c = ['#33B3FC', '#C856FD', '#FCCA37', '#4ED333', '#F14581']
    const itemObj = {
        backgroundColor: 'white',
        borderRadius: '50px',
        width: '95%',
        paddingLeft: '25px',
        marginBottom: '15px',
    };
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        // console.log('div clicked');
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
            <div style = {itemObj} >
                <Grid 
                    container spacing={2}
                    onClick = {handleClickOpen}
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
                <EntireResult
                    handleClose = {handleClose}
                    date = {date}
                    big = {big}
                />  
            </Dialog>
        </>
    )
}
export default TestItem