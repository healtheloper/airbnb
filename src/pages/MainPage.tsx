import { Box, Container } from '@mui/material';

import Background from '@components/Background';
import Footer from '@components/Footer';
import AnyWhereBox from '@components/Main/AnyWhereBox';
import NearByBox from '@components/Main/NearByBox';

export default function MainPage() {
  return (
    <>
      <Container maxWidth="lg">
        <Box sx={{ margin: '0 auto' }}>
          <Background />
          <Box sx={{ marginBottom: '5rem' }}>
            <NearByBox />
          </Box>
          <Box sx={{ marginBottom: '5rem' }}>
            <AnyWhereBox />
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
}
