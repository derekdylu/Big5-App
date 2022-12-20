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
import CircularProgress from '@mui/material/CircularProgress';

import ScoreBar from '../EntireResult/ScoreBar';
import PureBar from '../EntireResult/PureBar'
import EntireResult from '../EntireResult/EntireResult';

import { getInterviewById } from '../../Utils/Axios';

const Transition = React.forwardRef(
    function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
});
const c = ['#4FC1E8', '#AC92EB', '#FFCE54', '#A0D568', '#ED5564']

const TestItem = ({userId, interview, interviews, setInterviews}) => {

    useEffect(() => {
        getInterviewById(interview._id).then((res) => {
            // console.log('score', res.score)
            if(res.score === -1){
                setLoading(true)
            } else {
                setLoading(false)
            }
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const itemObj = {
        backgroundColor: '#FFFFFF',
        borderRadius: '50px',
        width: '90%',
        marginTop: '1vh',
        marginBottom: '1vh',
        paddingLeft: '8vw',
        cursor: 'pointer'
    };
    
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const changeDateFormat = (timestamp) => {
        var result = new Date(parseInt(timestamp))
        let arr = result.toString().split(' ')
        let newFormat = arr[3] + ' ' + arr[1] + ' ' + arr[2]
        return newFormat
    }

    const handleClose = () => {
        // navigate('/');
        // window.location.reload();
        setOpen(false);
    };

    return(
        <>
            <div style = {itemObj} className='testItem'>
                <Grid 
                    container spacing={2}
                    onClick = {() => {setOpen(true)}}
                    marginTop = '0px'
                >
                    <Grid item xs={7}>
                        <p style = {{fontWeight: '700',marginTop: '0em', marginBottom: '0em'}}>{interview.topic}</p>
                        <p style = {{color: 'gray', fontWeight: '500'}}>{changeDateFormat(interview.timestamp)}</p>
                    </Grid>
                    { loading ? 
                        (<Grid 
                            item xs={4}
                            container
                            direction="column"
                            justifyContent="center"
                            marginTop= '-1vh'
                            sx={{
                                ml: 2.5
                            }}
                        >
                            <CircularProgress/>
                        </Grid>)
                        :
                        (<Grid 
                            item xs={4}
                            container
                            direction="column"
                            justifyContent="center"
                            marginTop= '-2vh'
                            sx={{
                                
                            }}
                        >
                            {
                                interview.big.map((b, id) => 
                                    <PureBar pro = {b} color = {c[id]}/>
                                )
                            }
                        </Grid>)
                    }
                </Grid>
            </div>
            <Dialog
                fullScreen
                open={open}
                TransitionComponent={Transition}
            >
                <EntireResult
                    interview = {interview}
                    handleClose = {handleClose}
                    setInterviews = {setInterviews}
                    date = {changeDateFormat(interview.timestamp)}
                />  
            </Dialog>
        </>
    )
}
export default TestItem