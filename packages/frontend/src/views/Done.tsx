import { Box, Typography } from "@mui/material";
import { CenterWidth } from "../components/CenterWidth";
import { NavBar } from "../components/NavBar";

export function Done() {
    const params = new URLSearchParams(window.location.search);
    const amount = params.get('amount');
    const people = params.get('people');

    return (
        <div style={{ height: '100%', backgroundImage: `url(${process.env.PUBLIC_URL}${'/rectangle.svg'})` }}>
            <NavBar />
            <CenterWidth>
                <Box style={{background: 'white', width: '300px', height: '300px'}}>
                    <Typography variant="h4" gutterBottom textAlign={'center'}>
                        Sucsess!
                    </Typography>
                    <Typography textAlign={'center'}>
                        You've lent {amount} USD and {people} of your contacts now can borrow up to 1000 USD each.
                    </Typography>
                </Box>
            </CenterWidth>
        </div>
    )
}
