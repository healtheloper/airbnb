import SearchIcon from '@mui/icons-material/Search';
import { Typography, Divider } from '@mui/material';

import FlexBox from '@components/FlexBox';
import color from '@constants/color';
import fontSize from '@constants/fontSize';
import { useHeaderDispatch } from '@contexts/HeaderProvider';

export default function MiniSearchBar() {
  const headerDispatch = useHeaderDispatch();

  const handleClickMiniSearchBar = () => {
    headerDispatch({ type: 'TOGGLE_FOCUS' });
  };

  return (
    <FlexBox
      component="article"
      sx={{
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
      onClick={handleClickMiniSearchBar}
    >
      <Typography variant="input2">일정 입력</Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="input2">금액대 입력</Typography>
      <Divider orientation="vertical" flexItem />
      <Typography variant="input2">인원 입력</Typography>
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
