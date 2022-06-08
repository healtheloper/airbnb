import { Box, Skeleton } from '@mui/material';

const wrapperStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  height: '15rem',
  gap: '1rem',
};

const imageStyle = {
  width: '100%',
  height: '100%',
};

export default function SkeletonRoom() {
  return (
    <Box sx={wrapperStyle}>
      <Box sx={imageStyle}>
        <Skeleton
          sx={{ borderRadius: '1rem' }}
          variant="rectangular"
          width="100%"
          height="100%"
        />
      </Box>
      <Box>
        <Skeleton variant="text" width="30%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="60%" />
      </Box>
    </Box>
  );
}
