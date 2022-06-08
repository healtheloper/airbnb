import { Divider } from '@mui/material';

import BigMenu, { IBigMenu } from '@components/Header/BigSearchBar/BigMenu';
import { MenuType } from '@components/Header/MiniSearchBar/Menu';

interface Props {
  changeMenuType: (menuType: MenuType) => void;
  isSelectedType: (menuType: MenuType) => boolean;
}

const menus: IBigMenu[] = [
  { menuType: 'checkin', title: '체크인', placeholder: '날짜 입력' },
  { menuType: 'checkout', title: '체크아웃', placeholder: '날짜 입력' },
  { menuType: 'price', title: '요금', placeholder: '금액대 설정' },
  { menuType: 'persons', title: '인원', placeholder: '게스트 추가' },
];

const menuWidthsOrder = ['20%', '20%', '25%', '35%'];

export default function BigMenus({ changeMenuType, isSelectedType }: Props) {
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
              changeMenuType={changeMenuType}
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
