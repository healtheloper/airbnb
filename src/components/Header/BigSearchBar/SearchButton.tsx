import SearchIcon from '@mui/icons-material/Search';
import { Fab } from '@mui/material';
import { useCalendarState } from 'react-carousel-calendar';
import { useNavigate } from 'react-router-dom';

import color from '@constants/color';
import fontSize from '@constants/fontSize';
import { useHeaderDispatch } from '@contexts/HeaderProvider';
import { usePersonState } from '@contexts/PersonProvider';
import { usePriceState } from '@contexts/PriceProvider';

export default function SearchButton() {
  const navigate = useNavigate();
  const priceState = usePriceState();
  const calendarState = useCalendarState();
  const personState = usePersonState();
  const headerDispatch = useHeaderDispatch();

  const handleOnclick = () => {
    // 서버에 넘길 필요한 데이터? => 여기서 api 요청?
    // check_in, check_out, price_min, price_max, adult, child, baby, page, limit, cached_count
    headerDispatch({ type: 'BODY_CLICK' });
    navigate('/rooms', {
      state: {
        check_in: calendarState.checkin,
        check_out: calendarState.checkout,
        price_min: priceState.minPrice,
        price_max: priceState.maxPrice,
        adult: personState.adult,
        child: personState.child,
        baby: personState.baby,
        page: 1,
        limit: 1,
        cached_count: 1000,
      },
    });
  };

  return (
    <Fab
      variant="extended"
      color="primary"
      sx={{ width: '6rem', mr: '1rem', position: 'absolute', right: 0 }}
      onClick={handleOnclick}
    >
      <SearchIcon
        sx={{
          color: color.white,
          fontSize: fontSize.fontDefault,
        }}
      />
      <span>검색</span>
    </Fab>
  );
}
