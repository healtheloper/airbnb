import { Box, Grid, Typography } from '@mui/material';

import FlexBox from '@components/FlexBox';
import { anywhereData } from '@mocks/main';

export default function AnyWhereBox() {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
        {anywhereData.title}
      </Typography>

      <Grid container rowSpacing={4} columnSpacing={4}>
        {anywhereData.infos.map(data => (
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={data.uuid}>
            <FlexBox fd="column">
              <Box
                sx={{
                  height: '19.25rem',
                  width: '19.25rem',
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
