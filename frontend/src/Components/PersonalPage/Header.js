import React, { useState, useRef, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
import DehazeIcon from '@mui/icons-material/Dehaze';

const Header = ({name, picURL}) => {

    return(
        <>
            <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="end"
                style={{
                    background: "#000"
                }}
                // mx = '30px'
            >
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                >
                    <Avatar 
                        alt={name} 
                        src={picURL}
                        sx={{ width: 100, height: 100 }} 
                    />
                    <p style={{ color: 'white' }}>{name}</p>
                </Grid>
            </Grid> 
        </>
    )
}

export default Header