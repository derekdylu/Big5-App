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

import './TestItem.css'

const Transition = React.forwardRef(
    function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
});
const c = ['#4FC1E8', '#AC92EB', '#FFCE54', '#A0D568', '#ED5564']

const TestItem = ({date, big}) => {
    const itemObj = {
        backgroundColor: '#FFFFFF',
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

    return(
        <>
            <div style = {itemObj} >
                <Grid 
                    container spacing={2}
                    onClick = {handleClickOpen}
                    cursor = 'pointer'
                    className='testItem'
                >
                    <Grid item xs={7}>
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
                                <PureBar pro = {b} color = {c[id]} h = {7} run = {false}/>
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