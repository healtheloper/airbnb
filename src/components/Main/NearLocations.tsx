import { Box, Grid, Typography } from '@mui/material';

import FlexBox from '@components/FlexBox';
import { IMainPageDatas, INearLocationsInfo } from '@pages/MainPage';

interface NearLocationsProps {
  nearLocations: IMainPageDatas<INearLocationsInfo>;
}

export default function NearLocations({ nearLocations }: NearLocationsProps) {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
        {nearLocations.title}
      </Typography>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {nearLocations.infos.map((info: INearLocationsInfo) => (
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={info.uuid}>
            <FlexBox>
              <Box
                sx={{
                  height: '5rem',
                  width: '5rem',
                  borderRadius: '0.625rem',
                }}
                component="img"
                alt="image"
                src={info.image}
              />
              <FlexBox fd="column" jc="center" sx={{ marginLeft: '1rem' }}>
                <Typography>{info.city}</Typography>
                <Typography>{info.description}</Typography>
              </FlexBox>
            </FlexBox>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
