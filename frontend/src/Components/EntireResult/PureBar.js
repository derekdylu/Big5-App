import React, { useState, useRef, useCallback, useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress';

const PureBar = ({pro, color, h, run}) => {
    const styleObj = {
        backgroundColor: `${color}`,
        borderRadius: '30px',
        height: `${h}px`,
        width: `${pro}%`,
        marginBottom: '5px'
    }

    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 100 : prevProgress + 1));
        }, 20);
        return () => {
          clearInterval(timer);
        };
      }, []);
    
    return(
        <div style = {styleObj}></div>
    )
}

export default PureBar