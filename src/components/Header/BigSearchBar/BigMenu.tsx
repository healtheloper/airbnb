import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';

import FlexBox from '@components/FlexBox';
import { CalendarState } from '@components/Header/BigSearchBar/BigMenus';
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
  calendarState: CalendarState;
}

const getMonthDateString = (date: Date) =>
  `${date.getMonth() + 1}월 ${date.getDate()}일`;

export default function BigMenu({
  menu: { title, placeholder, menuType },
  width,
  isSelectedType,
  changeMenuType,
  calendarState,
}: Props) {
  const { checkin, checkout } = calendarState;

  const handleClickBigMenu = () => {
    changeMenuType(menuType);
  };

  const getMenuBody = () => {
    switch (menuType) {
      case 'checkin':
        return checkin === '' ? (
          <Typography variant="input1">{placeholder}</Typography>
        ) : (
          <Typography variant="input1">
            {getMonthDateString(checkin)}
          </Typography>
        );
      case 'checkout':
        return checkout === '' ? (
          <Typography variant="input1">{placeholder}</Typography>
        ) : (
          <Typography variant="input1">
            {getMonthDateString(checkout)}
          </Typography>
        );
      default:
        return <Typography variant="input1">{placeholder}</Typography>;
    }
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
          paddingLeft: '0.5rem',
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
        <FlexBox jc="space-around" ai="center" sx={{ width: '100%' }}>
          <FlexBox fd="column">
            <Typography variant="h6">{title}</Typography>
            {getMenuBody()}
          </FlexBox>
          <IconButton
            sx={{
              width: '1.5rem',
              height: '1.5rem',
              backgroundColor: color.grey6,
              '&:hover': { backgroundColor: color.grey5 },
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </FlexBox>
      </FlexBox>
    </Box>
  );
}
