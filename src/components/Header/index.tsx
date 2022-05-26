import { Box } from '@mui/material';
import { useEffect } from 'react';

import FlexBox from '@components/FlexBox';
import BigSearchBar from '@components/Header/BigSearchBar';
import Category from '@components/Header/Category';
import Logo from '@components/Header/Logo';
import MiniSearchBar from '@components/Header/MiniSearchBar';
import UserInfo from '@components/Header/UserInfo';
import color from '@constants/color';
import { useHeaderState } from '@contexts/HeaderProvider';

export default function Header() {
  const { isFocus } = useHeaderState();

  useEffect(() => {
    if (isFocus) {
      document.body.style.backgroundColor = color.grey4;
    } else {
      document.body.style.backgroundColor = color.white;
    }
  }, [isFocus]);

  return (
    <FlexBox
      component="header"
      sx={{
        width: '90rem',
        height: isFocus ? '11.875rem' : '5.875rem',
        padding: '1.5rem 2rem',
        transition: 'height .2s ease',
        position: 'fixed',
        margin: '0 auto',
        top: 0,
        left: 0,
        right: 0,
      }}
      jc="space-between"
    >
      <Logo />
      <Box>
        {isFocus ? (
          <FlexBox di="column" ai="center">
            <Category />
            <BigSearchBar />
          </FlexBox>
        ) : (
          <MiniSearchBar />
        )}
      </Box>
      <UserInfo />
    </FlexBox>
  );
}
