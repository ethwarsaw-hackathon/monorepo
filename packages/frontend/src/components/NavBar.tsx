import {
    AppBar,
    Toolbar,
    Typography,
    Box,
} from "@mui/material";
import BorrowButton from "./BorrowButton";

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
                    <BorrowButton />
                </Toolbar>
            </AppBar>
        </Box>
    )
}