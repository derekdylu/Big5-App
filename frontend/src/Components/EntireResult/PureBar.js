import React, { useState, useRef, useCallback, useEffect } from 'react'
import LinearProgress from '@mui/material/LinearProgress';

const PureBar = ({pro, color}) => {
    const styleObj = {
        backgroundColor: `${color}`,
        borderRadius: '30px',
        height: `7px`,
        width: `${pro}%`,
        marginTop: '2.5px',
        marginBottom: '2.5px'
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