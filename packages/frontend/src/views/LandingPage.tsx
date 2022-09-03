import { Grid } from "@mui/material";

export function LandingPage() {
    return (
        <div style={{ background: 'red', minHeight: '100%' }}>
            <Grid container direction={'row'} style={{ minHeight: '100%' }}>
                <Grid item xs={4}>
                    <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justifyContent="center">
                        test2
                    </Grid>
                </Grid>
                <Grid item xs={7}>
                    test2
                </Grid>
            </Grid>
        </div>
    )
}
