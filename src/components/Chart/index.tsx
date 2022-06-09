import { Typography } from '@mui/material';
import { useCalendarState } from 'react-carousel-calendar';

import Graph from '@components/Chart/Graph';
import Title from '@components/Chart/Title';
import FlexBox from '@components/FlexBox';
import color from '@constants/color';
import { usePriceState } from '@contexts/PriceProvider';
import rooms from '@mocks/room';

export interface CanvasDataProps {
  [key: number]: number;
}

const getAveragePrice = (min: number, max: number) => {
  // min, max 를 받아서 그 안의 값만 평균구하기
  let idx = 0;
  const data = rooms.data
    .map(room => room.price)
    .reduce((prev, curr) => {
      if (curr >= min && curr <= max) {
        idx += 1;
        return prev + curr;
      }
      return prev;
    }, 0);

  return idx === 0 ? 0 : Math.floor(data / idx);
};

const calculateRangeCount = () => {
  const normalDistributionValue = 100000;
  const data = rooms.data
    .map(room => room.price)
    .sort((a, b) => a - b)
    .filter(n => n !== 0);
  let standard = normalDistributionValue;

  const newPriceObj = data.reduce((prev: CanvasDataProps, cur: number) => {
    if (cur > standard) {
      standard += normalDistributionValue;
    }
    const newPrev = { ...prev };

    if (!newPrev[standard]) {
      newPrev[standard] = 0;
    }

    newPrev[standard] += 1;
    return newPrev;
  }, {});

  return newPriceObj;
};

export default function Chart() {
  const priceState = usePriceState();
  const calendarState = useCalendarState();
  const accommodationData = calculateRangeCount();
  const { checkin, checkout } = calendarState;

  const isCheckDate = () => checkin !== '' && checkout !== '';

  return (
    <FlexBox
      component="article"
      sx={{
        backgroundColor: color.white,
        borderRadius: '2.5rem',
      }}
      jc="center"
      fd="column"
    >
      <FlexBox sx={{ position: 'relative' }} fd="column">
        <Typography sx={{ fontWeight: 700 }}>가격 범위</Typography>
        <Title priceState={priceState} getAveragePrice={getAveragePrice} />
        {isCheckDate() && (
          <Graph
            priceState={priceState}
            accommodationData={accommodationData}
          />
        )}
      </FlexBox>
    </FlexBox>
  );
}
