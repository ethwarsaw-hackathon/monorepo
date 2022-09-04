import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box, ClickAwayListener, Grid } from '@mui/material';
import { InputAdornment, TextField, Typography } from "@mui/material";
import { UsdInputField } from './UsdInputField';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function BorrowButton() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const setBackgroundStyle = (isOVerlayVisible: boolean) => {
        const backgroundStyle = document?.getElementById('app-root')?.style;
        const value = isOVerlayVisible;
        if (backgroundStyle) {
            if (value) {
                backgroundStyle.filter = 'blur(5px)'
            } else {
                backgroundStyle.filter = '';
            }
        }
    }

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
        setBackgroundStyle(true);
    };
    const handleClose = () => {
        setAnchorEl(null);
        setBackgroundStyle(false);
    };

    return (
        <ClickAwayListener onClickAway={handleClose}>
            <React.Fragment>
                <Button
                    id="borrow"
                    aria-controls={open ? 'demo-customized-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    variant="contained"
                    disableElevation
                    onClick={handleClick}
                >
                    Borrow
                </Button>
                <StyledMenu
                    id="demo-customized-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                >
                    <MenuItem disableTouchRipple disableGutters disableRipple>
                        <Box style={{ width: '300px', height: '200px' }}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <Typography textAlign={'center'}>
                                        How much would you like to borrow ?
                                    </Typography>

                                </Grid>

                                <Grid item xs={12}>
                                    {/* 
                            TODO: 
                                This should be based on the balance in the actual contract on Union. 
                                Need to add the endpoint for the backeend.
                        */}
                                    <UsdInputField
                                        defaultValue={'1000'}
                                        style={{ width: '80%', margin: '10%' }}
                                    />

                                </Grid>

                                <Grid item xs={12}>
                                    {
                                        /*
                                        TODO:
                                            This should probably just withdraw to metamask to be userfriendly.
                                        */
                                    }
                                    <Box textAlign='center'>
                                        <Button variant='contained' onClick={handleClose}>Receive to your wallet</Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Box>
                    </MenuItem>
                </StyledMenu>
            </React.Fragment>
        </ClickAwayListener>
    );
}
