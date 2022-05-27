import { Box } from '@mui/material';
import { useState, useEffect, useCallback } from 'react';

import FlexBox from '@components/FlexBox';
import Background from '@components/Header/Background';
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
    <>
      <Background />
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
            <FlexBox fd="column" ai="center">
              <Category />
              <BigSearchBar />
            </FlexBox>
          ) : (
            <MiniSearchBar handleSearchBarOnClick={handleSearchBarOnClick} />
          )}
        </Box>
        <UserInfo />
      </FlexBox>
    </>
  );
}
