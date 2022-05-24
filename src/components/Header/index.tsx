import { Container, Box } from '@mui/material';

import Logo from '@components/Header/Logo';
import UserInfo from '@components/Header/UserInfo';
import color from '@constants/color';

export default function Header() {
  return (
    <Box
      component="header"
      sx={{
        backgroundColor: color.white,
        display: 'flex',
        padding: '2rem 2rem',
      }}
    >
      <Logo />
      <Container maxWidth="sm" />
      <UserInfo />
    </Box>
  );
}
