import { Box } from '@mui/material';

import AnyWhereBox from '@components/Main/AnyWhereBox';
import NearByBox from '@components/Main/NearByBox';

export default function MainPage() {
  return (
    <Box sx={{ width: '90rem', margin: '0 auto', padding: '0 5rem' }}>
      <Box sx={{ marginBottom: '5rem' }}>
        <NearByBox />
      </Box>

      <Box sx={{ marginBottom: '5rem' }}>
        <AnyWhereBox />
      </Box>
    </Box>
  );
}
