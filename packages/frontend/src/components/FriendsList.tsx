import { Box, Checkbox, CircularProgress, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
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
        <Box style={{ background: 'white', height: '100%', width: '90%', float: 'right' }}>
            <CenterWidth>
                <Grid item xs={12}>
                    <FriendTable setUsers={setUsers} users={users} />
                </Grid>
            </CenterWidth>
        </Box>
    )
}


function FriendTable({ users, setUsers }: { users?: UsersAmount[] | null; setUsers: (users?: UsersAmount[]) => void }) {
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
                        <UserRow user={item} key={index} onChange={(user) => {
                            users[index] = user;
                            console.log(user);;
                            setUsers([...users])
                        }} />
                    )
                })}
            </Grid>
        </React.Fragment>
    );
}

function UserRow({ user, onChange }: { user: UsersAmount, onChange: (user: UsersAmount) => void }) {
    const ref = useRef();
    return (
        <React.Fragment>
            <Grid item xs={1}>
                <Checkbox style={{ margin: '25%' }}></Checkbox>
            </Grid>
            <Grid item xs={6}>
                <FriendCard screenName={user.screenName} image={user.image || ''} name={user.name} />
            </Grid>
            <Grid item xs={5}>
                <TextField style={{ paddingRight: '5%' }} defaultValue={user.amount} inputRef={ref}
                    InputProps={{
                        endAdornment: <InputAdornment position="start">DAI</InputAdornment>,
                    }}
                    onBlur={() => {
                        const amount = ref.current && ((ref.current as { value?: string })).value
                        if (amount) {
                            onChange({
                                ...user,
                                amount: parseInt(amount),
                            })
                        }
                    }}
                />
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
