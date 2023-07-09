import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import { baseUrl } from '../../api/team';
import useTeamQuery from './useTeamQuery'
import TeamList from './TeamList';

function Team() {
    const { team, loading, error } = useTeamQuery(baseUrl)
    return (
        <>
            <Box sx={{}}>
                {loading ? <CircularProgress /> : error ? 'Error' : <TeamList team={team} />}
            </Box>
        </>
    )
}

export default Team