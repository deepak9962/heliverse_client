import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, Checkbox, CircularProgress, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import { AppContext } from '../context/AppContext';
import { postTeam } from '../api/team';
import { baseUrl } from '../api/users';
import useUserQuery from './users/useUserQuery';
import Pagination from './users/Pagination';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function AddTeam({ teamFormData, openTeamForm, setTeamForm }) {
  const { domains, dispatch } = useContext(AppContext)

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [domain, setDomain] = useState(null)
  const [available, setAvailable] = useState(null)
  const [teamName, setTeamName] = useState(null)
  const tnRef = useRef()
  const selectUserRef = useRef()

  const [submitLoading, setSubmitLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [submitError, setSubmitError] = useState(false)
  const [teamData, setTeamData] = useState()

  const [submit, setSubmit] = useState(false)

  const [userName, setUserName] = useState([]);
  const [userIds, setUserIds] = useState([])
  const [currentPage, setCurrentPage] = useState(baseUrl)
  const [filter, setFilter] = useState({})

  const { users, prev, next, loading, error } = useUserQuery(null, filter, currentPage)

  function setNextPage() {
    setCurrentPage(next);
  }

  function setPrevPage() {
    setCurrentPage(prev);
  }

  const handleChange = (event) => {
    const {
      target: { value },
    } = event    

    let newArray = []
    let idArray = []
    value.forEach((user) => {
      newArray.push(user)
      idArray.push({_id: user._id})
    })

    setUserName(newArray);
    setUserIds(idArray)

  };

  function handleClose() {
    setTeamForm(!openTeamForm)
  };

  const handleChangeDomain = (event) => {
    setDomain(event.target.value);
  };

  const handleChangeAvailable = (event) => {
    setAvailable(event.target.value);
  };

  function setFilteration() {
    let queryFilter = {}
    if (domain !== null) {
      queryFilter['domain'] = domain
    }

    if (available !== null) {
      queryFilter['available'] = available
    }

    setFilter(queryFilter)
  }



  function handleSubmit() {
    let data = {}

    if (tnRef.current.value !== undefined
      && tnRef.current.value !== null
      && tnRef.current.value !== '') {
      data['teamName'] = tnRef.current.value
    } else {
      return
    }

    if (domain !== null) {
      data['users'] = userIds
    } else {
      return
    }

    setTeamData(data)
    setSubmit(true)
  }

  useEffect(() => {
    setFilteration()
  }, [domain, available])

  useEffect(() => {
    if (submit) {
      setSubmit(false)
      setSubmitLoading(true)
      let cancelToken = axios.CancelToken.source()

      const data = {
        data: teamData
      }

      console.log(data);
      postTeam(data).then(res => {
        if (res.data !== undefined) {
          setMessage(res.data.message)
        }

        dispatch({
          type: 'SET_TEAM_RELOAD',
          payload: {
            teamReload: true
          }
        })
      }).catch(e => {
        console.log(e.message);

        if (axios.isCancel(e)) return
        setSubmitError(true)
      })

      setSubmitLoading(false)
      return () => cancelToken.cancel()
    }

  }, [ submit, teamData, dispatch])

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={openTeamForm} onClose={handleClose}>
        <DialogTitle>Create new team</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              margin="dense"
              id="name"
              label="Team name"
              type="text"
              defaultValue={teamName}
              inputRef={tnRef}
              fullWidth
              variant="outlined"
            />

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
                <InputLabel id="available-dialog-select-label">Available?</InputLabel>
                <Select
                  labelId="available-dialog-select-label"
                  id="available-dialog-select"
                  value={available}
                  onChange={handleChangeAvailable}
                  input={<OutlinedInput label="Available?" />}
                >
                  <MenuItem value={null}>
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={true}>Available</MenuItem>
                  <MenuItem value={false}>Not Available</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <FormControl sx={{ mt: 1, width: 300 }}>
              <InputLabel id="user-multiple-checkbox-label">Users</InputLabel>
              <Select
                labelId="user-multiple-checkbox-label"
                id="user-multiple-checkbox"
                multiple
                value={userName}
                onChange={handleChange}
                input={<OutlinedInput label="Users" />}
                renderValue={(selected) => selected.map((x) => x.first_name + ' ' + x.last_name).join(', ')}
                MenuProps={MenuProps}
              >
                {users.map((user) => (
                  <MenuItem key={user._id} value={user}>
                    <Checkbox checked={userName.findIndex(u => u._id === user._id) > -1} />
                    <ListItemText primary={user.first_name + ' ' + user.last_name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Pagination
              setNextPage={next ? setNextPage : null}
              setPrevPage={prev ? setPrevPage : null} />
            <Box sx={{}}>
              {loading ? <CircularProgress /> : error ? 'Error' : ''}
            </Box>
          </FormControl>
        </DialogContent>
        <DialogActions>
          {submitError ?
            <Typography bgcolor={"#f00"} color={'#fff'} sx={{ mr: 3, p: 0.5 }}>Error!</Typography>
            : submitLoading ? <CircularProgress /> : message ? <Typography bgcolor={"#292"} color={'#fff'} sx={{ mr: 3, p: 0.5 }}>{message}</Typography>
              : ''
          }
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={submitLoading} onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div >
  );
}

export default AddTeam