import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Webcam from "react-webcam";
import { useStopwatch } from 'react-timer-hook';
import theme from '../Themes/Theme';
import AWS from 'aws-sdk';
import { postInterview, testInterview } from '../Utils/Axios';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from '@mui/material/CircularProgress';
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


// const S3_BUCKET = "imp-big5";
// const REGION = "ap-northeast-1";

// AWS.config.update({
//   accessKeyId: "AKIASOAYAC7MCO7RLK5Y",
//   secretAccessKey: "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"
// })

// const myBucket = new AWS.S3({
//   params: { Bucket: S3_BUCKET},
//   region: REGION,
// })

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
  "💼 BUSINESS",
  "👥 MANAGEMENT",
  "⚽️ SPORT",
  "🎥 MEDIA",
  "🏭 MANUFACTURING",
  "🌿 FARMING",
  "🧑‍🏫 EDUCATION",
  "🏥 MEDICAL",
  "🍜 FOOD",
  "🤵 GOVERNMENT",
  "📈 FINANCE",
  "🔬 SCIENCE",
  "🚗 TRANSPORT",
  "🔋 ENERGY",
  "🪩 ENTERTAINMENT",
  "🧿 OTHER"
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
  const [uploading, setUploading] = useState(false)
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = useState({})
  const [s3Progress , setS3Progress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

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
      setUser(localStorage.getItem('user'))
      console.log("user is set to", user)
    }
  }, [])

  useEffect(() => {
    setProgress(seconds * 100 / 15)
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

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
  }

  const handleConfirm = () => {
    setUploading(true)
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: "video/webm"
      });
      const filename = JSON.parse(user)._id.toString() + Date.now().toString()
      // const params = {
      //   ACL: 'public-read',
      //   Body: blob,
      //   Bucket: S3_BUCKET,
      //   Key: filename
      // };

      // const link = "s3://" + S3_BUCKET + "/" + filename
      postInterview(JSON.parse(user)._id, Date.now().toString(), "new test", industry, -1, [0,0,0,0,0], "", "")
        .then((res) => {
          testInterview(res.id, blob)
          navigate("/");
        }).catch((err) => {
          console.log("err", err)
        })
  
      // myBucket.putObject(params)
      //   .on('httpUploadProgress', (evt) => {
      //     setS3Progress(Math.round((evt.loaded / evt.total) * 100))
      //   })
      //   .send((err) => {
      //     if (err) console.log(err)
      //   })
      
      setRecordedChunks([]);
    } else {
      console.log("no video detected")
      setUploading(false)
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
          <Button onClick={handleClose} variant="secondary3">
            <Link to="/" style={{ textDecoration: 'none', color: theme.palette.warning.main }}>
              Discard
            </Link>
          </Button>
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
            {
              !complete &&
              <Box sx={{ width: videoConstraints.width, mb: -0.5 }}>
                <StyledLinearProgress variant="determinate" value={progress} />
              </Box>
            }
            <Grid item width={videoConstraints.width} height={videoConstraints.height}>
              {
                complete ?
                (
                  <>
                    <Typography variant="body1" sx={{ color: '#fff'}}>
                      upoload: {s3Progress}
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#fff'}}>
                      Select your purpose (industry)
                    </Typography>
                    <Stack
                      direction="column"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      spacing={1}
                      sx={{mt:1.5}}
                      style={{overflow: 'scroll'}}
                    >
                      {industriesList.map(x => 
                        <Chip label={x} style={{background: industry === x ? theme.palette.primary.main : theme.palette.white.main, color: industry === x ? theme.palette.white.main : theme.palette.grey[700]}} onClick={() => setIndustry(x)} />
                      )}
                    </Stack>
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
                {!uploading &&
                  <IconButton aria-label="back" size="large" sx={{mr: 4}} onClick={handleClickOpen}>
                    <ArrowBackIosRoundedIcon fontSize="inherit" color="white"/>
                  </IconButton>
                }
                {capturing ? (
                  <Button variant="secondary2" onClick={handleStopCaptureClick}>Cancel</Button>
                ) : 
                  <>
                  {
                    complete ? (
                      <Button variant="secondary2" onClick={handleConfirm}>
                      {
                        uploading ?
                        (
                          <CircularProgress
                            size={24}
                            sx={{
                              color: theme.palette.primary[500],
                              position: 'absolute',
                              top: '50%',
                              left: '50%',
                              marginTop: '-12px',
                              marginLeft: '-12px',
                            }}
                          />
                        ) : (
                          <>Confirm</>
                        )
                      }
                      </Button>
                    ):(
                      <Button variant="secondary2" onClick={handleStartCaptureClick}>Record</Button>
                    )
                  }
                  </>
                }
                {!uploading &&
                  <>
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
                  </>
                }
              </Grid>
            </Grid>
          </Grid>
      }
      
    </>
  )
}

export default Camera