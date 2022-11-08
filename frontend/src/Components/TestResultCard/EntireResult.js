import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ScoreBar from './ScoreBar';
// import { spacing } from '@mui/system';
import IconButton from '@mui/material/IconButton';
// import Icon from '@mui/material/Icon';
// import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const EntireResult = () => {
    const date = "2022/11/07"
    const scores = [87, 23, 50, 41, 72]
    const OCEAN = ["OPENESS", "CONSCIENTIOUS", "EXTRAVERSION", "AGREEABLENESS","NEUROTICISM"];
    const biggerFontStyle = {
        fontSize: 28,
    }

    return(
        <div>
            <Box display="flex" justifyContent="space-around">
                <IconButton 
                    aria-label="back"
                    size='large'
                >
                    <ArrowBackIosIcon />
                </IconButton>
                <IconButton 
                    aria-label="delete"
                    size='large'
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
            <Box
                sx={{
                    mx: 10,
                    backgroundColor: '#E5E7E9',
                    '&:hover': {
                        backgroundColor: '#F2F3F4',
                        opacity: [0.9, 0.8, 0.7],
                    },
                    borderRadius: '30px',
                    padding: '20px',
                    fontWeight: 'bold',
                    
                }}
            >
                <p style = {biggerFontStyle}>Interview testing</p>
                <p style = {{color: "gray"}}>{date}</p>
                {
                    scores.map((s, id) => 
                        <ScoreBar score = {s} id = {id}/>
                    )
                }
                {
                    OCEAN.map((s, id) => 
                        <p> {s} <span style = {biggerFontStyle}>{scores[id]}</span></p>
                    )
                }
                <Box display="flex" justifyContent="space-around">
                    <Button>ADD NOTE</Button>
                    <Button>EXPORT AS IMAGE</Button>
                </Box> 
            </Box>
        </div>  
    )
}

export default EntireResult