import React, { useState } from 'react'
import { Avatar, Divider, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Paper, Typography } from '@mui/material'
import CardLayout from './CardLayout'

function UserList({ user }) {
    const [userCard, setUserCard] = useState(false)
    const [data, setData] = useState('')
    return (
        <>
            <CardLayout data={data} openUserCard={userCard} setUserCard={setUserCard} />
            <Paper style={{ maxHeight: 500, overflow: 'auto', boxShadow: 'none' }}>
                <List disablePadding sx={{ width: '100%' }}>
                    {user.map((u) => (
                        <>
                            <ListItem disablePadding alignItems="flex-start" key={u._id} onClick={() => {setData(u); setUserCard(!userCard);}}>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        <Avatar sx={{ bgcolor: '#ddd' }} alt={u.first_name + ' ' + u.last_name} src={u.avatar} />
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={u.first_name + ' ' + u.last_name}
                                        secondary={
                                            <React.Fragment>
                                                <Typography
                                                    sx={{ display: 'inline' }}
                                                    component="span"
                                                    variant="body2"
                                                    color="text.primary"
                                                >
                                                    {u.domain + ' / '}
                                                </Typography>
                                                <Typography
                                                    component='span'
                                                    varient="subtitle"
                                                    color={u.available ? '#388e3c' : '#c62828'}>
                                                    {u.available ? 'Available' : 'Not available'}
                                                </Typography>
                                            </React.Fragment>
                                        }
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    ))}
                </List>
            </Paper>
        </>
    )
}

export default UserList