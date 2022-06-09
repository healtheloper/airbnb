import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Fab, Menu, Fade, MenuItem } from '@mui/material';
import React, { useState } from 'react';

export default function UserInfo() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleUserInfoClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLoginClick = () => {
    const loginBaseUrl = 'https://github.com/login/oauth/authorize';
    const clientId = process.env.GITHUB_CLIENT_ID;

    if (!clientId) throw Error('Github login client id not found');

    const githubLoginConfig = {
      client_id: clientId,
    };
    const params = new URLSearchParams(githubLoginConfig).toString();
    window.location.href = `${loginBaseUrl}?${params}`;
  };

  return (
    <div>
      <Fab variant="extended" color="info" onClick={handleUserInfoClick}>
        <MenuIcon />
        <PersonIcon />
      </Fab>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          sx: {
            marginTop: '0.625rem',
            minWidth: '10rem',
          },
        }}
      >
        <MenuItem onClick={handleLoginClick}>로그인</MenuItem>
      </Menu>
    </div>
  );
}
