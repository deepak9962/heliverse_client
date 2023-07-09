import React, { useState } from 'react'
import { Divider, List, ListItem, ListItemButton, ListItemText, Paper } from '@mui/material'
import CardLayout from './CardLayout'

function TeamList({ team }) {
    const [teamCard, setTeamCard] = useState(false)
    const [teamData, setTeamData] = useState('')
    return (
        <>
            <Paper style={{ overflow: 'auto', boxShadow: 'none' }}>
                <List disablePadding sx={{ width: '100%' }}>
                    {team.map((t) => (
                        <>
                            <ListItem disablePadding alignItems="flex-start" key={t._id} onClick={() => { setTeamData(t); setTeamCard(!teamCard); }}>
                                <ListItemButton>
                                    <ListItemText
                                        primary={t.teamName}
                                    />
                                </ListItemButton>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </>
                    ))}
                </List>
            </Paper>
            <CardLayout data={teamData} openTeamCard={teamCard} setTeamCard={setTeamCard} />
        </>
    )
}

export default TeamList