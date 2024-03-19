import React from 'react'
import { useDispatch } from 'react-redux';
import { setLogout } from '../state';
import LoginIcon from '@mui/icons-material/Login';
import { IconButton } from '@mui/material';
function LogoutButton({setIsAdmin}) {
    const dispatch = useDispatch();
    const handleLogout = () => {
        dispatch(setLogout());
        setIsAdmin(false);
      };
  return (
    <IconButton onClick={handleLogout}><LoginIcon/></IconButton>
  )
}

export default LogoutButton