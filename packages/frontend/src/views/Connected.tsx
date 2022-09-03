import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { CenterWidth } from "../components/CenterWidth";
import { FriendsList } from "../components/FriendsList";
import { NavBar } from "../components/NavBar";
import { StakeWidget } from "../components/StakeWidget";
import { LandingPage } from "./LandingPage";

export function TwitterConnection() {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');
    const [amount, setAmount] = useState(1000);

    if (state) {
        window.localStorage.setItem('state', state);
    }

    return (
        <React.Fragment>
            {
                state ? (
                    <div style={{ height: '100%', backgroundImage: `url(${process.env.PUBLIC_URL}${'/rectangle.svg'})` }}>
                        <NavBar />
                        <CenterWidth>
                            <Grid container style={{ padding: '5%' }}>
                                <Grid item xs={6}>
                                    <StakeWidget amount={amount} setAmount={setAmount} />
                                </Grid>
                                <Grid item xs={6}>
                                    <FriendsList totalAmount={amount} />
                                </Grid>
                                <Grid item xs={12} style={{ paddingTop: '10px' }}>
                                    <CenterWidth>
                                        <Button variant="contained">Send</Button>
                                    </CenterWidth>
                                </Grid>
                            </Grid>
                        </CenterWidth>
                    </div>
                ) : (
                    <React.Fragment>
                        <LandingPage />
                    </React.Fragment>
                )
            }
        </React.Fragment>
    );
}  
