import React, { useState, useRef, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import { updateInterviewById, getInterviewById } from '../../Utils/Axios';

import ScoreBar from '../EntireResult/ScoreBar';
import ShowChart from './ShowChart';
// import Graph from './Graph';

import html2canvas from "html2canvas";

const EntireResult = ({ date, big, industry, handleClose}) => {

    const OCEAN = ["OPENESS", "CONSCIENTIOUS", "EXTRAVERSION", "AGREEABLENESS","NEUROTICISM"];
    
    const [openNote, setOpenNOte] = useState(false);
    const [readOnly, setReadOnly] = useState(true);
    const [note, setNote] = useState('')

    // useEffect(() => {
    //     getInterviewById(interview.id).then((res) => {
    //         setNote(res)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }, [])

    const handleOnClickAddNote = () => {
        setOpenNOte(true);
        setReadOnly(false);
    }
    const handleOnClickDelNote = () => {
        setOpenNOte(false);
    }

    const editNoteOn = () => {
        setReadOnly(false)
    }
    const editNoteOff = () => {
        setReadOnly(true)
        // updateInterviewById(interview.id, null, null, null, null, null, note)
        //     .then()
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }

    const handleChange = (event) => {
        setNote(event.target.value);
    };
    

    const exportRef = useRef();

    const downloadImage = (blob, fileName) => {
        const fakeLink = window.document.createElement("a");
        fakeLink.style = "display:none;";
        fakeLink.download = fileName;
        
        fakeLink.href = blob;
        
        document.body.appendChild(fakeLink);
        fakeLink.click();
        document.body.removeChild(fakeLink);
        
        fakeLink.remove();
    };

    const exportAsImage = async (el, imageFileName) => {
        const canvas = await html2canvas(el);
        const image = canvas.toDataURL("image/png", 1.0);
        downloadImage(image, imageFileName);
    };

    return(
        <>
            <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="center"
                style={{
                    background: "#000"
                }}
                paddingTop='16px'
                paddingBottom='32px'
            >
                <Grid 
                    display="flex" 
                    width="90vw"
                    justifyContent="space-around"
                    alignItems="stretch"
                    marginBottom='0.5vh'
                >
                    <IconButton 
                        aria-label="back"
                        size='large'
                        // onClick={handleLast}
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
                        // onClick={handleNext}
                    >
                        <ArrowForwardIosIcon style={{ color: '#E5E7E9' }}/>
                    </IconButton>
                </Grid>
                <Grid
                    className='resultBox'
                    ref={exportRef}
                    sx={{
                        backgroundColor: '#FFFFFF', 
                        borderRadius: '30px',
                        fontWeight: 'bold',
                        pb: 1
                    }}
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="center"
                    width='80vw'
                    marginTop='0.5vh'
                >
                    <p style = {{ fontSize: 20, marginBlockEnd: '0em' }}
                    >Interview testing</p>
                    <p style = {{ color: "#5C5C5C", marginBlockStart: '0em'}}
                    >{date}</p>
                    {
                        big.map((s, id) => 
                            <ScoreBar score = {s} id = {id}/>
                        )
                    }
                    <Grid
                        container
                        direction="column"
                    >
                        <ShowChart 
                            industry = { industry }
                            big5 = { big }                        
                        />
                    </Grid>
                    
                    { openNote ? (
                        <>
                        <Grid
                            display="flex" 
                            justifyContent="space-around"
                            marginTop='2vh'
                        >
                            
                            { readOnly ? (
                                <Button onClick={editNoteOn} color="black">EDIT</Button>
                            ):(
                                <Button onClick={editNoteOff} color="black">SAVE</Button>
                            )}
                            <Button onClick={handleOnClickDelNote} color="warning">DELETE</Button>
                        </Grid>
                        <Grid
                            display="flex" 
                            justifyContent="space-around"
                            marginTop='2vh'
                            marginBottom='2vh'
                            paddingLeft='5vw'
                            paddingRight='5vw'
                        >
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: -1, width: '65vw' },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <TextField
                                    multiline
                                    variant="outlined"
                                    defaultValue=""
                                    value={note}
                                    onChange={handleChange}
                                    InputProps={{
                                        readOnly: readOnly,
                                    }}
                                />
                            </Box>
                        </Grid>
                        </>
                        ):(
                        <Grid 
                            display="flex" 
                            justifyContent="space-around"
                            marginTop='2vh'
                        >
                            <Button onClick={handleOnClickAddNote} color="black">ADD NOTE</Button>
                        </Grid>
                    )}
                    <Button onClick={() => exportAsImage(exportRef.current, "test")} color="black">EXPORT</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default EntireResult