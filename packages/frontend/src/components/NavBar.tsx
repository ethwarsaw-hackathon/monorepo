import React from "react";
import {
    AppBar,
    Toolbar,
    CssBaseline,
    Typography,
    Box,
    IconButton,
} from "@mui/material";
export function NavBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>

                    <Typography variant="h6" component="div" sx={{ padding: '5px' }}>
                        <img src={process.env.PUBLIC_URL + `${'/handshake.svg'}`} style={{ height: '100%' }} alt={'handshake'} />
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ float: 'left', flexGrow: 1 }}>
                        Poruka
                    </Typography>

                    <Typography variant="h6" component="div" sx={{ float: 'right', padding: '5px' }}>
                        News
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ float: 'right', padding: '5px' }}>
                        News
                    </Typography>
                    <Typography variant="h6" component="div" sx={{ float: 'right', padding: '5px' }}>
                        News
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}