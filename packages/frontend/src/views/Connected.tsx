import { Button, Grid } from "@mui/material";
import React from "react";
import { CenterScreen } from "../components/CenterScreen";
import { CenterWidth } from "../components/CenterWidth";
import { FriendsList } from "../components/FriendsList";
import { StakeWidget } from "../components/StakeWidget";
import { TwitterConnect } from "./TwitterConnect";

export function TwitterConnection() {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');

    if (state) {
        window.localStorage.setItem('state', state);
    }

    return (
        <React.Fragment>
            {
                state ? (
                    <CenterScreen>
                        <React.Fragment>
                            <Grid container>
                                <Grid item xs={5}>
                                    <StakeWidget />
                                </Grid>
                                <Grid item xs={5}>
                                    <FriendsList />
                                </Grid>
                                <Grid item xs={12}>
                                    <CenterWidth>
                                        <Button>Send</Button>
                                    </CenterWidth>
                                </Grid>
                            </Grid>
                        </React.Fragment>
                    </CenterScreen>
                ) : (
                    <React.Fragment>
                        <TwitterConnect />
                    </React.Fragment>
                )
            }
        </React.Fragment>
    );
}  
