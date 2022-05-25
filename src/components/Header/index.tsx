import { Container, Box } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

import FlexBox from '@components/FlexBox';
import BigSearchBar from '@components/Header/BigSearchBar';
import Category from '@components/Header/Category';
import Logo from '@components/Header/Logo';
import MiniSearchBar from '@components/Header/MiniSearchBar';
import UserInfo from '@components/Header/UserInfo';
import color from '@constants/color';

export default function Header() {
  const [isFocus, setIsFocus] = useState(false);

  const handleSearchBarOnClick = () => {
    setIsFocus(!isFocus);
  };

  const closeBigSearchBar = useCallback(
    (e: MouseEvent) => {
      if (isFocus) {
        // e.target이 헤더 이외일때 setIsFocus(false)
        const target = e.target as HTMLInputElement;
        if (target.tagName === 'BODY') setIsFocus(false);
      }
    },
    [isFocus],
  );

  useEffect(() => {
    if (isFocus) {
      document.body.style.backgroundColor = color.grey4;
    } else {
      document.body.style.backgroundColor = color.white;
    }
  }, [isFocus]);

  useEffect(() => {
    document.body.addEventListener('click', closeBigSearchBar);

    return () => {
      document.body.removeEventListener('click', closeBigSearchBar);
    };
  }, [closeBigSearchBar]);

  return (
    <FlexBox
      component="header"
      sx={{
        backgroundColor: color.white,
        height: isFocus ? '11.875rem' : '5.875rem',
        padding: '1.5rem 2rem',
        transition: 'height .2s ease',
      }}
      jc="space-between"
    >
      <Logo />
      <Container maxWidth="sm">
        {isFocus ? (
          <Box>
            <Category />
            <BigSearchBar />
          </Box>
        ) : (
          <MiniSearchBar handleSearchBarOnClick={handleSearchBarOnClick} />
        )}
      </Container>
      <UserInfo />
    </FlexBox>
  );
}
