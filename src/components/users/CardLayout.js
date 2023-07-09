import React, { useState } from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, Dialog, DialogActions, DialogContent, DialogTitle, useMediaQuery } from '@mui/material';
import AddUser from '../AddUser';

function CardLayout({ data, openUserCard, setUserCard }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const cardWidth = useMediaQuery(theme.breakpoints.up('md'))

    const [userForm, setUserForm] = useState(false)

    function handleClose() {
        setUserCard(!openUserCard)
    };

    function handleEdit() {
        setUserCard(!openUserCard)
        setUserForm(!userForm)
    };

    return (
        <div>
            <AddUser userFormData={data} openUserForm={userForm} setUserForm={setUserForm} />
            <Dialog
                fullScreen={fullScreen}
                open={openUserCard}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"User Details"}
                </DialogTitle>
                <DialogContent sx={{ width: cardWidth ? 500 : '100%', display: cardWidth ? 'flex' : '', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mr: cardWidth ? 5 : 0 }}>
                        <Avatar sx={{ bgcolor: '#ddd', width: 80, height: 80 }} src={data.avatar} alt={data.first_name + ' ' + data.last_name} />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography variant="subtitle1" color="text.primary" component="div">
                                {data.domain}
                            </Typography>
                            <Typography component="span" variant="h5">
                                {data.first_name + ' ' + data.last_name}
                            </Typography>
                            <Typography sx={{ mr: 1 }} variant="subtitle2" color="text.secondary" component="div">
                                {data.gender}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                <Typography variant="subtitle2" color="text.secondary" component="div">
                                    {'Contact - '}
                                </Typography>
                                <Typography sx={{ ml: 0.5 }} variant="subtitle2" color="#01579b" component="a" href='#'>
                                    {data.email}
                                </Typography>
                            </Box>
                            <Typography variant="subtitle1" color={data.available ? '#388e3c' : '#c62828'} component="div">
                                {data.available ? 'Available' : 'Not Available'}
                            </Typography>
                        </CardContent>
                    </Box>
                    {/* <Card sx={{boxShadow: 0}}>
                        
                    </Card> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEdit} autoFocus>
                        Edit
                    </Button>
                    <Button onClick={handleClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default CardLayout