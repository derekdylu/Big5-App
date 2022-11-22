import Grid from '@mui/material/Grid';

const Graph = () => {

    return (
        <>
            <p> Tap to see distribution</p>
            <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="start"
                style={{
                    background: "#DBDBDB"
                }}
                paddingLeft="8vw"
                paddingRight="8vw"
            >
                <p>This is the graph.</p>
            </Grid>
        </>
    )
}
export default Graph