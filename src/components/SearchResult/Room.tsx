import { Grid, Typography, Box, Divider } from '@mui/material';

import starImage from '@assets/star_img.png';
import wishImage from '@assets/wish_img.png';
import FlexBox from '@components/FlexBox';

export default function Room({ room }: any) {
  const {
    title,
    imageUrl,
    dailyPrice,
    reviewCount,
    ratingStarScore,
    maximumNum,
    bathroomCount,
    bedCount,
    bedroomCount,
  } = room;

  const getOptions = () =>
    `최대 인원 ${maximumNum}명 침대 ${bedCount}개 욕실 ${bathroomCount}개 주방 무선 인터넷 에어컨 헤어드라이어`;

  return (
    <>
      <Grid container sx={{ cursor: 'pointer' }}>
        <Grid item>
          <Box
            sx={{
              width: '20.625rem',
              height: '12.5rem',
              borderRadius: '0.6rem',
              marginRight: '1.5rem',
            }}
            component="img"
            alt="roomImage"
            src={imageUrl}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <FlexBox jc="space-between">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ marginBottom: '0.5rem' }}
                >
                  지도 위치
                </Typography>
                <Box
                  sx={{ width: '20px', height: '18px', cursor: 'pointer' }}
                  component="img"
                  src={wishImage}
                />
              </FlexBox>
              <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getOptions()}
              </Typography>
            </Grid>
            <Grid item>
              <FlexBox sx={{ fontSize: '0.875rem' }} jc="flex-end" ai="center">
                <Typography sx={{ fontWeight: '700' }}>
                  ₩{dailyPrice.toLocaleString()}
                </Typography>{' '}
                / 박
              </FlexBox>
            </Grid>
            <Grid
              item
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <FlexBox ai="center" sx={{ gap: '5px' }}>
                <Box
                  sx={{ width: '0.8125rem', height: '0.75rem' }}
                  component="img"
                  src={starImage}
                />
                <Typography>{ratingStarScore}</Typography>
                <Typography variant="input2">(후기{reviewCount}개)</Typography>
              </FlexBox>
              <Typography variant="input2" sx={{ textDecoration: 'underline' }}>
                총액 ₩1,493,159
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider orientation="horizontal" />
    </>
  );
}
