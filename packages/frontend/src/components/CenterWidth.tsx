import { Grid } from "@mui/material";

export function CenterWidth(props: { children: JSX.Element }) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
        >
            {props.children}
        </Grid>
    )
}
