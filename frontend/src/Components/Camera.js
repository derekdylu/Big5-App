import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Webcam from "react-webcam";
import { useStopwatch } from 'react-timer-hook';
import theme from '../Themes/Theme';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';
import BrushIcon from '@mui/icons-material/Brush';
import ApiIcon from '@mui/icons-material/Api';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

import useWindowDimensions from '../Hooks/useWindowDimensions'

const questions = [
  "請你簡單的自我介紹。",
  "請簡述你昨天做了什麼事。",
  "請分享一個有趣事件。",
  "請分享一個有趣的旅遊經驗。",
  "請介紹一位你尊敬的人。",
  "租房子時你會考量什麼？",
  "你對於在國外生活有什麼想法？",
  "你認為第一印象重要嗎？",
  "你會想用時光機做什麼？",
  "你對元宇宙的概念有什麼想法？",
  "請隨意説說～"
]
const randomNumber = Math.random() * questions.length
const index = Math.floor(randomNumber)

const industriesList = [
  "🎨 ART",
  "🛠️ ENGINEERING",
  "💻 SOFTWARE",
  "🏗️ CIVIL ENGINEERING",
  "💼 CONSULTANTING",
  "👥 MANAGEMENT",
  "⚽️ SPORTS",
  "🎥 MEDIA",
  "🏭 MANUFACTURING"
]

const StyledLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  barColorPrimary: {
    backgroundColor: "#00D1FF",
  }
})(LinearProgress);

const Camera = (expiryTimestamp) => {
  const [progress, setProgress] = useState(0);
  const { width } = useWindowDimensions()
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [login, setLogin] = useState(false);
  const [industry, setIndustry] = useState('--');
  const [complete, setComplete] = useState(false)
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  useEffect(() => {
    if (localStorage.getItem('user')) {
      setLogin(true)
    }
  }, [])

  useEffect(() => {
    setProgress(seconds*100/15)
    seconds > 15 && handleCompleteCapture()
  }, [seconds])

  const handleCompleteCapture = useCallback(() => {
    pause()
    reset()
    pause()
    mediaRecorderRef.current.stop();
    setCapturing(false);
    setComplete(true);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleRetake = () => {
    window.location.reload(false);
  }

  const handleConfirm = () => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      console.log("video detected", blob)
      // await fs.writeFile(mp4Blob, Buffer.from(webmToMp4(await fs.readFile(blob))));
      
      // const url = URL.createObjectURL(mp4Blob);
      // const a = document.createElement("a");
      // document.body.appendChild(a);
      // a.style = "display: none";
      // a.href = url;
      // a.download = "react-webcam-stream-capture.webm";
      // a.click();
      // window.URL.revokeObjectURL(url);
      
      setRecordedChunks([]);
    } else {
      console.log("no video detected")
    }
  }

  const videoConstraints = {
    width: width - 32,
    height: ((width - 32)/3) * 4,
    facingMode: "user"
  }

  const handleStartCaptureClick = useCallback(() => {
    start()
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: "video/webm"
    });
    mediaRecorderRef.current.addEventListener(
      "dataavailable",
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = useCallback(() => {
    pause()
    reset()
    pause()
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "react-webcam-stream-capture.webm";
      a.click();
      window.URL.revokeObjectURL(url);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>
          {"Are you sure?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            You are going to discard this clip, it can not be restore.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus variant="secondary2">
            Cancel
          </Button>
          <Link to="/">
            <Button onClick={handleClose} variant="secondary3">
              Discard
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
      {
        login && 
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            width="100vw"
            style={{
              background: "#000",
            }}
          >
            { 
              !complete &&
              <Typography variant="body1" sx={{color: '#ffffff', mb: 1}}>
                {questions[index]}
              </Typography>
            }
            <Box sx={{ width: videoConstraints.width, mb: -1 }}>
              <StyledLinearProgress variant="determinate" value={progress} />
              <StyledLinearProgress variant="determinate" value={progress} />
            </Box>
            <Grid item width={videoConstraints.width} height={videoConstraints.height}>
              {
                complete ?
                (
                  <>
                    <Typography variant="body1" sx={{ color: '#fff'}}>
                      Select your purpose (industry)
                    </Typography>
                    {/* <Paper elevation={0} style={{maxWidth: '100vw', background: 'transparent', overflow: 'hidden'}}> */}
                      <Stack
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={1}
                        sx={{mt:1.5}}
                        style={{overflow: 'auto'}}
                      >
                        {industriesList.map(x => 
                          <Chip label={x} style={{background: industry === x ? theme.palette.primary.main : theme.palette.white.main, color: industry === x ? theme.palette.white.main : theme.palette.grey[700]}} onClick={() => setIndustry(x)} />
                        )}
                      </Stack>
                    {/* </Paper> */}
                  </>
                ):(
                  <Webcam audio={false} ref={webcamRef} videoConstraints={videoConstraints}/>
                )
              }
            </Grid>
            <Grid item>
              <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                sx={{
                  mt: 2
                }}
              >
                
                <IconButton aria-label="back" size="large" sx={{mr: 4}} onClick={handleClickOpen}>
                  <ArrowBackIosRoundedIcon fontSize="inherit" color="white"/>
                </IconButton>
                
                {capturing ? (
                  <Button variant="secondary2" onClick={handleStopCaptureClick}>Cancel</Button>
                ) : 
                  <>
                  {
                    complete ? (
                      <Button variant="secondary2" onClick={handleConfirm}>Confirm</Button>
                    ):(
                      <Button variant="secondary2" onClick={handleStartCaptureClick}>Record</Button>
                    )
                  }
                  </>
                }

                {
                  complete ?
                  <IconButton aria-label="reset" size="large" sx={{ml: 4}} onClick={handleRetake}>
                    <UndoRoundedIcon fontSize="inherit" color="white"/>
                  </IconButton>
                  :
                  <IconButton aria-label="reset" size="large" sx={{ml: 4}}>
                    <UndoRoundedIcon fontSize="inherit" color="black"/>
                  </IconButton>
                }
              </Grid>
            </Grid>
          </Grid>
      }
      
    </>
  )
}

export default Camera