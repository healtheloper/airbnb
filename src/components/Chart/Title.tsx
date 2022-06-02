import { Box, Typography } from '@mui/material';

import { PriceState } from '@contexts/PriceProvider';

interface titleProps {
  priceState: PriceState;
  getAveragePrice: (min: number, max: number) => number;
}

export default function Title({ priceState, getAveragePrice }: titleProps) {
  return (
    <Box sx={{ margin: '1rem 0 3rem 0' }}>
      <Typography>
        ₩{priceState.min.toLocaleString()} ~ ₩{priceState.max.toLocaleString()}+
      </Typography>
      <Typography variant="input2">
        평균 1박 요금은 ₩
        {getAveragePrice(priceState.min, priceState.max).toLocaleString()}
        입니다.
      </Typography>
    </Box>
  );
}
