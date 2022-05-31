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

type AirbnbThumbComponentProps = React.HTMLAttributes<unknown>;

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

const draw = (
  canvas: HTMLCanvasElement | null,
  min: number,
  max: number,
  priceObj: cavansDataProps,
) => {
  const ctx = canvas?.getContext('2d');
  console.log(min, max);
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(0, CANVAS_HEIGHT);

    const priceObjLength = Object.keys(priceObj).length;
    const xInterval = Math.floor(CANVAS_WIDTH / priceObjLength);
    const maxPrice = Math.max(...Object.values(priceObj));

    let prevData = 0;

    Object.values(priceObj).forEach((data, index) => {
      const x = xInterval * (index + 1);
      const prevX = xInterval * index;
      const controlPoint = (x + prevX) / 2;
      const y = CANVAS_HEIGHT - (data / maxPrice) * 100;
      const prevY = CANVAS_HEIGHT - (prevData / maxPrice) * 100;
      ctx.bezierCurveTo(controlPoint, prevY, controlPoint, y, x, y);
      prevData = data;
    });

    ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = color.bgColor;
    ctx.fill();
    ctx.closePath();
  }
};

const getPriceMinMax = (data: roomsProps[]) => {
  const min = data.reduce((prev, cur) => (prev.price > cur.price ? cur : prev));

  const max = data.reduce((prev, cur) => (prev.price > cur.price ? prev : cur));

  return [min.price, max.price];
};

const calculateRangeCount = () => {
  const data = rooms.data
    .map(room => room.price)
    .sort((a, b) => a - b)
    .filter(n => n !== 0);
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

const getAveragePrice = (min: number, max: number) =>
  // min, max 를 받아서 그 안의 값만 평균구하기
  Math.floor(
    rooms.data
      .map(room => room.price)
      .reduce((prev, curr) => {
        if (curr >= min && curr <= max) {
          return prev + curr;
        }
        return prev;
      }, 0) / rooms.data.length,
  );
export default function Chart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [price, setPrice] = useState({
    min: 0,
    max: 0,
  });
  const [sliderValue, setSliderValue] = useState<number[]>([0, 100]);

  const handleSlider = (
    event: Event,
    newValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    let min = 0;
    let max = 0;
    if (activeThumb === 0) {
      [min, max] = [
        Math.min(newValue[0], sliderValue[1] - 10000),
        sliderValue[1],
      ];
    } else {
      [min, max] = [
        sliderValue[0],
        Math.max(newValue[1], sliderValue[0] + 10000),
      ];
    }

    setSliderValue([min, max]);
    draw(canvasRef.current, min, max, calculateRangeCount());
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;

      const [min, max] = getPriceMinMax(rooms.data);
      setSliderValue([min, max]);
      setPrice({ min, max });

      draw(canvas, min, max, calculateRangeCount());
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
          ₩{sliderValue[0].toLocaleString()} ~ ₩
          {sliderValue[1].toLocaleString()}+
        </Typography>
        <Typography variant="input2">
          평균 1박 요금은 ₩
          {getAveragePrice(price.min, price.max).toLocaleString()}입니다.
        </Typography>
      </Box>

      <FlexBox sx={{ position: 'relative' }} fd="column">
        <canvas ref={canvasRef} />
        <AirbnbSlider
          value={sliderValue}
          onChange={handleSlider}
          components={{ Thumb: AirbnbThumbComponent }}
          disableSwap
          min={price.min}
          max={price.max}
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
