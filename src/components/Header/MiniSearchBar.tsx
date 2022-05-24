import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import { styled } from '@mui/material/styles';

import color from '@constants/color';
import fontSize from '@constants/fontSize';

interface MiniSearchBarProps {
  handleSearchBarOnClick: () => void;
}

const Subject = styled(Box)({
  color: color.grey3,
  fontSize: fontSize.fontSmall,
  margin: '0 1rem',
});

export default function MiniSearchBar({
  handleSearchBarOnClick,
}: MiniSearchBarProps) {
  return (
    <Box
      component="article"
      sx={{
        width: '300px',
        height: '48px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 0.5rem',
        borderRadius: '2rem',
        border: 1,
        borderColor: color.grey4,
        boxSizing: 'border-box',
        cursor: 'pointer',
        '&:hover': {
          boxShadow:
            '0px 4px 10px rgba(51, 51, 51, 0.1), 0px 0px 4px rgba(51, 51, 51, 0.05);',
        },
      }}
      onClick={handleSearchBarOnClick}
    >
      <Subject>일정 입력</Subject>
      <Divider orientation="vertical" flexItem />
      <Subject>금액대 입력</Subject>
      <Divider orientation="vertical" flexItem />
      <Subject>인원 입력</Subject>
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '2rem',
          height: '2rem',
          borderRadius: '2rem',
          background: '#E84C60',
        }}
      >
        <SearchIcon
          sx={{
            color: color.white,
            fontSize: fontSize.fontDefault,
          }}
        />
      </Box>
    </Box>
  );
}
