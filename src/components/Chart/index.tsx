import { Box, Typography } from '@mui/material';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import React, { useState, useRef, useEffect } from 'react';

import FlexBox from '@components/FlexBox';
import color from '@constants/color';
import rooms from '@mocks/room';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 100;
const normalDistributionValue = 100000;

interface AirbnbThumbComponentProps extends React.HTMLAttributes<unknown> {}

function AirbnbThumbComponent(props: AirbnbThumbComponentProps) {
  const { children, ...other } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

const AirbnbSlider = styled(Slider)(() => ({
  height: 3,
  padding: '13px 0',
  '& .MuiSlider-thumb': {
    height: 20,
    width: 20,
    backgroundColor: '#fff',
    border: '1px solid black',
    '& .airbnb-bar': {
      height: 6,
      width: 1,
      backgroundColor: color.black,
      marginLeft: 1,
      marginRight: 1,
    },
  },
}));

interface cavansDataProps {
  [key: number]: number;
}

interface roomsProps {
  uuid: number;
  image: string;
  city: string;
  price: number;
  capacity: number;
  stars: number;
}

const draw = (canvas: HTMLCanvasElement | null, priceObj: cavansDataProps) => {
  const ctx = canvas?.getContext('2d');

  console.table(priceObj);
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 100);

    const strokeRange = Math.floor(CANVAS_WIDTH / 10);

    for (let i = 0; i < Object.keys(priceObj).length; i += 1) {
      // priceObj의 key, value로 차트 그려주기
      // ctx.quadraticCurveTo(strokeRange, , strokeRange + strokeRange, );
    }

    ctx.quadraticCurveTo(40, 85, 80, 30); // 100000 ~ 200000
    ctx.quadraticCurveTo(80, 80, 120, 5); // 200000 ~ 300000
    ctx.quadraticCurveTo(120, 40, 160, 50); // 300000 ~ 400000
    ctx.quadraticCurveTo(160, 120, 200, 85); // 400000 ~ 500000
    ctx.quadraticCurveTo(200, 80, 240, 100); // 500000 ~ 600000

    ctx.fillStyle = color.bgColor;
    ctx.strokeStyle = color.bgColor;

    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }
};

const getPriceMinMax = (data: roomsProps[]) => {
  const min = data.reduce((prev, cur) => (prev.price > cur.price ? cur : prev));

  const max = data.reduce((prev, cur) => (prev.price > cur.price ? prev : cur));

  return [min.price, max.price];
};

const parsingPrice = (data: number[]) => {
  data.sort((a, b) => a - b).filter(n => n !== 0);
  let standard = normalDistributionValue;

  return data.reduce((prev: cavansDataProps, cur: number) => {
    if (cur > standard) {
      standard += normalDistributionValue;
    }

    // eslint-disable-next-line no-param-reassign
    if (prev[standard] === undefined) prev[standard] = 0;

    // eslint-disable-next-line no-param-reassign
    prev[standard] += 1;
    return prev;
  }, {});
};

export default function Chart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });
  const [sliderValue, setSliderValue] = useState<number[]>([0, 100]);
  const averagePrice = Math.floor(
    rooms.data.map(room => room.price).reduce((prev, curr) => prev + curr, 0) /
      rooms.data.length,
  );

  const handleSlider = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setSliderValue([
        Math.min(newValue[0], sliderValue[1] - 5),
        sliderValue[1],
      ]);
    } else {
      setSliderValue([
        sliderValue[0],
        Math.max(newValue[1], sliderValue[0] + 5),
      ]);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;

      const [min, max] = getPriceMinMax(rooms.data);
      setPrice({ min, max });

      const priceArray = rooms.data.map(room => room.price);
      const newPriceObj = parsingPrice(priceArray);

      draw(canvas, newPriceObj);
    }
  }, []);

  return (
    <FlexBox
      component="article"
      sx={{
        width: '31rem',
        height: '22.75rem',
        padding: '3.25rem 4rem 4.8rem',
        backgroundColor: color.white,
      }}
      jc="center"
      fd="column"
    >
      <Typography sx={{ fontWeight: 700 }}>가격 범위</Typography>
      <Box sx={{ margin: '1rem 0 3rem 0' }}>
        <Typography>
          ₩{price.min.toLocaleString()} ~ ₩{price.max.toLocaleString()}+
        </Typography>
        <Typography variant="input2">
          평균 1박 요금은 ₩{averagePrice.toLocaleString()}입니다.
        </Typography>
      </Box>

      <FlexBox sx={{ position: 'relative' }} fd="column">
        <canvas ref={canvasRef} />
        <AirbnbSlider
          value={sliderValue}
          onChange={handleSlider}
          components={{ Thumb: AirbnbThumbComponent }}
          disableSwap
          sx={{
            position: 'absolute',
            padding: 0,
            bottom: 0,
            color: color.bgColor,
          }}
        />
      </FlexBox>
    </FlexBox>
  );
}
