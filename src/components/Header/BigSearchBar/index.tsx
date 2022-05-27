import SearchIcon from '@mui/icons-material/Search';
import { Fab } from '@mui/material';

import { fadeIn } from '@common/keyframes';
import FlexBox from '@components/FlexBox';
import BigMenus from '@components/Header/BigSearchBar/BigMenus';
import color from '@constants/color';
import fontSize from '@constants/fontSize';

export default function BigSearchBar() {
  return (
    <FlexBox
      component="article"
      sx={{
        backgroundColor: color.grey6,
        width: '57.25rem',
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
    </FlexBox>
  );
}
