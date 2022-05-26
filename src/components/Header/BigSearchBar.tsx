import SearchIcon from '@mui/icons-material/Search';
import { Box, Divider, Typography } from '@mui/material';

import { fadeIn } from '@common/keyframes';
import FlexBox from '@components/FlexBox';
import color from '@constants/color';
import fontSize from '@constants/fontSize';

export default function BigSearchBar() {
  return (
    <FlexBox
      component="article"
      sx={{
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
      <FlexBox sx={{ width: '40%' }}>
        <Box sx={{ padding: '0 1.5rem' }}>
          <Typography variant="h6">체크인</Typography>
          <Typography variant="input1">날짜 입력</Typography>
        </Box>
        <Box sx={{ padding: '0 1.5rem' }}>
          <Typography variant="h6">체크아웃</Typography>
          <Typography variant="input1">날짜 입력</Typography>
        </Box>
      </FlexBox>
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
