import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, Fab, Typography } from '@mui/material';

import { fadeIn } from '@common/keyframes';
import FlexBox from '@components/FlexBox';
import color from '@constants/color';
import fontSize from '@constants/fontSize';

export default function BigSearchBar() {
  return (
    <FlexBox
      component="article"
      sx={{
        backgroundColor: color.white,
        width: '57.25rem',
        height: '4.75rem',
        marginTop: '1.25rem',
        border: 1,
        borderColor: color.grey4,
        borderRadius: '3.75rem',
        animation: `${fadeIn} .3s ease`,
        px: '1rem',
      }}
      ai="center"
    >
      <Box sx={{ padding: '0 1.5rem', width: '20%' }}>
        <Typography variant="h6">체크인</Typography>
        <Typography variant="input1">날짜 입력</Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ padding: '0 1.5rem', width: '20%' }}>
        <Typography variant="h6">체크아웃</Typography>
        <Typography variant="input1">날짜 입력</Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ padding: '0 1.5rem', width: '30%' }}>
        <Typography variant="h6">요금</Typography>
        <Typography variant="input1">금액대 설정</Typography>
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box sx={{ padding: '0 1.5rem', width: '30%' }}>
        <Typography variant="h6">인원</Typography>
        <Typography variant="input1">게스트 추가</Typography>
      </Box>
      <Fab variant="extended" color="primary" sx={{ width: '6rem' }}>
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
