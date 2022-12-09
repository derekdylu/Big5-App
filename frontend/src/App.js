import React, { useState, useEffect } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query'

import './App.css';
import theme from './Themes/Theme';

import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import useWindowDimensions from './Hooks/useWindowDimensions'
import Home from './Containers/Home';
import Setting from './Containers/Setting';
import About from './Containers/About';
import Error from './Containers/Error';

import Camera from './Components/Camera'
import EntireResult from './Components/EntireResult/EntireResult';
import PersonalPage from './Components/PersonalPage/PersonalPage';

const queryClient = new QueryClient()

const test_func = () => {
  console.log("hi test hi test")
}

const App = () => {
  const { width, height, ratio } = useWindowDimensions()
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    
    if (width < 320) {
      setNarrow(true)
      setOpen(true)
      return
    } else {
      if (ratio > 1) {
        setNarrow(false)
        setOpen(true)
        return
      } else {
        setNarrow(false)
        setOpen(false)
        return
      }
    }
  }, [ratio])

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Dialog aria-labelledby="window-size" open={open} fullScreen>
          <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ my: 1 }} height="100%">
            {
              narrow ?
              (
                <Typography variant="body2" color="#2D3748" fontWeight="500" sx={{mt: 2.5}} align="center">
                  最小螢幕寬度 320 px
                </Typography>
              ):(
                <>
                  {/* <img src={warning} alt="warning" width="200px" /> */}
                  <Typography variant="h6" color="#2D3748" fontWeight="700" sx={{mt: 2.5}} align="center">
                    豎直手機螢幕或瀏覽器視窗以享受最佳使用體驗
                  </Typography>
                </>
              )
            }
          </Grid>
        </Dialog>
        <Router>
          <Routes>

            <Route path="/" element={<Home />} forceRefresh={true} />
            <Route path="*" element={<Error />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/about" element={<About />} />

            <Route path="/camera" element={<Camera />}/>
            <Route path="/result" element={<EntireResult/>}/>
            <Route path="/test" element={<PersonalPage/>}/>
            <Route path="/interview/:interviewId" element={<EntireResult/>}/>
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App;