import { Divider } from '@mui/material';
import React from 'react';

import BigMenu, { IBigMenu } from '@components/Header/BigSearchBar/BigMenu';
import { MenuType } from '@components/Header/MiniSearchBar/Menu';
import { useHeaderState } from '@contexts/HeaderProvider';

const menus: IBigMenu[] = [
  { menuType: 'schedule', title: '체크인', placeholder: '날짜 입력' },
  { menuType: 'none', title: '체크아웃', placeholder: '날짜 입력' },
  { menuType: 'price', title: '요금', placeholder: '금액대 설정' },
  { menuType: 'persons', title: '인원', placeholder: '게스트 추가' },
];

const menuWidthsOrder = ['20%', '20%', '30%', '30%'];

export default function BigMenus() {
  const headerState = useHeaderState();

  const isSelectedType = (menuType: MenuType) =>
    menuType === headerState.menuType;

  return (
    <>
      {menus.reduce(
        (tags: React.ReactNode, menu: IBigMenu, idx: number) => (
          <>
            {tags}
            <BigMenu
              menu={menu}
              width={menuWidthsOrder[idx]}
              isSelectedType={isSelectedType(menu.menuType)}
            />
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