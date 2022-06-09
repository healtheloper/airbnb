import { Grid, Typography, Box, Divider } from '@mui/material';
import React, { useState } from 'react';

import starImage from '@assets/star_img.png';
import wishImage from '@assets/wish_img.png';
import { differenceDate } from '@common/util';
import FlexBox from '@components/FlexBox';
import RoomModal from '@components/SearchResult/RoomModal';

export default function Room({ room, checkIn, checkOut, guest }: any) {
  const [open, setOpen] = useState(false);
  const [roomDetailData, setRoomDetailData] = useState({
    id: 0,
    dailyPrice: 0,
    reviewCount: 0,
    ratingStarScore: 0,
  });

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

  const getRoomDetailOptions = () =>
    `최대 인원 ${maximumNum}명 침대 ${bedCount}개 욕실 ${bathroomCount}개 주방 무선 인터넷 에어컨 헤어드라이어`;

  const handleOnClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target.id === 'wish') return;
    setOpen(true);
    // /api/rooms/id 비동기 요청 후 state Setting
    fetch('http://localhost:3000/room.json')
      .then(res => res.json())
      .then(res => {
        if (res.data) {
          setRoomDetailData(res.data);
        }
      });
  };

  const priceSum = () => dailyPrice * differenceDate(checkIn, checkOut);

  return (
    <>
      <Grid
        container
        sx={{
          cursor: 'pointer',
          padding: '1rem',
          '&:hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.18)',
          },
        }}
        onClick={handleOnClick}
      >
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
                  id="wish"
                  sx={{ width: '20px', height: '18px', cursor: 'pointer' }}
                  component="img"
                  src={wishImage}
                />
              </FlexBox>
              <Typography variant="body2" sx={{ marginBottom: '0.5rem' }}>
                {title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {getRoomDetailOptions()}
              </Typography>
            </Grid>
            <Grid item>
              <FlexBox sx={{ fontSize: '0.875rem' }} jc="flex-end" ai="center">
                <Typography sx={{ fontWeight: '700' }}>
                  ₩{dailyPrice.toLocaleString()}
                </Typography>
                &nbsp;/&nbsp;박
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
                총액 ₩{priceSum().toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Divider orientation="horizontal" />

      {/* Modal을 여기 아래에서 호출해주는게 맞는걸까...  */}
      <RoomModal
        open={open}
        setOpen={setOpen}
        checkIn={checkIn}
        checkOut={checkOut}
        guest={guest}
        roomDetailData={roomDetailData}
      />
    </>
  );
}
