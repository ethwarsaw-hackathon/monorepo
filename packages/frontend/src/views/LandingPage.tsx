import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { CenterWidth } from "../components/CenterWidth";
import { ConnectWithTwitterButton } from "../components/ConnectWithTwitterButton";
import { NavBar } from "../components/NavBar";
import { Metamask } from "../utils/Metamask";

export function LandingPage() {
    return (
        <div style={{ height: '100%', backgroundImage: `url(${process.env.PUBLIC_URL}${'/rectangle.svg'})` }}>
            <NavBar />
            <CenterWidth>
                <Grid container direction={'row'}>
                    <Grid item xs={4}>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                            style={{
                                paddingLeft: '100px',
                                paddingTop: '50px',
                            }}
                        >
                            <Box>
                                <Typography variant="h4" gutterBottom>
                                    Lend to fam
                                </Typography>
                                <Typography>
                                    Give and get access to financial support by vouching for people you know
                                </Typography>
                                <Metamask>
                                    {
                                        ({ accountAddress, requestAccount }) => {
                                            if (!accountAddress) {
                                                return (
                                                    <Button onClick={requestAccount}>Connect metamask</Button>
                                                )
                                            } else {
                                                return (
                                                    <ConnectWithTwitterButton accountAddress={accountAddress} />
                                                )
                                            }
                                        }
                                    }
                                </Metamask>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid item xs={7}>
                        <CenterWidth>
                            <React.Fragment>
                                <Box style={{ width: '400px', height: '400px' }}>
                                    <img alt={'people'} style={{ width: '100%' }} src={process.env.PUBLIC_URL + `${'/people.svg'}`} />
                                </Box>
                            </React.Fragment>
                        </CenterWidth>
                    </Grid>
                </Grid>
            </CenterWidth>

        </div>
    )
}
