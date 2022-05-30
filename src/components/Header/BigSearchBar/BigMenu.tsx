import { Box, Typography } from '@mui/material';

import FlexBox from '@components/FlexBox';
import { MenuType } from '@components/Header/MiniSearchBar/Menu';
import color from '@constants/color';

export interface IBigMenu {
  menuType: MenuType;
  title: string;
  placeholder: string;
}

interface Props {
  menu: IBigMenu;
  width: string;
  isSelectedType: boolean;
  changeMenuType: (menuType: MenuType) => void;
}

export default function BigMenu({
  menu: { title, placeholder, menuType },
  width,
  isSelectedType,
  changeMenuType,
}: Props) {
  const handleClickBigMenu = () => {
    changeMenuType(menuType);
  };

  return (
    <Box
      sx={{
        width,
        height: '100%',
      }}
    >
      <FlexBox
        fd="column"
        ai="flex-start"
        jc="center"
        sx={{
          borderRadius: '3rem',
          height: '100%',
          width: '100%',
          padding: '0 1.5rem',
          cursor: 'pointer',
          ...(isSelectedType
            ? {
                backgroundColor: color.white,
                boxShadow:
                  '0px 4px 10px rgba(51, 51, 51, 0.1), 0px 0px 4px rgba(51, 51, 51, 0.05);',
              }
            : {
                '&:hover': {
                  backgroundColor: color.grey5,
                },
              }),
        }}
        onClick={handleClickBigMenu}
      >
        <Typography variant="h6">{title}</Typography>
        <Typography variant="input1">{placeholder}</Typography>
      </FlexBox>
    </Box>
  );
}
