import { Box, Grid, Typography } from '@mui/material';

import FlexBox from '@components/FlexBox';
import { nearByData } from '@mocks/main';

export default function NearByBox() {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
        {nearByData.title}
      </Typography>

      <Grid container rowSpacing={3} columnSpacing={3}>
        {nearByData.infos.map(data => (
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={data.uuid}>
            <FlexBox>
              <Box
                sx={{
                  height: '5rem',
                  width: '5rem',
                  borderRadius: '0.625rem',
                }}
                component="img"
                alt="image"
                src={data.image}
              />
              <FlexBox fd="column" jc="center" sx={{ marginLeft: '1rem' }}>
                <Typography>{data.city}</Typography>
                <Typography>{data.description}</Typography>
              </FlexBox>
            </FlexBox>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
