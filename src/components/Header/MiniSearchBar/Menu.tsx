import { Typography } from '@mui/material';

import { useHeaderDispatch } from '@contexts/HeaderProvider';

export type MenuType = 'persons' | 'checkin' | 'checkout' | 'price' | 'none';

export interface IMenu {
  menuType: MenuType;
  title: string;
}

interface Props {
  menu: IMenu;
}

export default function Menu({ menu: { title, menuType } }: Props) {
  const headerDispatch = useHeaderDispatch();

  const handleClickMiniSearchBar = () => {
    headerDispatch({ type: 'TOGGLE_FOCUS', menuType });
  };

  return (
    <button type="button" onClick={handleClickMiniSearchBar}>
      <Typography variant="input2">{title}</Typography>
    </button>
  );
}
