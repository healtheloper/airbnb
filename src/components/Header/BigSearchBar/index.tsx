import SearchIcon from '@mui/icons-material/Search';
import { Fab } from '@mui/material';

import { fadeIn } from '@common/keyframes';
import Calendar from '@components/Calendar';
import FlexBox from '@components/FlexBox';
import BigMenus from '@components/Header/BigSearchBar/BigMenus';
import Modal from '@components/Header/BigSearchBar/Modal';
import color from '@constants/color';
import fontSize from '@constants/fontSize';
import widths from '@constants/widths';
import { useHeaderState } from '@contexts/HeaderProvider';

export default function BigSearchBar() {
  const { menuType } = useHeaderState();

  const getModalItem = () => {
    switch (menuType) {
      case 'checkin':
      case 'checkout':
        return <Calendar />;
      // TODO: 아래부터 modal 적용
      case 'persons':
        return <div />;
      case 'price':
        return <div />;
      case 'none':
        return <div />;
      default:
        throw Error('Menu Type not found');
    }
  };
  return (
    <FlexBox
      component="article"
      sx={{
        position: 'relative',
        backgroundColor: color.grey6,
        width: `${widths.bigHeader.rem}rem`,
        height: '4.75rem',
        marginTop: '1.25rem',
        border: 1,
        borderColor: color.grey4,
        borderRadius: '3.75rem',
        animation: `${fadeIn} .3s ease`,
      }}
      ai="center"
    >
      <BigMenus />
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
  );
}
