import React, { useContext, useState } from 'react'
import UserList from './UserList'
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import Pagination from './Pagination';
import useUserQuery from './useUserQuery';
import { baseUrl } from '../../api/users';
import { AppContext } from '../../context/AppContext';

function Users() {
    const { domains } = useContext(AppContext);
    const [currentPage, setCurrentPage] = useState(baseUrl)
    const [query, setQuery] = useState('')
    const [filter, setFilter] = useState({})
    const [open, setOpen] = useState(false);
    const [domain, setDomain] = useState(null);
    const [gender, setGender] = useState(null);
    const [available, setAvailable] = useState(null);

    const { users, prev, next, loading, error } = useUserQuery(query, filter, currentPage)

    function setNextPage() {
        setCurrentPage(next);
    }

    function setPrevPage() {
        setCurrentPage(prev);
    }

    function handleSearch(e) {
        if (e.target.value === '') {
            setQuery(undefined)
        } else {
            setQuery(e.target.value)
        }
        setCurrentPage(baseUrl)
    }

    // filter
    const handleChangeDomain = (event) => {
        setDomain(event.target.value);
    };

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const handleChangeAvailable = (event) => {
        setAvailable(event.target.value);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleOk = (event, reason) => {

        let queryFilter = {}
        if (domain !== null) {
            queryFilter['domain'] = domain
        }

        if (gender !== null) {
            queryFilter['gender'] = gender
        }

        if (available !== null) {
            queryFilter['available'] = available
        }

        setFilter(queryFilter)

        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, minWidth: '10ch', maxWidth: '30ch' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                noValidate
                autoComplete="off"
            >
                <TextField id="outlined-basic" label="Enter first name to search" variant="outlined" value={query} onChange={handleSearch} />

                <Button variant='outlined' aria-label='outlined primary' sx={{ maxWidth: 20 }} onClick={handleClickOpen}>Filter</Button>
                <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                    <DialogTitle>Filter</DialogTitle>
                    <DialogContent>
                        <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="domain-dialog-select-label">Domain</InputLabel>
                                <Select
                                    labelId="domain-dialog-select-label"
                                    id="domain-dialog-select"
                                    value={domain}
                                    onChange={handleChangeDomain}
                                    input={<OutlinedInput label="Domain" />}
                                >
                                    <MenuItem value={null}>
                                        <em>None</em>
                                    </MenuItem>
                                    {domains.map((domain) => (
                                        <MenuItem key={domain} value={domain}>{domain}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="gender-dialog-select-label">Gender</InputLabel>
                                <Select
                                    labelId="gender-dialog-select-label"
                                    id="gender-dialog-select"
                                    value={gender}
                                    onChange={handleChangeGender}
                                    input={<OutlinedInput label="Gender" />}
                                >
                                    <MenuItem value={null}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl sx={{ m: 1, minWidth: 120 }}>
                                <InputLabel id="available-dialog-select-label">Available</InputLabel>
                                <Select
                                    labelId="available-dialog-select-label"
                                    id="available-dialog-select"
                                    value={available}
                                    onChange={handleChangeAvailable}
                                    input={<OutlinedInput label="Available" />}
                                >
                                    <MenuItem value={null}>
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={true}>Available</MenuItem>
                                    <MenuItem value={false}>Not Available</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={handleOk}>Ok</Button>
                    </DialogActions>
                </Dialog>
            </Box>
            <Pagination
                setNextPage={next ? setNextPage : null}
                setPrevPage={prev ? setPrevPage : null} />
            <Box sx={{}}>
                {loading ? <CircularProgress /> : error ? 'Error' : <UserList user={users} />}
            </Box>
            <Pagination
                setNextPage={next ? setNextPage : null}
                setPrevPage={prev ? setPrevPage : null} />
        </>
    )
}

export default Users