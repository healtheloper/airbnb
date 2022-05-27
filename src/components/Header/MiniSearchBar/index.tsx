import SearchIcon from '@mui/icons-material/Search';

import FlexBox from '@components/FlexBox';
import Menus from '@components/Header/MiniSearchBar/Menus';
import color from '@constants/color';
import fontSize from '@constants/fontSize';

export default function MiniSearchBar() {
  return (
    <FlexBox
      component="article"
      sx={{
        backgroundColor: color.white,
        width: '18.75rem',
        height: '3rem',
        margin: '0 auto',
        padding: '1rem 0.5rem',
        borderRadius: '2rem',
        gap: '1rem',
        border: 1,
        borderColor: color.grey4,
        cursor: 'pointer',
        '&:hover': {
          boxShadow:
            '0px 4px 10px rgba(51, 51, 51, 0.1), 0px 0px 4px rgba(51, 51, 51, 0.05);',
        },
      }}
      jc="center"
      ai="center"
    >
      <Menus />
      <FlexBox
        component="div"
        sx={{
          width: '2rem',
          height: '2rem',
          borderRadius: '2rem',
          background: color.primary,
        }}
        jc="center"
        ai="center"
      >
        <SearchIcon
          sx={{
            color: color.white,
            fontSize: fontSize.fontDefault,
          }}
        />
      </FlexBox>
    </FlexBox>
  );
}
