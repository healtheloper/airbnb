import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import color from '@constants/color';
import fontSize from '@constants/fontSize';

const Title = styled(Typography)({
  padding: 0,
  margin: '0 12px',
  fontSize: fontSize.fontDefault,
  cursor: 'pointer',
  color: color.grey1,
  '&:hover': {
    color: color.black,
  },
});

export default function Category() {
  return (
    <Box
      sx={{
        display: 'flex',
      }}
    >
      <Title>숙소</Title>
      <Title>체험</Title>
      <Title>온라인 체험</Title>
    </Box>
  );
}
