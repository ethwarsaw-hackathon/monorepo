import { Checkbox, CircularProgress, Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FriendCard } from "../components/FriendCard";
import { apiFetch } from "../utils/apiFetch";
import { CenterWidth } from "./CenterWidth";

export function FriendsList() {
    const [users, setUsers] = useState<null | Users>();
    useEffect(() => {
        async function callback() {
            if (!users) {
                const response = await apiFetch('/twitter-friends');
                // TODO: this should be in a shared library between backend + frontend
                const users: {
                    usersResponse: Users;
                } = await response.json();
                setUsers(users.usersResponse.slice(0, 5));
            }
        }
        callback();
    });

    return (
        <React.Fragment>
            <CenterWidth>
                <Grid item xs={6}>
                    <FriendTable users={users} />
                </Grid>
            </CenterWidth>
        </React.Fragment>
    )
}


function FriendTable({ users }: { users?: Users | null }) {
    if (!users) {
        return (
            <CircularProgress />
        )
    }

    return (
        <React.Fragment>
            <Grid container direction={'row'}>
                <Grid item xs={7}>
                    Contacts
                </Grid>
                <Grid item xs={5}>
                    Amount
                </Grid>
                {users.map((item) => {
                    return (
                        <React.Fragment>
                            <Grid item xs={1}>
                                <Checkbox></Checkbox>
                            </Grid>
                            <Grid item xs={6}>
                                <FriendCard screenName={item.screenName} image={item.image || ''} name={item.name} />
                            </Grid>
                            <Grid item xs={5}>
                                <TextField />
                            </Grid>
                        </React.Fragment>
                    );
                })}
            </Grid>
        </React.Fragment>
    );
}

type Users = Array<{
    name: string; image?: string;
    screenName: string
}>;