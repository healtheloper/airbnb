import Slider, { SliderThumb } from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import React, { useState, useRef, useEffect } from 'react';

import color from '@constants/color';
import { PriceState, usePriceDispatch } from '@contexts/PriceProvider';
import rooms from '@mocks/room';

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
const normalDistributionValue = 100000;
const sliderInterval = 5;
const gradientRatio = 0.01;

const startPoint = { x: 0, y: CANVAS_HEIGHT };
const endPoint = { x: CANVAS_WIDTH, y: CANVAS_HEIGHT };

interface cavansDataProps {
  [key: number]: number;
}

interface graphProps {
  priceState: PriceState;
  initPrice: any;
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

const fillArea = (
  ctx: CanvasRenderingContext2D,
  style: CanvasGradient,
  min: number,
  max: number,
) => {
  style.addColorStop(0, color.bgColor);

  style.addColorStop(min * gradientRatio, color.bgColor);
  style.addColorStop(min * gradientRatio, color.black);

  style.addColorStop(max * gradientRatio, color.black);
  style.addColorStop(max * gradientRatio, color.bgColor);
  style.addColorStop(1, color.bgColor);
  ctx.fillStyle = style;
  ctx.fill();
};

const draw = (
  canvas: HTMLCanvasElement | null,
  min: number,
  max: number,
  priceObj: cavansDataProps,
) => {
  if (!canvas) return;
  const ctx = canvas?.getContext('2d');

  if (ctx) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    let pointX = startPoint.x;
    let startCoords = { ...startPoint };

    const priceObjLength = Object.keys(priceObj).length;
    const xInterval = Math.floor(CANVAS_WIDTH / priceObjLength + 1);
    const maxRooms = Math.max(...Object.values(priceObj));

    ctx.beginPath();
    ctx.moveTo(startPoint.x - xInterval, startPoint.y);

    Object.values(priceObj).forEach(data => {
      pointX += xInterval;

      const coords = {
        x: pointX,
        y: CANVAS_HEIGHT - Math.floor((data / maxRooms) * CANVAS_HEIGHT),
      };

      const controlX = startCoords.x + xInterval / 2;

      ctx.bezierCurveTo(
        controlX,
        startCoords.y,
        controlX,
        coords.y,
        coords.x,
        coords.y,
      );

      startCoords = { ...coords };
    });

    ctx.lineTo(endPoint.x, endPoint.y);

    const linearGardaradientStyle = ctx.createLinearGradient(
      startPoint.x,
      startPoint.y,
      endPoint.x,
      endPoint.y,
    );
    fillArea(ctx, linearGardaradientStyle, min, max);

    ctx.closePath();
  }
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
    const newPrev = { ...prev };

    if (!newPrev[standard]) {
      newPrev[standard] = 0;
    }

    newPrev[standard] += 1;
    return newPrev;
  }, {});
};

export default function Graph({ priceState, initPrice }: graphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 100]);
  const priceDispatch = usePriceDispatch();

  const handleSlider = (
    event: Event,
    sliderNewValue: number | number[],
    activeThumb: number,
  ) => {
    if (!Array.isArray(sliderNewValue)) {
      return;
    }

    const percentage = Math.floor(
      (initPrice.current.max - initPrice.current.min) / 100,
    );

    if (activeThumb === 0) {
      const minPrice =
        initPrice.current.min + Math.floor(percentage * sliderValue[0]);

      setSliderValue([
        Math.min(sliderNewValue[0], sliderValue[1] - sliderInterval),
        sliderValue[1],
      ]);
      priceDispatch({
        type: 'MIN_PRICE',
        min:
          minPrice < initPrice.current.min ? initPrice.current.min : minPrice,
        max: initPrice.current.max,
      });
    } else {
      const maxPrice =
        initPrice.current.min + Math.floor(percentage * sliderValue[1]);
      setSliderValue([
        sliderValue[0],
        Math.max(sliderNewValue[1], sliderValue[0] + sliderInterval),
      ]);

      priceDispatch({
        type: 'MAX_PRICE',
        min: initPrice.current.min,
        max: maxPrice,
      });
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
      draw(canvas, sliderValue[0], sliderValue[1], calculateRangeCount());
    }
  }, [priceState]);

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
