import { Box, Typography, Grid } from '@mui/material';

import Background from '@components/Background';
import FlexBox from '@components/FlexBox';

const nearByData = [
  {
    uuid: 1,
    city: '서울',
    routeDesc: '차로 30분 거리',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
  },
  {
    uuid: 2,
    city: '의정부시',
    routeDesc: '차로 30분 거리',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
  },
  {
    uuid: 3,
    city: '대구',
    routeDesc: '차로 3.5시간 거리',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
  },
  {
    uuid: 4,
    city: '대전',
    routeDesc: '차로 2시간 거리',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
  },
  {
    uuid: 5,
    city: '광주',
    routeDesc: '차로 4시간 거리',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
  },
  {
    uuid: 6,
    city: '수원시',
    routeDesc: '차로 45분 거리',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
  },
  {
    uuid: 7,
    city: '울산',
    routeDesc: '차로 4.5시간 거리',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
  },
  {
    uuid: 8,
    city: '부천시',
    routeDesc: '차로 45분 거리',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
  },
];

const anywhereData = [
  {
    uuid: 10,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
    description: '자연생활을 만끽할 수 있는 숙소',
  },
  {
    uuid: 11,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
    description: '독특한 공간',
  },
  {
    uuid: 12,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
    description: '집 전체',
  },
  {
    uuid: 13,
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2',
    description: '반려동물 동반 기능',
  },
];

export default function MainPage() {
  return (
    <>
      <Background />
      <Box sx={{ width: '90rem', margin: '0 auto', padding: '5rem' }}>
        <Box>
          <Typography variant="h4">가까운 여행지 둘러보기</Typography>

          <Grid container spacing={3} sx={{ padding: '2rem 0' }}>
            {nearByData.map(data => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={data.uuid}>
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
                  <FlexBox di="column" jc="center" sx={{ marginLeft: '1rem' }}>
                    <Typography>{data.city}</Typography>
                    <Typography>{data.routeDesc}</Typography>
                  </FlexBox>
                </FlexBox>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box>
          <Typography variant="h4">어디서나, 여행은 살아보는 거야!</Typography>

          <Grid container spacing={2} sx={{ padding: '2rem 0' }}>
            {anywhereData.map(data => (
              <Grid item lg={3} md={4} sm={6} xs={12} key={data.uuid}>
                <FlexBox di="column">
                  <Box
                    sx={{
                      height: '19.25rem',
                      width: '19.25rem',
                      borderRadius: '0.625rem',
                      marginBottom: '1rem',
                    }}
                    component="img"
                    alt="image"
                    src={data.image}
                  />
                  <Typography>{data.description}</Typography>
                </FlexBox>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </>
  );
}
