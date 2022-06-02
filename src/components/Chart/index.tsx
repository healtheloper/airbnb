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

const draw = (
  canvas: HTMLCanvasElement | null,
  min: number,
  max: number,
  priceObj: cavansDataProps,
) => {
  const ctx = canvas?.getContext('2d');

  if (ctx) {
    const minPriceObj = Object.keys(priceObj)
      .filter(price => +price <= min)
      .reduce((obj: cavansDataProps, key: any) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = priceObj[key];
        return obj;
      }, {});

    const maxPriceObj = Object.keys(priceObj)
      .filter(price => +price >= max)
      .reduce((obj: cavansDataProps, key: any) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = priceObj[key];
        return obj;
      }, {});

    const betweenPriceObj = Object.keys(priceObj)
      .filter(price => +price >= min && +price <= max)
      .reduce((obj: cavansDataProps, key: any) => {
        // eslint-disable-next-line no-param-reassign
        obj[key] = priceObj[key];
        return obj;
      }, {});

    let prevData = 0;
    let idx = 0;
    let prevX = 0;
    let prevY = 0;
    let x = 0;
    let y = 0;

    const drawBezierCurve = (
      obj: cavansDataProps,
      xInterval: number,
      maxPrice: number,
    ) => {
      Object.values(obj).forEach((data: number) => {
        x = xInterval * idx;
        prevX = xInterval * (idx - 1);
        y = CANVAS_HEIGHT - (data / maxPrice) * 100;
        prevY = CANVAS_HEIGHT - (prevData / maxPrice) * 100;
        const controlPoint = (x + prevX) / 2;
        ctx.bezierCurveTo(controlPoint, prevY, controlPoint, y, x, y);
        prevData = data;
        idx += 1;
      });
    };

    const fillArea = (xPoint: number, yPoint: number, areaColor: string) => {
      ctx.strokeStyle = areaColor;
      ctx.fillStyle = areaColor;
      ctx.stroke();
      ctx.lineTo(xPoint, CANVAS_HEIGHT);
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(xPoint, CANVAS_HEIGHT);
      ctx.lineTo(xPoint, yPoint);
    };

    const priceObjLength = Object.keys(priceObj).length;
    const xInterval = Math.floor(CANVAS_WIDTH / priceObjLength);
    const maxPrice = Math.max(...Object.values(priceObj));

    ctx.moveTo(0, CANVAS_HEIGHT);
    // min 값 이전 그리기
    drawBezierCurve(minPriceObj, xInterval, maxPrice);
    fillArea(x, y, color.bgColor);

    // min ~ max 값 그리기
    drawBezierCurve(betweenPriceObj, xInterval, maxPrice);
    fillArea(x, y, color.black);

    // max 값 이후 그리기
    drawBezierCurve(maxPriceObj, xInterval, maxPrice);

    ctx.strokeStyle = color.bgColor;
    ctx.stroke();
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

  return data.reduce(
    (prev: cavansDataProps, cur: number) => {
      if (cur > standard) {
        standard += normalDistributionValue;
      }

      // eslint-disable-next-line no-param-reassign
      if (prev[standard] === undefined) prev[standard] = 0;

      // eslint-disable-next-line no-param-reassign
      prev[standard] += 1;
      return prev;
    },
    { 0: 0 },
  );
};

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

    if (activeThumb === 0) {
      setSliderValue([
        Math.min(newValue[0], sliderValue[1] - 10000),
        sliderValue[1],
      ]);
    } else {
      setSliderValue([
        sliderValue[0],
        Math.max(newValue[1], sliderValue[0] + 10000),
      ]);
    }

    draw(
      canvasRef.current,
      sliderValue[0],
      sliderValue[1],
      calculateRangeCount(),
    );
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
          {getAveragePrice(sliderValue[0], sliderValue[1]).toLocaleString()}
          입니다.
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
            color: color.white,
          }}
        />
      </FlexBox>
    </FlexBox>
  );
}
