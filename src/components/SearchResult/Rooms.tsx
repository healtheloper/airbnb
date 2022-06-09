import { Box, Stack, Typography } from '@mui/material';
import moment from 'moment';

import Room from '@components/SearchResult/Room';

interface SearchDataListProps {
  check_in: string;
  check_out: string;
  price_min: number;
  price_max: number;
  adult: number;
  child: number;
  baby: number;
  page: number;
  limit: number;
  cached_count: number;
}

interface RoomsProps {
  roomList: any;
  searchDataList: SearchDataListProps;
}

export default function Rooms({ roomList, searchDataList }: RoomsProps) {
  const {
    check_in: checkIn,
    check_out: checkOut,
    price_min: minPrice,
    price_max: maxPrice,
    adult,
    child,
    baby,
  } = searchDataList;

  const getGuestNum = () => adult + child + baby;

  const getTitle = () => {
    const roomCount = Math.floor(roomList.totalElements / 100) * 100;

    const guest = getGuestNum();

    return `${roomCount}개 이상의 숙소 ${moment(checkIn).format(
      'M월 D일',
    )} ~ ${moment(checkOut).format(
      'M월 D일',
    )} ₩${minPrice.toLocaleString()} ~ ₩${maxPrice.toLocaleString()} 게스트${guest}명`;
  };

  return (
    <Stack spacing={2} sx={{ padding: '1rem' }}>
      <Box sx={{ padding: '1rem' }}>
        <Typography variant="input1">{getTitle()}</Typography>
        <Typography
          variant="h2"
          sx={{ margin: '1rem 0', fontSize: '2rem', fontWeight: 900 }}
        >
          지도에서 선택한 지역의 숙소
        </Typography>
      </Box>
      {roomList.content &&
        roomList.content.map((room: any, idx: number) => (
          <Room
            key={`room-${idx + 1}`}
            room={room}
            checkIn={checkIn}
            checkOut={checkOut}
            guest={getGuestNum()}
          />
        ))}
    </Stack>
  );
}
