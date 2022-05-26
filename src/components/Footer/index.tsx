import { Box, Container } from '@mui/material';

import FooterBottom from '@components/Footer/FooterBottom';
import FooterItems from '@components/Footer/FooterItems';
import color from '@constants/color';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: color.grey6,
      }}
    >
      <Container maxWidth="lg">
        <FooterItems />
        <FooterBottom />
      </Container>
    </Box>
  );
}
