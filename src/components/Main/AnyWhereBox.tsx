import { Box, Grid, Typography } from '@mui/material';

import FlexBox from '@components/FlexBox';

export default function AnyWhereBox({ categoryLocation }: any) {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
        {categoryLocation.title}
      </Typography>

      <Grid container rowSpacing={4} columnSpacing={4}>
        {categoryLocation.infos.map((data: any) => (
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={data.uuid}>
            <FlexBox fd="column">
              <Box
                sx={{
                  borderRadius: '0.625rem',
                }}
                component="img"
                alt="image"
                src={data.image}
              />
              <Typography sx={{ marginTop: '1rem' }}>
                {data.description}
              </Typography>
            </FlexBox>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
