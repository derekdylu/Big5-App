import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import PureBar from './PureBar'

const ScoreBar = ({score, id}) => {
    const alp = ['O', 'C', 'E', 'A', 'N']
    const c = ['#33B3FC', '#C856FD', '#FCCA37', '#4ED333', '#F14581']
    // const newScore = {score}*0.9
    return(
        <Grid 
            container spacing={2}
            paddingLeft = '20px'
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
                item xs={11}
                container
                direction="column"
                justifyContent="center"
            >
                <PureBar pro = {score} color = {c[id]} h = {20}/>
            </Grid>
        </Grid>
    )
}

export default ScoreBar