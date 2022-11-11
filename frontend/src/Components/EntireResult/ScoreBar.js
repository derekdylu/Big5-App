import React, { useState, useRef, useCallback, useEffect } from 'react'

import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

const alp = ['O', 'C', 'E', 'A', 'N']
const c = ['#4FC1E8', '#AC92EB', '#FFCE54', '#A0D568', '#ED5564']

const ScoreBar = ({score, id}) => {
    
    const color_name = ['OCEAN_O', 'OCEAN_C', 'OCEAN_E', 'OCEAN_A', 'OCEAN_N']
    const bar_length = parseInt(score)/100*8
    // console.log(bar_length)

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 1));
        }, 10);
        return () => {
          clearInterval(timer);
        };
      }, []);
    
    return(
        <Grid 
            container 
            spacing={2}
            paddingLeft = '20px'
            paddingRight = '20px'
        >
            <Grid 
                item xs={1}
                container
                direction="column"
                justifyContent="center"
            >
                <p>{alp[id]}</p>
            </Grid>
            <Grid 
                item xs={bar_length}
                container
                direction="column"
                justifyContent="center"
            >
                <LinearProgress
                    variant="determinate" 
                    value={progress} 
                    color = {color_name[id]}
                />
            </Grid>
            <Grid item xs={9.5 - bar_length}/>
            <Grid 
                item xs={1}
            >
                <p >{score}</p>
            </Grid>
        </Grid>
    )
}

export default ScoreBar