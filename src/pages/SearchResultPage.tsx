import { Box, Skeleton } from '@mui/material';

import SkeletonRooms from '@components/SearchResult/SkeletonRooms';

const wrapperStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  height: '100vh',
  marginTop: '5.875rem',
};

export default function SearchResultPage() {
  return (
    <Box sx={wrapperStyle}>
      <SkeletonRooms />
      <Box>
        <Skeleton variant="rectangular" height="100%" />
      </Box>
    </Box>
  );
}
