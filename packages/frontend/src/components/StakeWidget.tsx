import { Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import { CenterWidth } from "./CenterWidth";


export function StakeWidget(props: Props) {
    return (
        <React.Fragment>
            <CenterWidth>
                <Grid item xs={6}>
                    <Typography>
                        How much would you like to stake ?
                    </Typography>
                    <TextField
                        InputProps={{
                            endAdornment: <InputAdornment position="start">DAI</InputAdornment>,
                        }}
                    > </TextField>
                </Grid>
            </CenterWidth>
        </React.Fragment>
    )
}

interface Props { }
