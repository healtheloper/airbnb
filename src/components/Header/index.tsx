import { Box, ClickAwayListener, Container } from '@mui/material';
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

  return (
    <ClickAwayListener
      onClickAway={() => {
        headerDispatch({ type: 'BODY_CLICK' });
      }}
    >
      <Box
        component="header"
        sx={{
          backgroundColor: color.white,
          boxShadow:
            '0px 4px 10px rgba(51, 51, 51, 0.1), 0px 0px 4px rgba(51, 51, 51, 0.05);',
          height: isFocus ? '11.875rem' : '5.875rem',
          transition: 'height 0.25s ease',
          padding: '1.5rem 2rem',
          position: 'fixed',
          margin: '0 auto',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 3,
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
            <Container
              maxWidth={isFocus ? 'md' : 'sm'}
              sx={{
                mx: 0,
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <MiniSearchBar />
              <Category />
              <BigSearchBar />
            </Container>
            <UserInfo />
          </FlexBox>
        </Container>
      </Box>
    </ClickAwayListener>
  );
}
