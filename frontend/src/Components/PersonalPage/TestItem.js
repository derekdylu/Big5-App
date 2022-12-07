import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import theme from '../../Themes/Theme';

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
import EntireResult from '../EntireResult/EntireResult';

const Transition = React.forwardRef(
    function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
});
const c = ['#4FC1E8', '#AC92EB', '#FFCE54', '#A0D568', '#ED5564']

const TestItem = ({interview}) => {
    const itemObj = {
        backgroundColor: '#FFFFFF',
        borderRadius: '50px',
        width: '90%',
        marginTop: '1vh',
        marginBottom: '1vh',
        paddingLeft: '8vw',
    };
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <>
            <div style = {itemObj} className='testItem'>
                <Grid 
                    container spacing={2}
                    onClick = {handleClickOpen}
                    cursor = 'pointer'
                >
                    <Grid item xs={7}>
                        <p style = {{fontWeight: '700', marginBottom: '-0.5em'}}>Interview testing</p>
                        <p style = {{color: 'gray', fontWeight: '500'}}>{interview.timestamp}</p>
                    </Grid>
                    <Grid 
                        item xs={4}
                        container
                        direction="column"
                        justifyContent="center"
                    >
                        {
                            interview.big.map((b, id) => 
                                <PureBar pro = {b} color = {c[id]}/>
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
                    date = {interview.timestamp}
                    big = {interview.big}
                    industry = {interview.industry}
                    // handleLast = {handleLast}
                    // handleNext = {handleNext}
                    handleClose = {handleClose}  
                />  
                {/* <Link to={`/interview/id/${id}`} >
                    <EntireResult
                        date = {interview.timestamp}
                        big = {interview.big}
                        industry = {interview.industry}
                        // handleLast = {handleLast}
                        // handleNext = {handleNext}
                        handleClose = {handleClose}  
                    />  
                </Link> */}
            </Dialog>
        </>
    )
}
export default TestItem