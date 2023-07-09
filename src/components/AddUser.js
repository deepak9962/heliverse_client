import React, { useContext, useEffect, useRef, useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, CircularProgress, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Typography, useMediaQuery } from '@mui/material';
import axios from 'axios';
import { postUser, putUser } from '../api/users';
import { useTheme } from '@mui/material/styles';
import { AppContext } from '../context/AppContext';

function AddUser({ userFormData, openUserForm, setUserForm }) {
  const { domains, dispatch } = useContext(AppContext)

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const [domain, setDomain] = useState(null)
  const [gender, setGender] = useState(null)
  const [available, setAvailable] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const fnRef = useRef()
  const lnRef = useRef()
  const emailRef = useRef()

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)
  const [userData, setUserData] = useState()

  const [submit, setSubmit] = useState(false)

  function handleClose() {
    setUserForm(!openUserForm)
  };

  const handleChangeDomain = (event) => {
    setDomain(event.target.value);
  };

  const handleChangeGender = (event) => {
    setGender(event.target.value);
  };

  const handleChangeAvailable = (event) => {
    setAvailable(event.target.value);
  };

  function handleSubmit() {
    let data = {}

    if (fnRef.current.value !== undefined
      && fnRef.current.value !== null
      && fnRef.current.value !== '') {
      data['first_name'] = fnRef.current.value
    } else {
      return
    }

    if (lnRef.current.value !== undefined
      && lnRef.current.value !== null
      && lnRef.current.value !== '') {
      data['last_name'] = lnRef.current.value
    } else {
      return
    }

    if (emailRef.current.value !== undefined
      && emailRef.current.value !== null
      && emailRef.current.value !== '') {
      data['email'] = emailRef.current.value
    } else {
      return
    }

    if (domain !== null) {
      data['domain'] = domain
    } else {
      return
    }

    if (gender !== null) {
      data['gender'] = gender
    } else {
      return
    }

    if (available !== null) {
      data['available'] = available
    } else {
      return
    }

    setUserData(data)
    setSubmit(true)
  }

  useEffect(() => {
    if (submit) {
      setSubmit(false)
      setLoading(true)
      let cancelToken = axios.CancelToken.source()

      const data = {
        data: userData,
        id: userFormData._id
      }

      if (userFormData) {
        putUser(data).then(res => {
          if (res.data !== undefined) {
            setMessage(res.data.message)
          }

          dispatch({
            type: 'SET_USER_RELOAD',
            payload: {
              userReload: true
            }
          })
        }).catch(e => {
          if (axios.isCancel(e)) return
          console.log(e);
          setError(true)
        })
      } else {
        postUser(data, cancelToken).then(res => {
          if (res.data !== undefined) {
            setMessage(res.data.message)
          }

          dispatch({
            type: 'SET_USER_RELOAD',
            payload: {
              userReload: true
            }
          })
        }).catch(e => {
          if (axios.isCancel(e)) return
          setError(true)
        })
      }

      setLoading(false)
      return () => cancelToken.cancel()
    }

    if (userFormData) {
      setFirstName(userFormData.first_name)
      setLastName(userFormData.last_name)
      setEmail(userFormData.email)
      setDomain(userFormData.domain)
      setGender(userFormData.gender)
      setAvailable(userFormData.available)
    }
  }, [userFormData, submit, userData, error, dispatch])

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={openUserForm} onClose={handleClose}>
        <DialogTitle>Add new user</DialogTitle>
        <DialogContent>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <TextField
              margin="dense"
              id="name"
              label="First Name"
              type="text"
              defaultValue={firstName}
              inputRef={fnRef}
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Last Name"
              type="text"
              defaultValue={lastName}
              inputRef={lnRef}
              fullWidth
              variant="outlined"
            />
            <TextField
              autoFocus
              margin="dense"
              id="email"
              label="Email Address"
              type="email"
              defaultValue={email}
              inputRef={emailRef}
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
          </FormControl>
        </DialogContent>
        <DialogActions>
          {error ?
            <Typography bgcolor={"#f00"} color={'#fff'} sx={{ mr: 3, p: 0.5 }}>Error!</Typography>
            : loading ? <CircularProgress /> : message ? <Typography bgcolor={"#292"} color={'#fff'} sx={{ mr: 3, p: 0.5 }}>{message}</Typography>
              : ''
          }
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={loading} onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AddUser