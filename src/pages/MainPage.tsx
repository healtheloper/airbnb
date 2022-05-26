import { Box, Typography } from '@mui/material';

import FlexBox from '@components/FlexBox';
import GridBox, { GridInnerBox } from '@components/GridBox';
import { nearByData, anywhereData } from '@mocks/main';

export default function MainPage() {
  return (
    <Box sx={{ width: '90rem', margin: '0 auto', padding: '0 5rem' }}>
      <Box sx={{ marginBottom: '5rem' }}>
        <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
          {nearByData.title}
        </Typography>

        <GridBox unit={4}>
          {nearByData.infos.map(data => (
            <GridInnerBox unit={4} key={data.uuid}>
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
            </GridInnerBox>
          ))}
        </GridBox>
      </Box>

      <Box sx={{ marginBottom: '5rem' }}>
        <Typography variant="h4" sx={{ marginBottom: '2rem' }}>
          {anywhereData.title}
        </Typography>

        <GridBox unit={4}>
          {anywhereData.infos.map(data => (
            <GridInnerBox unit={4} key={data.uuid}>
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
            </GridInnerBox>
          ))}
        </GridBox>
      </Box>
    </Box>
  );
}
