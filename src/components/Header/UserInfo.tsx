import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Fab, Menu, Fade, MenuItem } from '@mui/material';
import React, { useState } from 'react';

export default function UserInfo() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Fab variant="extended" color="info" onClick={handleClick}>
        <MenuIcon />
        <PersonIcon />
      </Fab>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        PaperProps={{
          sx: {
            marginTop: '10px',
            minWidth: '10rem',
          },
        }}
      >
        <MenuItem onClick={handleClose}>로그인</MenuItem>
      </Menu>
    </div>
  );
}
