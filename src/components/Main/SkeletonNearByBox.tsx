import { Skeleton, Grid } from '@mui/material';

import FlexBox from '@components/FlexBox';

export default function SkeletonNearByBox() {
  return (
    <>
      <Skeleton variant="text" height={40} sx={{ borderRadius: '1rem' }} />
      <Grid container rowSpacing={3} columnSpacing={3}>
        {new Array(8).fill(0).map((_, idx) => (
          <Grid
            item
            xs={12}
            sm={6}
            md={6}
            lg={3}
            xl={3}
            key={`skeleton-nearby-${idx + 1}`}
          >
            <FlexBox>
              <Skeleton
                sx={{
                  borderRadius: '0.625rem',
                }}
                width="5rem"
                height="5rem"
                variant="rectangular"
              />
              <FlexBox fd="column" jc="center" sx={{ marginLeft: '1rem' }}>
                <Skeleton variant="text" width={100} height={24} />
                <Skeleton variant="text" width={100} height={24} />
              </FlexBox>
            </FlexBox>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
