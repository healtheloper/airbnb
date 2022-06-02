import SearchIcon from '@mui/icons-material/Search';
import { Fab } from '@mui/material';

import useCalendar from '@components/Calendar/useCalendar';
import Chart from '@components/Chart';
import FlexBox from '@components/FlexBox';
import BigMenus from '@components/Header/BigSearchBar/BigMenus';
import Modal from '@components/Header/BigSearchBar/Modal';
import { MenuType } from '@components/Header/MiniSearchBar/Menu';
import color from '@constants/color';
import fontSize from '@constants/fontSize';
import widths from '@constants/widths';
import { useHeaderDispatch, useHeaderState } from '@contexts/HeaderProvider';
import { PriceProvider } from '@contexts/PriceProvider';

export default function BigSearchBar() {
  const { calendarState, calendarDispatch, Calendar } = useCalendar();
  const headerDispatch = useHeaderDispatch();
  const headerState = useHeaderState();

  const changeMenuType = (menuType: MenuType) => {
    headerDispatch({ type: 'CHANGE_MENU_TYPE', menuType });
  };

  const isSelectedType = (menuType: MenuType) =>
    menuType === headerState.menuType;

  const getModalItem = () => {
    switch (headerState.menuType) {
      case 'checkin':
      case 'checkout':
        return (
          <Calendar
            calendarState={calendarState}
            calendarDispatch={calendarDispatch}
            onCardElClick={() => {
              changeMenuType('checkout');
            }}
          />
        );
      // TODO: 아래부터 modal 적용
      case 'persons':
        return <div />;
      case 'price':
        return <Chart />;
      case 'none':
        return <div />;
      default:
        throw Error('Menu Type not found');
    }
  };
  return (
    <PriceProvider>
      <FlexBox
        component="article"
        sx={{
          position: 'absolute',
          backgroundColor: color.grey6,
          width: `${widths.bigHeader.rem}rem`,
          height: '4.75rem',
          marginTop: '1.25rem',
          border: 1,
          borderColor: color.grey4,
          borderRadius: '3.75rem',
          visibility: 'none',
          opacity: 0,
          transform: 'scale(0.375, 0.8)',
          transition: 'all 0.25s ease',
          zIndex: -1,
          ...(headerState.isFocus && {
            transform: 'translateY(4rem)',
            visibility: 'visible',
            opacity: 1,
            zIndex: 2,
          }),
        }}
        ai="center"
      >
        <BigMenus
          calendarState={calendarState}
          calendarDispatch={calendarDispatch}
          isSelectedType={isSelectedType}
          changeMenuType={changeMenuType}
        />
        <Fab
          variant="extended"
          color="primary"
          sx={{ width: '6rem', mr: '1rem' }}
        >
          <SearchIcon
            sx={{
              color: color.white,
              fontSize: fontSize.fontDefault,
            }}
          />
          <span>검색</span>
        </Fab>
        <Modal>{getModalItem()}</Modal>
      </FlexBox>
    </PriceProvider>
  );
}
