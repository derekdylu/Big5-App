import Grid from '@mui/material/Grid';

import PureBar from '../TestResultCard/PureBar'

const TestItem = ({date, big}) => {
    const c = ['#33B3FC', '#C856FD', '#FCCA37', '#4ED333', '#F14581']
    const itemObj = {
        backgroundColor: 'white',
        borderRadius: '50px',
        // height: '100px',
        width: '95%',
        paddingLeft: '25px',
        marginBottom: '15px',
    }

    return(
        <div style = {itemObj}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <p style = {{fontWeight: '700'}}>Interview testing</p>
                    <p style = {{color: 'gray', fontWeight: '500'}}>{date}</p>
                </Grid>
                <Grid 
                    item xs={4}
                    container
                    direction="column"
                    justifyContent="center"
                >
                    {
                        big.map((b, id) => 
                            <PureBar pro = {b} color = {c[id]} h = {7}/>
                        )
                    }
                </Grid>
            </Grid>
        </div>
        
        
    )
}
export default TestItem