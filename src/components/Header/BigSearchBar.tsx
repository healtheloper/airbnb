import SearchIcon from '@mui/icons-material/Search';
import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import color from '@constants/color';
import fontSize from '@constants/fontSize';

export default function BigSearchBar() {
  return (
    <Box
      component="article"
      sx={{
        width: '916px',
        height: '76px',
        display: 'flex',
        // justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        marginTop: '20px',
        border: 1,
        borderColor: color.grey4,
        borderRadius: '60px',
        position: 'absolute',
      }}
    >
      <Box sx={{ display: 'flex', width: '40%' }}>
        <Box sx={{ padding: '0 24px' }}>
          <Typography>체크인</Typography>
          <Typography sx={{ color: color.grey2 }}>날짜 입력</Typography>
        </Box>
        <Box sx={{ padding: '0 24px' }}>
          <Typography>체크아웃</Typography>
          <Typography sx={{ color: color.grey2 }}>날짜 입력</Typography>
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ padding: '0 24px', width: '30%' }}>
        <Typography>요금</Typography>
        <Typography sx={{ color: color.grey2 }}>금액대 설정</Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ padding: '0 24px', width: '30%' }}>
        <Typography>인원</Typography>
        <Typography sx={{ color: color.grey2 }}>게스트 추가</Typography>
      </Box>
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
