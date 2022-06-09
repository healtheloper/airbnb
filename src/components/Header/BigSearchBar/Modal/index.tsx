import { Paper } from '@mui/material';

import { MenuType } from '@components/Header/MiniSearchBar/Menu';
import { HeaderState, useHeaderState } from '@contexts/HeaderProvider';

type MenuInfoType = {
  [key in MenuType]: string;
};

const menuWidthInfo: MenuInfoType = {
  checkin: '100%',
  checkout: '100%',
  price: '50%',
  persons: '50%',
  none: '0%',
};

const menuHeightInfo: MenuInfoType = {
  checkin: '30rem',
  checkout: '30rem',
  price: '20rem',
  persons: '20rem',
  none: '0',
};

interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  const { menuType }: HeaderState = useHeaderState();

  const width: string = menuWidthInfo[menuType];
  const height: string = menuHeightInfo[menuType];

  return (
    <Paper
      variant="outlined"
      sx={{
        position: 'absolute',
        borderRadius: '3rem',
        padding: '3rem',
        right: 0,
        top: '6rem',
        width,
        height,
      }}
    >
      {children}
    </Paper>
  );
}
