import { Box, Container } from '@mui/material';
import { useEffect } from 'react';

import FlexBox from '@components/FlexBox';
import BigSearchBar from '@components/Header/BigSearchBar';
import Category from '@components/Header/Category';
import Logo from '@components/Header/Logo';
import MiniSearchBar from '@components/Header/MiniSearchBar';
import UserInfo from '@components/Header/UserInfo';
import color from '@constants/color';
import { useHeaderDispatch, useHeaderState } from '@contexts/HeaderProvider';
import { useScroll } from '@hooks/useScroll';

export default function Header() {
  const headerDispatch = useHeaderDispatch();
  const { isFocus } = useHeaderState();
  const { scrollY } = useScroll();

  useEffect(() => {
    if (isFocus) {
      headerDispatch({ type: 'BODY_CLICK' });
    }
  }, [scrollY]);

  useEffect(() => {
    if (isFocus) {
      document.body.style.backgroundColor = color.grey4;
    } else {
      document.body.style.backgroundColor = color.white;
    }
  }, [isFocus]);

  return (
    <Box
      component="header"
      sx={{
        height: isFocus ? '11.875rem' : '5.875rem',
        padding: '1.5rem 2rem',
        position: 'fixed',
        margin: '0 auto',
        top: 0,
        left: 0,
        right: 0,
      }}
    >
      <Container maxWidth="lg">
        <FlexBox
          sx={{
            transition: 'height .2s ease',
            px: '3rem',
          }}
          jc="space-between"
        >
          <Logo />
          <Container maxWidth={isFocus ? 'md' : 'sm'} sx={{ mx: 0 }}>
            {isFocus ? (
              <FlexBox fd="column" ai="center">
                <Category />
                <BigSearchBar />
              </FlexBox>
            ) : (
              <MiniSearchBar />
            )}
          </Container>
          <UserInfo />
        </FlexBox>
      </Container>
    </Box>
  );
}
