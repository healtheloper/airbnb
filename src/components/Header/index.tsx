import { Container, Box } from '@mui/material';
import { useState } from 'react';

import BigSearchBar from '@components/Header/BigSearchBar';
import Category from '@components/Header/Category';
import Logo from '@components/Header/Logo';
import MiniSearchBar from '@components/Header/MiniSearchBar';
import UserInfo from '@components/Header/UserInfo';
import color from '@constants/color';

export default function Header() {
  const [view, setView] = useState(false);

  const handleSearchBarOnClick = () => {
    setView(!view);
  };

  return (
    <Box
      component="header"
      sx={{
        backgroundColor: color.white,
        display: 'flex',
        justifyContent: 'space-between',
        height: view ? '190px' : '94px',
        padding: '1.5rem 2rem',
        transition: 'height .2s ease',
      }}
    >
      <Logo />
      <Container maxWidth="sm">
        {view ? (
          <Box>
            <Category />
            <BigSearchBar />
          </Box>
        ) : (
          <MiniSearchBar handleSearchBarOnClick={handleSearchBarOnClick} />
        )}
      </Container>
      <UserInfo />
    </Box>
  );
}
