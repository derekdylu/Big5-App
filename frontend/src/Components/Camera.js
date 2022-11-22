import React, { useState, useRef, useCallback, useEffect } from 'react'
import Webcam from "react-webcam";

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';

import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import UndoRoundedIcon from '@mui/icons-material/UndoRounded';

import useWindowDimensions from '../Hooks/useWindowDimensions'

const Camera = () => {
  const [progress, setProgress] = useState(0);
  const { width, height, ratio } = useWindowDimensions()
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [beginTime, setBeginTime] = useState(0)

  let currentDuration = 0
  let duration = 0

  useEffect(() => {
    currentDuration = Math.floor((Date.now()-beginTime)/1000)
    console.log(currentDuration)
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleStartCaptureClick = useCallback(() => {
    setBeginTime(Date.now())
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
    duration = currentDuration
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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        width="100vw"
        style={{
          background: "#000"
        }}
      >
        <Box sx={{ width: '95%' }}>
          <LinearProgress variant="determinate" value={progress} color="secondary"/>
          <LinearProgress variant="determinate" value={progress} color="primary"/>
        </Box>
        <Grid item container width={width-32}>
          <Webcam audio={false} ref={webcamRef} />
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
            <IconButton aria-label="back" size="large">
              <ArrowBackIosRoundedIcon fontSize="inherit" color="white"/>
            </IconButton>
            
            {capturing ? (
              <Button variant="primary" onClick={handleStopCaptureClick}>Stop Capture</Button>
            ) : (
              <Button variant="primary" onClick={handleStartCaptureClick}>Start Capture</Button>
            )}
            {recordedChunks.length > 0 && (
              <Button variant="outlined" onClick={handleDownload}>Download</Button>
            )}

            <IconButton aria-label="reset" size="large">
              <UndoRoundedIcon fontSize="inherit" color="white"/>
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

export default Camera