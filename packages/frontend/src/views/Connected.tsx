import { Button, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { CenterWidth } from "../components/CenterWidth";
import { FriendsList, Users, UsersAmount } from "../components/FriendsList";
import { NavBar } from "../components/NavBar";
import { RampWidget } from "../components/RampWidget";
import { StakeWidget } from "../components/StakeWidget";
import { apiFetch } from "../utils/apiFetch";
import { Metamask } from "../utils/Metamask";
import { LandingPage } from "./LandingPage";

export function TwitterConnection() {
    const params = new URLSearchParams(window.location.search);
    const state = params.get('state');
    const [amount, setAmount] = useState(1000);
    const [users, setUsers] = useState<null | UsersAmount[]>();
    const [showRamp, setShowRamp] = useState(false);

    useEffect(() => {
        async function callback() {
            if (!users) {
                const response = await apiFetch('/twitter-friends');
                // TODO: this should be in a shared library between backend + frontend
                const users: {
                    usersResponse: Users[];
                } = await response.json();
                const userResponse = users.usersResponse.slice(0, 5);
                setUsers(userResponse.map((item) => {
                    return {
                        ...item,
                        amount: amount / userResponse.length
                    };
                }));
            }
        }
        callback();
    });

    if (state) {
        window.localStorage.setItem('state', state);

    }
    const peopleCount = users?.filter((item) => item.give).length;

    return (
        <React.Fragment>
            {
                state ? (
                    <div style={{ height: '100%', backgroundImage: `url(${process.env.PUBLIC_URL}${'/rectangle.svg'})` }}>
                        <NavBar />
                        <CenterWidth>
                            <Grid container style={{ padding: '5%' }}>
                                <Metamask>
                                    {
                                        ({ sign, balance }) => (
                                            <React.Fragment>
                                                <Grid item xs={6}>
                                                    <StakeWidget balance={balance} amount={amount} setAmount={setAmount} />
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <FriendsList setUsers={setUsers} users={users} />
                                                </Grid>
                                                <Grid item xs={12} style={{ paddingTop: '10px' }}>
                                                    <CenterWidth>
                                                        <React.Fragment>
                                                            <div>
                                                                <RampWidget onEvent={async () => {
                                                                    await sign();
                                                                    window.location.replace(`/sent?people=${peopleCount}&amount=${amount}`)
                                                                }} show={showRamp} amount={amount.toString()} />
                                                            </div>
                                                            <Button
                                                                disabled={!peopleCount}
                                                                variant="contained" onClick={async () => {
                                                                    setShowRamp(true);
                                                                }}
                                                            >Send</Button>
                                                        </React.Fragment>
                                                    </CenterWidth>
                                                </Grid>
                                            </React.Fragment>
                                        )
                                    }
                                </Metamask>


                            </Grid>
                        </CenterWidth>
                    </div>
                ) : (
                    <React.Fragment>
                        <LandingPage />
                    </React.Fragment>
                )
            }
        </React.Fragment >
    );
}  
