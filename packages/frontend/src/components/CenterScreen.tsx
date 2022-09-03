import { Box } from "@mui/material";

export function CenterScreen(props: {children: JSX.Element}) {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            {props.children}
        </Box>
    )
}