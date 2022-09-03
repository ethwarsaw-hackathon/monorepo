import { Box, Checkbox, CircularProgress, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FriendCard } from "../components/FriendCard";
import { apiFetch } from "../utils/apiFetch";
import { CenterWidth } from "./CenterWidth";

export function FriendsList(props: Props) {
    const [users, setUsers] = useState<null | UsersAmount[]>();

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
                        amount: props.totalAmount / userResponse.length
                    };
                }));
            }
        }
        callback();
    });

    return (
        <Box style={{ background: 'white' }}>
            <CenterWidth>
                <Grid item xs={12}>
                    <FriendTable users={users} />
                </Grid>
            </CenterWidth>
        </Box>
    )
}


function FriendTable({ users }: { users?: UsersAmount[] | null}) {
    if (!users) {
        return (
            <CircularProgress />
        )
    }

    return (
        <React.Fragment>
            <Grid container direction={'row'}>
                <Grid item xs={7}>
                    <Typography style={{ padding: '5px', paddingLeft: '10px' }}>
                        Contacts
                    </Typography>
                </Grid>
                <Grid item xs={5}>
                    <Typography style={{ padding: '5px', paddingLeft: '10px' }}>
                        Amount
                    </Typography>
                </Grid>
                {users.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            <Grid item xs={1}>
                                <Checkbox style={{margin: '25%'}}></Checkbox>
                            </Grid>
                            <Grid item xs={6}>
                                <FriendCard screenName={item.screenName} image={item.image || ''} name={item.name} />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField value={item.amount} onChange={() => {
                                    
                                }} />
                            </Grid>
                        </React.Fragment>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
}

interface Users {
    name: string; image?: string;
    screenName: string;
    totalAmount: number;
};

interface UsersAmount extends Users {
    amount: number;
};

interface Props {
    totalAmount: number;
}
