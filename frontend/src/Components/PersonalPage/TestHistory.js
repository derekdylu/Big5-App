import Grid from '@mui/material/Grid';
import TestItem from './TestItem';

const TestHistory = () => {
    const dates_fake = ["2022/09/04", "2022/10/08", "2022/11/19"];
    const bigs_fake = [
        [33, 90, 12, 44, 76], 
        [10, 48, 39, 85, 40],
        [78, 41, 9, 30, 57]
    ];

    return (
        <>
            <Grid
                container
                direction="column"
                justifyContent="start"
                alignItems="start"
                style={{
                    background: "#000"
                }}
            >
                <p style = {{ color: 'white' }}>TEST HISTORY</p>

                {
                    dates_fake.map((d, i) => 
                        <>
                            <TestItem
                                date = {d}
                                big =  {bigs_fake[i]}
                            />
                        </>
                    )
                }
            </Grid>
        </>
        
    )
}
export default TestHistory