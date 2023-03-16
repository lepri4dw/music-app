import React, { useState } from 'react';
import { User } from '../../../types';
import { Avatar, Button, CircularProgress, Menu, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectLogoutLoading } from '../../../features/users/usersSlice';
import { logout } from '../../../features/users/usersThunks';
import noAvatarAvailable from '../../../assets/images/noAvatarAvailable.jpg';
import { apiURL } from '../../../constants';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const logoutLoading = useAppSelector(selectLogoutLoading);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  let avatar = noAvatarAvailable;

  if (user.avatar) {
    avatar = apiURL + '/' + user.avatar;
  }

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleClick}
        color="inherit"
      >
        Hello, {user.displayName} <Avatar sx={{ml: 2}} src={avatar} alt={user.username}/>
      </Button>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={NavLink} to="/new-artist">Add artist</MenuItem>
        <MenuItem component={NavLink} to="/new-album">Add album</MenuItem>
        <MenuItem component={NavLink} to="/new-track">Add track</MenuItem>
        <MenuItem component={NavLink} to="/track_history">Track History</MenuItem>
        <MenuItem onClick={handleLogout} disabled={logoutLoading}>{logoutLoading && <CircularProgress size={20} sx={{mr: 1}}/>}Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;