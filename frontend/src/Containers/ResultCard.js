import Box from '@mui/material/Box';
import EntireResult from '../Components/TestResultCard/EntireResult';
import IconButton from '@mui/material/IconButton';
// import Icon from '@mui/material/Icon';
// import { AccessAlarm, ThreeDRotation } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const ResultCard = () => {
    const date = "2022/11/07"
    const scores = [87, 23, 50, 41, 72]
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
            <EntireResult
                date = {date}
                scores = {scores}
            />
        </div>
    )
}
export default ResultCard