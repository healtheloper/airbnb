import { Divider } from '@mui/material';
import React from 'react';

import Menu, { IMenu } from '@components/Header/MiniSearchBar/Menu';

const menus = [
  { title: '일정 입력' },
  { title: '금액대 입력' },
  { title: '인원 입력' },
];

export default function Menus() {
  return (
    <>
      {menus.reduce(
        (tags: React.ReactNode, menu: IMenu, idx: number) => (
          <>
            {tags}
            <Menu menu={menu} />
            {idx + 1 !== menus.length && (
              <Divider orientation="vertical" flexItem />
            )}
          </>
        ),
        null,
      )}
    </>
  );
}
