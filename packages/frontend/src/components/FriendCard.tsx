import { Typography } from "@mui/material";
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from "react";

export function FriendCard(props: Props) {
    return (
        <ListItem alignItems="flex-start">
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
                            @{props.screenName}
                        </Typography>
                    </React.Fragment>
                }
            />
        </ListItem>
    )
}

interface Props {
    name: string;
    image: string;
    screenName: string;
}
