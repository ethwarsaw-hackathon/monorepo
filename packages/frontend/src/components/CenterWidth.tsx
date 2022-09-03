import { Grid } from "@mui/material";

export function CenterWidth(props: { children: JSX.Element; style?: React.CSSProperties }) {
    return (
        <Grid container
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={props.style}
        >
            {props.children}
        </Grid>
    )
}
