import { Grid } from '@mui/material';
import React from 'react';

const gridDefaultValue = 12;

interface dataProps {
  unit: number;
  children: React.ReactNode;
}

export function GridInnerBox({ unit, children }: dataProps) {
  const lg = Math.floor(gridDefaultValue / unit);
  const md = Math.floor((gridDefaultValue * 2) / unit);
  const sm = Math.floor((gridDefaultValue * 2) / unit);
  return (
    <Grid item lg={lg} md={md} sm={sm} xs={gridDefaultValue}>
      {children}
    </Grid>
  );
}

export default function GridBox({ unit, children }: dataProps) {
  const spacing = Math.floor(gridDefaultValue / unit);

  return (
    <Grid container spacing={spacing}>
      {children}
    </Grid>
  );
}
