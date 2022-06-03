import { Box } from '@mui/material';

import bgImage from '@assets/hero-img.png';
import { useHeaderState } from '@contexts/HeaderProvider';

export default function Background() {
  const { isFocus } = useHeaderState();
  return (
    <Box
      sx={{
        height: '40rem',
        backgroundImage: isFocus
          ? `linear-gradient(
          rgba(184, 184, 184, 0.623),
          rgba(184, 184, 184, 0.726)
        ), url(${bgImage})`
          : `url(${bgImage})`,
        backgroundSize: '90rem 40rem',
        marginBottom: '5rem',
      }}
    />
  );
}
