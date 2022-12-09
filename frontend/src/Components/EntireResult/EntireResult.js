import React, { useState, useRef, useCallback, useEffect, Component } from 'react'
import { Link, useNavigate } from "react-router-dom";
import theme from '../../Themes/Theme';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { updateInterviewById, getInterviewById, deleteInterviewById } from '../../Utils/Axios';

import ScoreBar from '../EntireResult/ScoreBar';
import ShowChart from './ShowChart';
// import Graph from './Graph';

import html2canvas from "html2canvas";

// fake data
// const fake_interview_id1 = "639049dfdcc8d88496be5004";
// const fake_interview_id2 = "63904a41dcc8d88496be5005";
// const fake_interview_id3 = "6390517fdcc8d88496be5006";

// const interviews = [
//     {
//       _id: fake_interview_id1,
//       userId: "638cc603363b3cb6e72dacbf",
//       timestamp: "2022/09/04",
//       topic: "11111.....11111.....",
//       industry: "🎨 ART",
//       score: 111,
//       big: [33, 90, 100, 44, 76],
//       note: "This is note 1 .................",
//       link: "111"
//     },
//     {
//       _id: fake_interview_id2,
//       userId: "638cc603363b3cb6e72dacbf",
//       timestamp: "2022/10/08",
//       topic: "22222............22222............",
//       industry: "🎥 MEDIA",
//       score: 222,
//       big: [10, 48, 39, 85, 40],
//       note: "This is note 2 ....................",
//       link: "222"
//     },
//     {
//       _id: fake_interview_id3,
//       userId: "638cc603363b3cb6e72dacbf",
//       timestamp: "2022/11/19",
//       topic: "333",
//       industry: "🏗️ CIVIL ENGINEERING",
//       score: 333,
//       big: [78, 41, 9, 30, 57],
//       note: "This is note 3 .........................",
//       link: "333"
//     },
//   ]
  //===========================================================

const EntireResult = ({ interview, handleClose, setInterviews, date}) => {

    const OCEAN = ["OPENESS", "CONSCIENTIOUS", "EXTRAVERSION", "AGREEABLENESS","NEUROTICISM"];
    
    const [openNote, setOpenNOte] = useState(false);
    const [readOnly, setReadOnly] = useState(true);
    const [note, setNote] = useState(interview.note || '')
    const [delWindowOpen, setDelWindowOpen] = useState(false)

    useEffect(() => {
        getInterviewById(interview._id).then((res) => {
            setNote(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const handleEditTopic = () => {
        console.log('edit topic')
    }

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
        updateInterviewById(interview._id, interview.userId, interview.timestamp, interview.topic, interview.score, interview.big, interview.note)
            .then()
            .catch((err) => {
                console.log(err)
            })
    }

    const handleChange = (event) => {
        setNote(event.target.value);
    };
    
    const handleDelOpen = () => {
      console.log('delete interview')
      setDelWindowOpen(true)
   
    }

    const handleDelClose = () => {
        setDelWindowOpen(false)
    }

    const delInterview = () => {
        setDelWindowOpen(false)
        deleteInterviewById(interview._id).then((res) => {
        setInterviews(res)
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
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

    const currNote = interview.note;

    return(
        <>
            <Dialog
                open={delWindowOpen}
                onClose={handleDelClose}
            >
                <DialogTitle>
                {"Delete this interview record?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText>
                    You are going to discard this record, it can not be restore.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleDelClose} autoFocus variant="secondary2">
                    Cancel
                </Button>
                <Button onClick={delInterview} variant="secondary3">
                    <Link to="/" style={{ textDecoration: 'none', color: theme.palette.warning.main }}>
                    Delete
                    </Link>
                </Button>
                </DialogActions>
            </Dialog>
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
                    {/* <IconButton 
                        aria-label="back"
                        size='large'
                        // onClick={handleLast}
                    >
                        <ArrowBackIosIcon style={{ color: '#E5E7E9' }}/>
                    </IconButton> */}
                    <IconButton 
                        aria-label="back"
                        size='large'
                        onClick = {handleClose}
                    >
                        <HomeIcon style={{ color: 'white' }}/>
                    </IconButton>
                    <IconButton 
                        aria-label="back"
                        size='large'
                        onClick = {handleDelOpen}
                    >
                        <DeleteIcon style={{ color: '#ED5564' }}/>
                    </IconButton>
                    {/* <IconButton 
                        aria-label="delete"
                        size='large'
                        // onClick={handleNext}
                    >
                        <ArrowForwardIosIcon style={{ color: '#E5E7E9' }}/>
                    </IconButton> */}
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
                    paddingTop='2vh'
                >
                    <Grid 
                        display="flex" 
                        justifyContent="center"
                        alignItems="center"
                    >
                         <p style = {{ fontSize: 20, margin: '0px'}}>{interview.topic}</p>
                        <IconButton 
                            aria-label="back"
                            size='large'
                            onClick={handleEditTopic}
                        >
                            <CreateIcon style={{ color: 'black' }}/>     
                        </IconButton>
                    </Grid>
                   
                    <p style = {{ color: "#5C5C5C", marginBlockStart: '0em'}}
                    >{date}</p>
                    {
                        interview.big.map((s, id) => 
                            <ScoreBar score = {s} id = {id}/>
                        )
                    }
                    <Grid
                        container
                        direction="column"
                    >
                        <ShowChart 
                            industry = { interview.industry }
                            big5 = { interview.big }                        
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
                            <Button onClick={() => exportAsImage(exportRef.current, "test")} color="black">EXPORT</Button>
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
                                    defaultValue="note"
                                    value={interview.note}
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
                            <Button onClick={() => exportAsImage(exportRef.current, "test")} color="black">EXPORT</Button>
                        </Grid>
                    )}
                    
                </Grid>
            </Grid>
        </>
    )
}

export default EntireResult