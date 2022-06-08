import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import React, { useState, useRef, useEffect } from 'react';

import { CanvasDataProps } from '@components/Chart';
import color from '@constants/color';
import { PriceState, usePriceDispatch } from '@contexts/PriceProvider';

/**
 * 전역변수
 * CANVAS_WIDTH : 캔버스 가로 크기
 * CANVAS_HEIGHT : 캔버스 세로 크기
 * normalDistributionValue : priceObj 키 값 (100000원 단위로 숙소의 개수를 자르는 용도)
 * sliderInterval : 슬라이더가 완전히 겹쳐지지 않도록 각 슬라이더에 +- 해주는 값
 * startPoint: 차트 x, y축 시작값 ( 0, 100 )
 * endPoint: 차트 x, y축 끝값 ( 365, 100)
 * gradientRatio: 그레디언트 색상 비율
 */
const CANVAS_WIDTH = 365;
const CANVAS_HEIGHT = 100;
const sliderInterval = 5;
const gradientRatio = 0.01;

const startPoint = { x: 0, y: CANVAS_HEIGHT };
const endPoint = { x: CANVAS_WIDTH, y: CANVAS_HEIGHT };

interface GraphProps {
  priceState: PriceState;
  accommodationData: CanvasDataProps;
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
    '&:hover': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '&.Mui-active': {
      boxShadow: '0 0 0 8px rgba(58, 133, 137, 0.16)',
    },
    '& .airbnb-bar': {
      height: 6,
      width: 1,
      backgroundColor: color.black,
      marginLeft: 1,
      marginRight: 1,
    },
  },
}));

const fillArea = (
  ctx: CanvasRenderingContext2D,
  style: CanvasGradient,
  minSlider: number,
  maxSlider: number,
) => {
  style.addColorStop(0, color.bgColor);

  style.addColorStop(minSlider * gradientRatio, color.bgColor);
  style.addColorStop(minSlider * gradientRatio, color.black);

  style.addColorStop(maxSlider * gradientRatio, color.black);
  style.addColorStop(maxSlider * gradientRatio, color.bgColor);
  style.addColorStop(1, color.bgColor);
  ctx.fillStyle = style;
  ctx.fill();
};

const draw = (
  canvas: HTMLCanvasElement | null,
  minSlider: number,
  maxSlider: number,
  priceObj: CanvasDataProps,
) => {
  const ctx = canvas?.getContext('2d');

  if (!ctx || !priceObj) return;

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  let pointX = startPoint.x;
  let prevCoords = { ...startPoint };

  const priceObjLength = Object.keys(priceObj).length;
  const xInterval = Math.floor(CANVAS_WIDTH / priceObjLength + 1);
  const maxRooms = Math.max(...Object.values(priceObj));

  ctx.beginPath();
  ctx.moveTo(startPoint.x, startPoint.y);

  Object.values(priceObj).forEach(data => {
    pointX += xInterval;

    const currentCoords = {
      x: pointX,
      y: CANVAS_HEIGHT - Math.floor((data / maxRooms) * CANVAS_HEIGHT),
    };

    const controlX = prevCoords.x + xInterval / 2;

    ctx.bezierCurveTo(
      controlX,
      prevCoords.y,
      controlX,
      currentCoords.y,
      currentCoords.x,
      currentCoords.y,
    );

    prevCoords = { ...currentCoords };
  });

  ctx.lineTo(endPoint.x, endPoint.y);

  const linearGardaradientStyle = ctx.createLinearGradient(
    startPoint.x,
    startPoint.y,
    endPoint.x,
    endPoint.y,
  );
  fillArea(ctx, linearGardaradientStyle, minSlider, maxSlider);

  ctx.closePath();
};

export default function Graph({ priceState, accommodationData }: GraphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const percentage = Math.floor(priceState.initMaxPrice / 100);
  const priceDispatch = usePriceDispatch();

  const [sliderValue, setSliderValue] = useState<number[]>([
    Math.floor(priceState.minPrice / percentage),
    Math.floor(priceState.maxPrice / percentage),
  ]);

  const handleSlider = (
    event: Event,
    sliderNewValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(sliderNewValue)) {
      return;
    }

    const minPrice = Math.floor(percentage * sliderNewValue[0]);
    const maxPrice = Math.floor(percentage * sliderNewValue[1]);

    if (activeThumb === 0) {
      setSliderValue([
        Math.min(sliderNewValue[0], sliderValue[1] - sliderInterval),
        sliderValue[1],
      ]);
      priceDispatch({
        type: 'MIN_PRICE',
        minPrice,
        maxPrice,
      });
    } else {
      setSliderValue([
        sliderValue[0],
        Math.max(sliderNewValue[1], sliderValue[0] + sliderInterval),
      ]);

      priceDispatch({
        type: 'MAX_PRICE',
        minPrice,
        maxPrice,
      });
    }

    draw(canvasRef.current, sliderValue[0], sliderValue[1], accommodationData);
  };

  useEffect(() => {
    const canvas = canvasRef.current;

    if (canvas) {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      draw(canvas, sliderValue[0], sliderValue[1], accommodationData);
    }
  }, [accommodationData, sliderValue]);

  return (
    <>
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
          color: color.white,
        }}
        min={0}
        max={100}
      />
    </>
  );
}
