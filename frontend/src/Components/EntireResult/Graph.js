import React, { useState, useRef, useCallback, useEffect } from 'react'
import Grid from '@mui/material/Grid';
// import Button from '@mui/material/Button';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ pt: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Graph = () => {

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <p style = {{marginTop: '3vh', marginLeft: '5vw', fontWeight: '400'}}> Tap to see distribution</p>
            <Grid
                container
                direction="row"
                justifyContent="start"
                alignItems="center"
                width='80vw'
                marginLeft = '5vw'
                marginRight = '5vw'   
                
            >
                <Box sx={{ width: '80%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="OPENESS" {...a11yProps(0)} />
                        <Tab label="CONSCIENTIOUS" {...a11yProps(1)} />
                        <Tab label="EXTRAVERSION" {...a11yProps(2)} />
                        <Tab label="AGREEABLENESS" {...a11yProps(3)} />
                        <Tab label="NEUROTICISM" {...a11yProps(4)} />
                        {/* <Tab label="O" {...a11yProps(0)} />
                        <Tab label="C" {...a11yProps(1)} />
                        <Tab label="E" {...a11yProps(2)} />
                        <Tab label="A" {...a11yProps(3)} />
                        <Tab label="N" {...a11yProps(4)} /> */}
                    </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <Grid
                            container
                            direction="column"
                            justifyContent="start"
                            alignItems="center"
                            style={{
                                background: "#DBDBDB"
                            }}
                            width="70vw"
                            paddingLeft="8vw"
                            paddingRight="8vw"
                            borderRadius='16px'  
                        >
                            <p>This is graph for 'O'.</p>
                        </Grid>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Item Four
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Item Five
                    </TabPanel>
                </Box>
            </Grid>
            {/* <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="center"
                width='80vw'
                marginTop='0.5vh'  
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="start"
                    alignItems="center"
                    style={{
                        background: "#DBDBDB"
                    }}
                    width="70vw"
                    paddingLeft="8vw"
                    paddingRight="8vw"
                    borderRadius='16px'  
                >
                    <p>This is the graph.</p>
                </Grid>  
            </Grid> */}
            
        </>
    )
}
export default Graph