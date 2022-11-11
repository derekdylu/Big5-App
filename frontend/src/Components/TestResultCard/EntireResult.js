import React, { useState, useRef, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import ScoreBar from '../EntireResult/ScoreBar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
// import {useNavigate} from 'react-router-dom';

const EntireResult = ({handleClose, date, big}) => {

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

    const saveAsImage = () => {
        console.log('save as image')
    }

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
                    { openNote ? (<>
                        <Grid
                            display="flex" 
                            justifyContent="space-around"
                            marginTop='3vh'
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
                                <div>
                                    <TextField
                                        multiline
                                        variant="outlined"
                                        defaultValue=""
                                        InputProps={{
                                            readOnly: readOnly,
                                        }}
                                    />
                                </div>
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
                    <Button onClick={saveAsImage}style = {{marginBottom: '2vh'}}>EXPORT AS IMAGE</Button>
                </Grid>
            </Grid>
        </>
    )
}

export default EntireResult