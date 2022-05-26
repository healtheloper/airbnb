import { Box } from '@mui/material';
import React from 'react';

interface FlexBoxProps {
  jc?: string;
  ai?: string;
  di?: string;
  children: React.ReactNode;
  component?: React.ElementType;
  sx?: object;
  onClick?: () => void;
}

export default function FlexBox({
  jc,
  ai,
  di,
  children,
  component,
  sx,
  onClick,
}: FlexBoxProps) {
  return (
    <Box
      component={component}
      sx={{
        ...sx,
        display: 'flex',
        ...(jc ? { justifyContent: jc } : {}),
        ...(ai ? { alignItems: ai } : {}),
        ...(di ? { flexDirection: di } : {}),
      }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
}
