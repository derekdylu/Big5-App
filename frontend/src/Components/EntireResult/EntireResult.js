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

import ScoreBar from '../EntireResult/ScoreBar';
import Graph from './Graph';

import html2canvas from "html2canvas";

const EntireResult = ({handleLast, handleNext, handleClose, date, big, dates, bigs, page}) => {

    const OCEAN = ["OPENESS", "CONSCIENTIOUS", "EXTRAVERSION", "AGREEABLENESS","NEUROTICISM"];

    const [openNote, setOpenNOte] = useState(false);
    const [readOnly, setReadOnly] = useState(true);

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
    }

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
                height="100vh"
                width="100vw"
                style={{
                    background: "#000"
                }}
                paddingTop='5vh'
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
                        onClick={handleLast}
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
                        onClick={handleNext}
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
                    >{dates[page]}</p>
                    {
                        bigs[page].map((s, id) => 
                            <ScoreBar score = {s} id = {id}/>
                        )
                    }
                    <Grid
                        container
                        direction="column"
                        justifyContent="start"
                        alignItems="start"
                        width='80vw'
                        marginTop='0.5vh'
                    >
                        <Graph/>
                    </Grid>
                     
                    { openNote ? (<>
                        <Grid
                            display="flex" 
                            justifyContent="space-around"
                            marginTop='2vh'
                        >
                            { readOnly ? (
                                <Button onClick={editNoteOn}>EDIT</Button>
                            ):(
                                <Button onClick={editNoteOff}>SAVE</Button>
                            )}
                            <Button onClick={handleOnClickDelNote}>DELETE</Button>
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
                                    InputProps={{
                                        readOnly: readOnly,
                                    }}
                                />
                            </Box>
                        </Grid>
                        </>):(
                        <Grid 
                            display="flex" 
                            justifyContent="space-around"
                            marginTop='3vh'
                            marginBottom='2vh'
                        >
                            <Button onClick={handleOnClickAddNote}>ADD NOTE</Button>
                        </Grid>
                    )}
                    <Button 
                        onClick={() => exportAsImage(exportRef.current, "test")}
                        style = {{marginBottom: '2vh'}}
                    >EXPORT AS IMAGE</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default EntireResult