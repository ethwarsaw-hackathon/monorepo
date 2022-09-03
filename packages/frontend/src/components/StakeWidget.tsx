import { InputAdornment, TextField, Typography } from "@mui/material";
import React from "react";
import { CenterWidth } from "./CenterWidth";


export function StakeWidget(props: Props) {
    return (
        <CenterWidth style={{ backgroundColor: 'white', height: '100%', width: '90%', float: 'left' }}>
            <React.Fragment>
                <Typography variant="h4" textAlign={'center'} gutterBottom style={{ width: '80%', marginLeft: '10%', marginRight: '10%' }}>
                    How much would you like to lend in total?
                </Typography>
                <div style={{ width: '100%' }}>
                    <TextField
                        value={props.amount}
                        onChange={(event) => {
                            props.setAmount(parseInt(event.target.value) || 0);
                        }}
                        style={{ width: '80%', margin: '10%' }}
                        InputProps={{
                            endAdornment: <InputAdornment position="start">DAI</InputAdornment>,
                        }}
                    />
                </div>
            </React.Fragment>
        </CenterWidth >
    )
}

interface Props {
    amount: number;
    setAmount: (value: number) => void;
}
