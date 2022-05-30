import { Box, Typography } from '@mui/material';
import { useState, useRef, useEffect } from 'react';

import FlexBox from '@components/FlexBox';
import color from '@constants/color';
import rooms from '@mocks/room';

const minPrice = 0;
const maxPrice = 10000000;
const CANVAS_WIDTH = 365;
const CANVAS_HEIGHT = 100;

const draw = (canvas: HTMLCanvasElement | null) => {
  const ctx = canvas?.getContext('2d');
  if (ctx) {
    ctx.beginPath();
    ctx.moveTo(0, 100);
    ctx.lineTo(100, 95);
    ctx.lineTo(125, 25);
    ctx.lineTo(150, 80);
    ctx.lineTo(130, 50);
    ctx.lineTo(175, 65);
    ctx.lineTo(205, 25);
    ctx.lineTo(180, 100);
    ctx.lineTo(100, 100);
    ctx.lineTo(0, 100);

    ctx.fillStyle = color.bgColor;
    ctx.strokeStyle = color.bgColor;
    ctx.lineWidth = 15;
    ctx.lineJoin = 'round';
    ctx.stroke();
    ctx.fill();
  }
};

export default function Chart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [price, setPrice] = useState({ min: 0, max: 1000000 });
  const averagePrice = Math.floor(
    rooms.data.map(room => room.price).reduce((prev, curr) => prev + curr, 0) /
      rooms.data.length,
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = CANVAS_WIDTH;
      canvas.height = CANVAS_HEIGHT;
      draw(canvas);
    }
  }, []);

  return (
    <FlexBox
      component="article"
      sx={{
        width: '493px',
        height: '364px',
        padding: '3.25rem 4rem 4.8rem',
        backgroundColor: color.white,
      }}
      jc="center"
      fd="column"
    >
      <Typography sx={{ fontWeight: 700 }}>가격 범위</Typography>
      <Box sx={{ margin: '1rem 0 3rem 0' }}>
        <Typography>
          ₩{minPrice} ~ ₩{maxPrice}+
        </Typography>
        <Typography variant="input2">
          평균 1박 요금은 ₩{averagePrice.toLocaleString()}입니다.
        </Typography>
      </Box>

      <canvas ref={canvasRef} />
    </FlexBox>
  );
}
