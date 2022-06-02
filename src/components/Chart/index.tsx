import { Box, Typography } from '@mui/material';
import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import React, { useState, useRef, useEffect } from 'react';

import FlexBox from '@components/FlexBox';
import color from '@constants/color';
import rooms from '@mocks/room';

/**
 * 전역변수
 * CANVAS_WIDTH : 캔버스 가로 크기
 * CANVAS_HEIGHT : 캔버스 세로 크기
 * normalDistributionValue : 차트를 그릴때 기준이되는 x축 값
 * sliderInterval : 슬라이더가 완전히 겹쳐지지 않도록 각 슬라이더에 +-해주는 값
 * percentage: 캔버스의 높이와 최대값으로 백분율을 위해 곱해주는 100
 */
const CANVAS_WIDTH = 365;
const CANVAS_HEIGHT = 100;
const normalDistributionValue = 100000;
const sliderInterval = 10000;
const percentage = 100;

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

// 슬라이더 내 || 를 표시하기위해 컴포넌트 확장
function AirbnbThumbComponent({
  children,
  ...other
}: AirbnbThumbComponentProps) {
  return (
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
    // 최소값 이전의 값들만 뽑아내기
    const minPriceObj = Object.keys(priceObj)
      .filter(price => +price <= min)
      .reduce((obj: cavansDataProps, key: any) => {
        obj[key] = priceObj[key];
        return obj;
      }, {});

    // 최대값 이후의 값들만 뽑아내기
    const maxPriceObj = Object.keys(priceObj)
      .filter(price => +price >= max)
      .reduce((obj: cavansDataProps, key: any) => {
        obj[key] = priceObj[key];
        return obj;
      }, {});

    // 최소 ~ 최대 값들만 뽑아내기
    const betweenPriceObj = Object.keys(priceObj)
      .filter(price => +price >= min && +price <= max)
      .reduce((obj: cavansDataProps, key: any) => {
        obj[key] = priceObj[key];
        return obj;
      }, {});

    /**
     * @param prevData: 이전 숙소 값
     * @param xIndex: x축의 위치를 상대적으로 나타내는 값으로 xInterval의 위치를 동적으로 변경하기 위한 값 (600000원 이하 값들만 들어오다면 현재 100000원 기준으로 그려주고 있기 때문에 idx는 0 ~ 7까지 들어가게됨)
     * @param prev?: x또는 y축 이전 값을 저장하는 값
     */
    let prevData = 0;
    let xIndex = 0;
    let prevX = 0;
    let prevY = 0;
    let x = 0;
    let y = 0;

    /**
     *
     * @param obj: {300000: 7} 형태로 가격: 숙소 개수 형태로 들어있음.
     * @param xInterval : x축 위치
     * @param maxRooms : 숙소 개수 최대값
     * bezierCurveTo(첫 번째 제어점 x, 첫 번째 제어점 y, 두 번째 제어점 x, 두 번째 제어점y, 끝 점의 x좌표, 끝 점의 y좌표)
     * 기준 점(첫 번째 제어점)을 하나 정하고 → 곡선의 형태를 지정하는 또 두개의 제어점(두 번째 제어점) →  곡선을 끝낼 기준점(끝 점)
     */
    const drawBezierCurve = (
      obj: cavansDataProps,
      xInterval: number,
      maxRooms: number,
    ) => {
      Object.values(obj).forEach((data: number) => {
        x = xInterval * xIndex;
        prevX = xInterval * (xIndex - 1);
        y = CANVAS_HEIGHT - (data / maxRooms) * percentage;
        prevY = CANVAS_HEIGHT - (prevData / maxRooms) * percentage;
        const controlPoint = (x + prevX) / 2;
        ctx.bezierCurveTo(controlPoint, prevY, controlPoint, y, x, y);
        prevData = data;
        xIndex += 1;
      });
    };

    const priceObjLength = Object.keys(priceObj).length;
    const xInterval = Math.floor(CANVAS_WIDTH / priceObjLength);
    const maxRooms = Math.max(...Object.values(priceObj));

    /**
     *
     * @param xPoint: 색상을 채우고 채워진 영역 x끝점에서 다시 그려주기 시작하기 위한 값
     * @param yPoint: 색상을 채우고 채워진 영역 y끝점에서 다시 그려주기 시작하기 위한 값
     * @param fillColor: 해당 영역을 채울 색상
     *
     */
    const fillArea = (xPoint: number, yPoint: number, fillColor: string) => {
      ctx.lineTo(xPoint, CANVAS_HEIGHT);
      ctx.strokeStyle = color.bgColor;
      ctx.fillStyle = fillColor;
      ctx.stroke();
      ctx.fill();
      ctx.closePath();
      ctx.beginPath();
      ctx.moveTo(xPoint, CANVAS_HEIGHT);
      ctx.lineTo(xPoint, yPoint);
    };

    ctx.moveTo(0, CANVAS_HEIGHT);
    // min 값 이전 그리기
    drawBezierCurve(minPriceObj, xInterval, maxRooms);
    fillArea(x, y, color.bgColor);

    // min ~ max 값 그리기
    drawBezierCurve(betweenPriceObj, xInterval, maxRooms);
    fillArea(x, y, color.black);

    // max 값 이후 그리기
    drawBezierCurve(maxPriceObj, xInterval, maxRooms);

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

      if (prev[standard] === undefined) prev[standard] = 0;

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
    sliderNewValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(sliderNewValue)) {
      return;
    }

    if (activeThumb === 0) {
      setSliderValue([
        Math.min(sliderNewValue[0], sliderValue[1] - sliderInterval),
        sliderValue[1],
      ]);
    } else {
      setSliderValue([
        sliderValue[0],
        Math.max(sliderNewValue[1], sliderValue[0] + sliderInterval),
      ]);
    }

    draw(
      canvasRef.current,
      sliderNewValue[0],
      sliderNewValue[1],
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
        borderRadius: '2.5rem',
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