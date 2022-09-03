import { Grid, TextField, Typography } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import React from "react";

export function FriendCard(props: Props) {
    console.log(props);
    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar alt={props.name} src={props.image} />
            </ListItemAvatar>
            <ListItemText
                primary={props.name}
                secondary={
                    <React.Fragment>
                        <Typography
                            sx={{ display: 'inline' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                        >
                            ???
                        </Typography>
                        <TextField/>
                    </React.Fragment>
                }
            />
        </ListItem>

        /*
        <Grid>
            Hello
        </Grid>
        */
    )
}

interface Props {
    name: string;
    image: string;
}
