import CloseIcon from '@mui/icons-material/Close';
import { Box, IconButton, Typography } from '@mui/material';
import { useCalendarState, useCalendarDispatch } from 'react-carousel-calendar';

import FlexBox from '@components/FlexBox';
import { MenuType } from '@components/Header/MiniSearchBar/Menu';
import color from '@constants/color';
import { usePriceState, usePriceDispatch } from '@contexts/PriceProvider';

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

const getMonthDateString = (date: Date) =>
  `${date.getMonth() + 1}월 ${date.getDate()}일`;

export default function BigMenu({
  menu: { title, placeholder, menuType },
  width,
  isSelectedType,
  changeMenuType,
}: Props) {
  const calendarState = useCalendarState();
  const calendarDispatch = useCalendarDispatch();

  const priceState = usePriceState();
  const priceDispatch = usePriceDispatch();
  let closeBtnVisibility = 'hidden';
  const { checkin, checkout } = calendarState;

  const handleClickBigMenu = () => {
    changeMenuType(menuType);
  };

  const handleClickCloseBtn = () => {
    if (menuType === 'checkin') {
      calendarDispatch({ type: 'CHECK_IN_DELETE' });
    } else if (menuType === 'checkout') {
      calendarDispatch({ type: 'CHECK_OUT_DELETE' });
    } else if (menuType === 'price') {
      priceDispatch({ type: 'SET_PRICE', min: 0, max: 0 });
    }
  };

  const getMenuBody = () => {
    switch (menuType) {
      case 'checkin': {
        const isExistCheckIn = checkin !== '' && typeof checkin !== 'string';
        if (isExistCheckIn) {
          closeBtnVisibility = 'visible';
          return (
            <Typography variant="input1">
              {getMonthDateString(checkin)}
            </Typography>
          );
        }
        return <Typography variant="input1">{placeholder}</Typography>;
      }
      case 'checkout': {
        const isExistCheckOut = checkout !== '' && typeof checkout !== 'string';
        if (isExistCheckOut) {
          closeBtnVisibility = 'visible';
          return (
            <Typography variant="input1">
              {getMonthDateString(checkout)}
            </Typography>
          );
        }
        return <Typography variant="input1">{placeholder}</Typography>;
      }
      case 'price': {
        if (priceState.min) {
          closeBtnVisibility = 'visible';
          return (
            <Typography variant="input1">
              {priceState.min.toLocaleString()} ~{' '}
              {priceState.max.toLocaleString()}
            </Typography>
          );
        }
        return <Typography variant="input1">{placeholder}</Typography>;
      }
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
                boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
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
              visibility: closeBtnVisibility,
              '&:hover': { backgroundColor: color.grey5 },
            }}
            onClick={handleClickCloseBtn}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </FlexBox>
      </FlexBox>
    </Box>
  );
}
