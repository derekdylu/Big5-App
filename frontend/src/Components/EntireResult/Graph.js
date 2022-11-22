import Grid from '@mui/material/Grid';

const Graph = () => {

    return (
        <>
            <p>This is the graph.</p>
            <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="start"
                style={{
                    background: "#000"
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