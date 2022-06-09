import { Box, Grid, Typography } from '@mui/material';

import FlexBox from '@components/FlexBox';
import { IMainPageDatas, ICategoryLocationsInfo } from '@pages/MainPage';

interface CategoryLocationsProps {
  categoryLocations: IMainPageDatas<ICategoryLocationsInfo>;
}

export default function CategoryLocations({
  categoryLocations,
}: CategoryLocationsProps) {
  return (
    <>
      <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
        {categoryLocations.title}
      </Typography>

      <Grid container rowSpacing={4} columnSpacing={4}>
        {categoryLocations.infos.map((info: ICategoryLocationsInfo) => (
          <Grid item xs={12} sm={6} md={6} lg={3} xl={3} key={info.uuid}>
            <FlexBox fd="column">
              <Box
                sx={{
                  borderRadius: '0.625rem',
                }}
                component="img"
                alt="image"
                src={info.image}
              />
              <Typography sx={{ marginTop: '1rem' }}>
                {info.description}
              </Typography>
            </FlexBox>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
