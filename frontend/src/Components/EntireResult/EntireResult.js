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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { updateInterviewById, getInterviewById, deleteInterviewById } from '../../Utils/Axios';

import ScoreBar from '../EntireResult/ScoreBar';
import ShowChart from './ShowChart';

import html2canvas from "html2canvas";

const EntireResult = ({ interview, handleClose, setInterviews, date}) => {

    const OCEAN = ["OPENESS", "CONSCIENTIOUS", "EXTRAVERSION", "AGREEABLENESS","NEUROTICISM"];
    
    const [note, setNote] = useState('') 
    const [openNote, setOpenNote] = useState(false);
    const [readOnly, setReadOnly] = useState(false);
    const [delNoteWarning, setDelNoteWarning] = useState(false);
    const [topic, setTopic] = useState(interview.topic)
    const [topicEdit, setTopicEdit] = useState(false)
    const [delInterviewWarning, setDelInterviewWarning] = useState(false)
    
    useEffect(() => {
        // console.log('render')
        getInterviewById(interview._id).then((res) => {
            setTopic(res.topic)
            setNote(res.note)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    const updateNote = () => {
        setReadOnly(true)
        updateInterviewById(interview._id, null, null, null, null, null, null, note)
            .then()
            .catch((err) => {
                console.log(err)
            })
    }

    const delNote = () => {
        setDelNoteWarning(false)
        setNote('')
        updateInterviewById(interview._id, null, null, null, null, null, null, "")
            .then()
            .catch((err) => {
                console.log(err)
            })
    }
  
    const topicEditClose = () => {
        setTopicEdit(false)
        setTopic(interview.topic)
    }

    const delInterview = () => {
        setDelInterviewWarning(false)
        // console.log("id", interview._id)
        deleteInterviewById(interview._id).then((res) => {
            // setInterviews(res)
            // console.log(res)
            window.location.reload();
        }).catch((err) => {
            console.log(err)
        })
    }

    const editInterviewTopic = () => {
        setTopicEdit(false)
        updateInterviewById(interview._id, null, null, topic)
            .then()
            .catch((err) => {
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

    return(
        <>
            <Dialog
                open={delInterviewWarning}
            >
                <DialogContent>
                <DialogContentText>
                    You are going to discard this record, it can not be restored.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => {setDelInterviewWarning(false)}} autoFocus variant="secondary3">
                    Cancel
                </Button>
                <Button onClick={delInterview} variant="secondary3">
                    <Link to="/" style={{ textDecoration: 'none', color: theme.palette.warning.main }}>
                    Delete
                    </Link>
                </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={topicEdit}
            >
                <DialogTitle>
                    {"Set a New Topic"}
                </DialogTitle>
                <Grid
                    display="flex" 
                    flexDirection="column"
                    justifyContent="center"
                    marginTop='0vh'
                    marginBottom='0vh'
                    paddingLeft='5vw'
                    paddingRight='5vw'
                >
                    <TextField 
                        multiline
                        variant="outlined" 
                        value = {topic}
                        onChange={(e) => {setTopic(e.target.value)}}
                    />
                    <Grid
                        display="flex" 
                        flexDirection="row"
                        justifyContent="space-around"
                    >
                        <Button onClick={topicEditClose} autoFocus variant="secondary2">
                            Cancel
                        </Button>
                        <Button onClick={editInterviewTopic} autoFocus variant="secondary2">
                            Save
                        </Button>    
                    </Grid>
                </Grid>
            </Dialog>
            <Dialog
                open={delNoteWarning}
            >
                <DialogContent>
                <DialogContentText>
                    You are going to discard this note, it can not be restored.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => {setDelNoteWarning(false)}} autoFocus variant="secondary3">
                    Cancel
                </Button>
                <Button onClick={() => {
                    delNote();
                    setReadOnly(true);
                }} variant="secondary3" style={{color: "red"}}>Clear</Button>
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
                        onClick = {() => {setDelInterviewWarning(true)}}
                    >
                        <DeleteIcon style={{ color: '#ED5564' }}/>
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
                    paddingTop='2vh'
                >
                    <Grid 
                        display="flex" 
                        justifyContent="center"
                        alignItems="center"
                        height="24px"
                        sx={{mb: .75, mt: 1}}
                    >
                         <p style = {{ fontSize: 20, margin: '0px', textDecoration: "underline dotted grey !important"}} onClick={() => {setTopicEdit(true)}}>{topic}</p>
                    </Grid>
                    {/* <p style = {{ color: "#5C5C5C", marginBlockStart: '0em', fontSize: 12}}>{interview.industry}</p> */}
                    <p style = {{ color: "#5C5C5C", marginBlockStart: '0em', fontSize: 12}}
                    >{interview.industry} • {date}</p>
                    {
                        interview.big.map((s, id) => 
                            <ScoreBar score = {s} id = {id}/>
                        )
                    }
                    <ScoreBar score = {interview.score} id={5}/>
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
                            { readOnly &&
                                <Button onClick={() => { setOpenNote(false)}} color="black">HIDE</Button>
                            }
                            { readOnly ? (
                                <Button onClick={() => {setReadOnly(false)}} color="black">EDIT</Button>
                            ):(
                                <>
                                <Button onClick={updateNote} color="black">DONE</Button>
                                <Button onClick={() => {setDelNoteWarning(true)}} color="warning">CLEAR</Button>
                                </>
                            )}
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
                                    // label="My Note" 
                                    variant="outlined" 
                                    defaultValue="Add/Edit Note"
                                    value = {note}
                                    onChange={(e) => {setNote(e.target.value)}}
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
                            <Button 
                                onClick={() => {
                                    setOpenNote(true);
                                    // setReadOnly(false);
                                }} 
                                color="black"
                            >NOTE</Button>
                            <Button 
                                onClick={() => 
                                    exportAsImage(exportRef.current, `test${interview.topic}`)
                                } 
                                color="black"
                            >EXPORT</Button>
                        </Grid>
                    )}
                    
                </Grid>
            </Grid>
        </>
    )
}

export default EntireResult