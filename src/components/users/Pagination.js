import { Box, Button, ButtonGroup } from '@mui/material'
import React from 'react'

function Pagination({ setNextPage, setPrevPage }) {
    return (
        <>
            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', p: 1}}>
                <ButtonGroup size='' variant='contained' aria-label='outlined primary group'>
                    {setPrevPage && <Button onClick={setPrevPage}>Previous</Button>}
                    {setNextPage && <Button onClick={setNextPage}>Next</Button>}
                </ButtonGroup>
            </Box>
        </>
    )
}

export default Pagination