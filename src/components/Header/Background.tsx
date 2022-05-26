import { Box } from '@mui/material';

import bgImage from '@assets/hero-img.png';

export default function Background() {
  return (
    <Box
      sx={{
        height: '40rem',
        background: `url(${bgImage}) no-repeat center center`,
        backgroundSize: '90rem 40rem',
      }}
    />
  );
}
