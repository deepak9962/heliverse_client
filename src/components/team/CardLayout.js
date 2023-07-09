import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, List, ListItem, ListItemButton, ListItemText, Paper, useMediaQuery } from '@mui/material';

function CardLayout({ data, openTeamCard, setTeamCard }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const cardWidth = useMediaQuery(theme.breakpoints.up('md'))

    console.log(data);
    function handleClose() {
        setTeamCard(!openTeamCard)
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={openTeamCard}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Team Details"}
                </DialogTitle>
                <DialogContent sx={{ width: cardWidth ? 500 : '100%' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="span" variant="h5">
                                {data.teamName}
                            </Typography>
                            <Paper style={{ maxHeight: 500, overflow: 'auto', boxShadow: 'none' }}>
                                <List disablePadding sx={{ width: '100%' }}>
                                    {data.users !== undefined ? data.users.map((t) => (
                                        <>
                                            <ListItem disablePadding key={t._id} >
                                                <ListItemButton>
                                                    <ListItemText
                                                        primary={'member id -' + ' ' + t._id}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </>
                                    )) : ''}
                                </List>
                            </Paper>
                        </CardContent>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CardLayout