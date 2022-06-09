import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import { Fab, Menu, Fade, MenuItem, Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getParamsFormat } from '@common/util';
import { useHeaderState, useHeaderDispatch } from '@contexts/HeaderProvider';

export default function UserInfo() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(localStorage.getItem('avatarUrl'));
  const { isLogin } = useHeaderState();
  const headerDispatch = useHeaderDispatch();

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
    const redirectUri =
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/callback'
        : 'https://puffinbnb.netlify.app/callback';
    if (!clientId) throw Error('Github login client id not found');

    const githubLoginConfig = {
      client_id: clientId,
      redirect_uri: redirectUri,
    };
    const params = getParamsFormat(githubLoginConfig);
    window.location.href = `${loginBaseUrl}${params}`;
  };

  const handleLogoutClick = () => {
    headerDispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    if (isLogin) {
      setAvatarUrl(localStorage.getItem('avatarUrl'));
    } else {
      setAvatarUrl(null);
      localStorage.removeItem('avatarUrl');
    }
  }, [isLogin]);

  return (
    <div>
      <Fab variant="extended" color="info" onClick={handleUserInfoClick}>
        <MenuIcon />
        {avatarUrl ? (
          <Avatar src={avatarUrl} sx={{ width: 30, height: 30 }} />
        ) : (
          <Avatar sx={{ width: 30, height: 30 }}>
            {!avatarUrl && <PersonIcon />}
          </Avatar>
        )}
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
        {isLogin ? (
          <MenuItem onClick={handleLogoutClick}>로그아웃</MenuItem>
        ) : (
          <MenuItem onClick={handleLoginClick}>로그인</MenuItem>
        )}
      </Menu>
    </div>
  );
}
