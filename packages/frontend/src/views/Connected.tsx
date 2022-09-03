import { Button, Grid } from "@mui/material";
import React, { useState } from "react";
import { CenterScreen } from "../components/CenterScreen";
import { CenterWidth } from "../components/CenterWidth";
import { FriendsList } from "../components/FriendsList";
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
                    <div style={{ height: '55%', backgroundImage: `url(${process.env.PUBLIC_URL}${'/rectangle.svg'})` }}>
                        <CenterScreen>
                            <React.Fragment>
                                <Grid container style={{padding: '10%'}}>
                                    <Grid item xs={6}>
                                        <StakeWidget amount={amount} setAmount={setAmount} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FriendsList totalAmount={amount} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <CenterWidth>
                                            <Button>Send</Button>
                                        </CenterWidth>
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        </CenterScreen>
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
