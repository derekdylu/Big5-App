import Grid from '@mui/material/Grid';
import PureBar from './PureBar'

const ScoreBar = ({score, id}) => {
    const alp = ['O', 'C', 'E', 'A', 'N']
    const c = ['#33B3FC', '#C856FD', '#FCCA37', '#4ED333', '#F14581']
    // const newScore = {score}*0.9
    return(
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <p>{alp[id]}</p>
            </Grid>
            <Grid item xs={10}>
                <PureBar pro = {score} color = {c[id]}/>
            </Grid>
        </Grid>
    )
}

export default ScoreBar