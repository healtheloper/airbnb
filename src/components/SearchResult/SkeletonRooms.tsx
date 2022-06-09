import { Box, Skeleton, Stack, Typography } from '@mui/material';

import SkeletonRoom from '@components/SearchResult/SkeletonRoom';

export default function SkeletonRooms() {
  return (
    <Stack spacing={2} sx={{ padding: '1rem' }}>
      <Box>
        <Typography variant="h4">
          <Skeleton variant="text" />
        </Typography>
        <Typography variant="h2">
          <Skeleton variant="text" />
        </Typography>
      </Box>
      {new Array(3).fill(0).map((_, idx) => (
        <SkeletonRoom key={`skeleton-${idx + 1}`} />
      ))}
    </Stack>
  );
}
