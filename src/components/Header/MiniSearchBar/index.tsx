import SearchIcon from '@mui/icons-material/Search';

import FlexBox from '@components/FlexBox';
import Menus from '@components/Header/MiniSearchBar/Menus';
import color from '@constants/color';
import fontSize from '@constants/fontSize';
import { useHeaderState } from '@contexts/HeaderProvider';

export default function MiniSearchBar() {
  const { isFocus } = useHeaderState();

  return (
    <FlexBox
      component="article"
      sx={{
        position: 'absolute',
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
        visibility: 'visible',
        opacity: 1,
        transition: 'all 0.25s ease',
        zIndex: 2,
        boxShadow: '0 1px 2px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 5%);',
        '&:hover': {
          boxShadow: '0 2px 4px rgba(0,0,0,0.18)',
        },
        ...(isFocus && {
          transform: 'scale(2.6,1.2) translateY(4rem)',
          visibility: 'hidden',
          opacity: 0,
          zIndex: -1,
        }),
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
